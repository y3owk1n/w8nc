import { client } from "database";
import express from "express";

export const jobsRoute = express.Router();

jobsRoute.get("/", async (_, res) => {
    const jobs = await client.job.findMany({
        include: {
            task: true,
        },
    });

    res.send(jobs);
    return;
});
