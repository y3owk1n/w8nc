import { parentPort, workerData } from "node:worker_threads";
import process from "node:process";
import type { AxiosError, AxiosHeaders, AxiosResponseHeaders } from "axios";
import axios from "axios";
import type { Job, JobType, Prisma } from "@prisma/client";
import pRetry, { AbortError } from "p-retry";
import { client } from "database";
import { log } from "node:console";
import { parseConfig } from "../lib/parseConfig";
import { getJobType } from "../lib/getJobType";

type ResRequest = {
    method: string;
    getHeaders: () => object;
};

const getResponse = async ({
    jobId,
    url,
    data,
    headers,
    jobType,
}: {
    jobId: string;
    jobType: JobType;
    url: string;
    data: Prisma.JsonValue;
    headers?: Prisma.JsonValue | null;
}): Promise<void> => {
    let attachHeaders: AxiosHeaders | undefined = undefined;

    if (headers) {
        attachHeaders = headers as AxiosHeaders;
    }

    try {
        const response = await axios.post(url, data, {
            headers: attachHeaders,
        });

        const resReqHeaders = (response.request as ResRequest).getHeaders();
        const resMethod = (response.request as ResRequest).method;
        const resHeaders = response.headers;
        const resStatus = response.status;

        // Abort retrying if the resource doesn't exist
        if (resStatus === 404) {
            throw new AbortError(response.statusText);
        }

        const reqResInput = {
            reqHeaders: resReqHeaders,
            resHeaders: resHeaders,
            resMethod: resMethod,
            resStatus: resStatus,
        };

        // save the task and update job
        await client.$transaction(async (tx) => {
            await tx.task.create({
                data: {
                    url,
                    ...reqResInput,
                    data: data || {},
                    status: "SUCCESS",
                    jobId,
                },
            });

            if (jobType === "SCHEDULE") {
                await tx.job.update({
                    where: { id: jobId },
                    data: { status: "SUCCESS" },
                });
            }

            return;
        });
    } catch (error) {
        const axiosError = error as AxiosError;

        const resReqHeaders = (axiosError.request as ResRequest).getHeaders();
        const resMethod = (axiosError.request as ResRequest).method;
        const resHeaders = axiosError.response?.headers;
        const resStatus = axiosError.status;

        const reqResInput = {
            reqHeaders: resReqHeaders,
            resHeaders: resHeaders || {},
            resMethod: resMethod,
            resStatus: resStatus || 500,
        };

        // save the task and update job
        await client.$transaction(async (tx) => {
            await tx.task.create({
                data: {
                    url,
                    data: data || {},
                    ...reqResInput,
                    status: "FAILED",
                    jobId,
                },
            });

            if (jobType === "SCHEDULE") {
                await tx.job.update({
                    where: { id: jobId },
                    data: { status: "SUCCESS" },
                });
            }

            return;
        });
    }
    return;
};

type WorkerData = {
    job: {
        worker: {
            workerData: Job;
        };
    };
};

async function schedule() {
    const { id, url, data, headers, date, cron, retry } = (
        workerData as WorkerData
    ).job.worker.workerData;

    const config = parseConfig({
        date,
        cron,
    });

    if (!config) {
        throw new Error("No config found");
    }

    const jobType = getJobType(config);

    try {
        await pRetry(
            () => getResponse({ jobId: id, jobType, url, data, headers }),
            {
                retries: retry || 3,
                onFailedAttempt: (error) => {
                    if (error.retriesLeft === 0) throw new Error("No more retries left");
                    log(
                        `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
                    );
                },
            }
        );

        if (parentPort) parentPort.postMessage("done");
        else process.exit(0);
    } catch (error) {
        log({ error });

        process.exit(1);
    }
}

schedule();
