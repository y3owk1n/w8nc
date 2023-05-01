import Graceful from "@ladjs/graceful";
import { log } from "@w8nc/logger";
import Bree, { JobOptions } from "bree/types";
import path from "path";
import { fileURLToPath } from "url";
import { client } from "@w8nc/database";
import dayjs from "dayjs";
import { parseConfig } from "./lib/parseConfig";

export const bree = new Bree({
    // logger: cabin,
    root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
    defaultExtension: process.env.TS_NODE ? "ts" : "js",
    doRootCheck: false,
});


const graceful = new Graceful({ brees: [bree] });
graceful.listen();

export async function startBree() {
    log("Getting all pending jobs");
    // Requeue all jobs from the database on server restart
    const jobs = await client.job.findMany({
        where: {
            status: "PENDING",
            OR: [
                {
                    date: {
                        gte: dayjs().toDate(),
                    },
                },
                {
                    cron: {
                        not: null,
                    },
                },
                {
                    cron: {
                        not: undefined,
                    },
                },
            ],
        },
    });

    const breeJobs: JobOptions[] = jobs.map((job) => ({
        name: job.id,
        path: path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            "jobs",
            `schedule.js`
        ),

        ...parseConfig({ date: job.date, cron: job.cron }),
        worker: {
            workerData: job,
        },
    }));

    log(`Found ${breeJobs.length} job(s) that are pending`);

    try {
        await bree.add(breeJobs);

        log(`Added ${breeJobs.length} job(s) to queue`);

        log(`Start bree...`);

        await bree.start();
    } catch (error) {
        log("Fail to start bree");
        log({ error });
    }
    return;
}

export const addBreeJob = async ({
    jobId,
    jobFileName,
    date,
    cron,
    workerData,
}: {
    jobId: string;
    jobFileName: string;
    date: Date | null;
    cron: string | null;
    workerData: object;
}) => {
    const addedJob = await bree.add({
        name: jobId,
        path: path.join(
            path.dirname(fileURLToPath(import.meta.url)),
            "jobs",
            `${jobFileName}.js}`
        ),
        ...parseConfig({
            date: date,
            cron: cron,
        }),
        worker: {
            workerData,
        },
    });

    return addedJob;
};
