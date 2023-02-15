import { jobSchema, jobIdSchema } from './chunk-NNTLG7HB.js';
import { addBreeJob, bree } from './chunk-2IKT6M3Z.js';
import { getJobType } from './chunk-GDKE6HDW.js';
import { zParse } from './chunk-ZET6VW4Y.js';
import express from 'express';
import { client } from '@w8nc/database';
import { log } from '@w8nc/logger';

var jobRoute = express.Router();
jobRoute.post("/", async (req, res) => {
  try {
    const { body } = await zParse(jobSchema, req);
    const { config, url, data, headers, retry } = body;
    const type = getJobType(config);
    const createdJob = await client.job.create({
      data: {
        ...config,
        type,
        url,
        data,
        headers,
        retry
      }
    });
    const addedJob = await addBreeJob({
      jobId: createdJob.id,
      jobFileName: "schedule",
      date: createdJob.date,
      cron: createdJob.cron,
      workerData: createdJob
    });
    log({ addedJob });
    await bree.start(createdJob.id);
    res.send({ message: "Job added to queue", id: createdJob.id });
    return;
  } catch (error) {
    res.send(error);
  }
});
jobRoute.get("/:id", async (req, res) => {
  const parsedReq = await zParse(jobIdSchema, req);
  const job = await client.job.findUnique({
    where: {
      id: parsedReq.params.id
    },
    include: {
      task: true
    }
  });
  if (!job) {
    res.status(404).send({
      message: "Job not found",
      id: parsedReq.params.id
    });
  }
  res.send(job);
  return;
});
jobRoute.put("/:id/pause", async (req, res) => {
  const { params } = await zParse(jobIdSchema, req);
  const job = await client.job.findUnique({ where: { id: params.id } });
  if (!job) {
    res.status(404).send({ message: "Job not found", id: params.id });
    return;
  }
  if (job.status !== "PENDING") {
    res.status(500).send({ message: "Cannot pause", id: params.id });
    return;
  }
  try {
    const updatedJob = await client.job.update({
      where: { id: params.id },
      data: { status: "INACTIVE" }
    });
    await bree.stop(updatedJob.id);
    res.send({ message: "Job paused", id: updatedJob.id });
    return;
  } catch (error) {
    res.send(error);
  }
});
jobRoute.put("/:id/resume", async (req, res) => {
  const { params } = await zParse(jobIdSchema, req);
  const job = await client.job.findUnique({
    where: { id: params.id }
  });
  if (!job) {
    res.status(404).send({ message: "Job not found", id: params.id });
    return;
  }
  if (job.status !== "INACTIVE") {
    res.status(500).send({ message: "Cannot resume", id: params.id });
    return;
  }
  try {
    const updatedJob = await client.job.update({
      where: { id: params.id },
      data: { status: "PENDING" }
    });
    await bree.start(updatedJob.id);
    res.send({ message: "Job resumed", id: updatedJob.id });
    return;
  } catch (error) {
    res.send(error);
  }
});

export { jobRoute };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-QZKY3LT4.js.map