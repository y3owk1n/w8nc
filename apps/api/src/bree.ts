import type { JobOptions } from "bree";
import Bree from "bree";
import Graceful from "@ladjs/graceful";
import dayjs from "dayjs";
import * as path from "node:path";
import * as process from "node:process";
import { fileURLToPath } from "node:url";
import { client } from "database";
import { log } from "logger";
import { parseConfig } from "./lib/parseConfig";

// const { Signale } = pkg;
// export const cabin = new Cabin({
//     axe: {
//         logger: new Signale(),
//     },
// });

export const bree = new Bree({
    // logger: cabin,
    root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
    defaultExtension: process.env.TS_NODE ? "ts" : "js",
    doRootCheck: false,
});

const graceful = new Graceful({ brees: [bree] });
graceful.listen();

export async function startBree() {
    log("starting Bree...");
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
            `schedule.${process.env.TS_NODE ? "ts" : "js"}`
        ),

        ...parseConfig({ date: job.date, cron: job.cron }),
        worker: {
            workerData: job,
        },
    }));

    const addedJobs = await bree.add(breeJobs);

    await bree.start();

    log(`Requeued with ${breeJobs.length} job(s)`);
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
            `${jobFileName}.${process.env.TS_NODE ? "ts" : "js"}`
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
