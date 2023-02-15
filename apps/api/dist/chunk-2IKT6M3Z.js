import { parseConfig } from './chunk-GQXM3VM5.js';
import Bree from 'bree';
import Graceful from '@ladjs/graceful';
import dayjs from 'dayjs';
import * as path from 'path';
import * as process from 'process';
import { fileURLToPath } from 'url';
import { client } from '@w8nc/database';
import { log } from '@w8nc/logger';

var bree = new Bree({
  // logger: cabin,
  root: path.join(path.dirname(fileURLToPath(import.meta.url)), "jobs"),
  defaultExtension: process.env.TS_NODE ? "ts" : "js",
  doRootCheck: false
});
var graceful = new Graceful({ brees: [bree] });
graceful.listen();
async function startBree() {
  log("starting Bree...");
  const jobs = await client.job.findMany({
    where: {
      status: "PENDING",
      OR: [
        {
          date: {
            gte: dayjs().toDate()
          }
        },
        {
          cron: {
            not: null
          }
        },
        {
          cron: {
            not: void 0
          }
        }
      ]
    }
  });
  const breeJobs = jobs.map((job) => ({
    name: job.id,
    path: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "jobs",
      `schedule.${process.env.TS_NODE ? "ts" : "js"}`
    ),
    ...parseConfig({ date: job.date, cron: job.cron }),
    worker: {
      workerData: job
    }
  }));
  await bree.add(breeJobs);
  await bree.start();
  log(`Requeued with ${breeJobs.length} job(s)`);
}
var addBreeJob = async ({
  jobId,
  jobFileName,
  date,
  cron,
  workerData
}) => {
  const addedJob = await bree.add({
    name: jobId,
    path: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "jobs",
      `${jobFileName}.${process.env.TS_NODE ? "ts" : "js"}`
    ),
    ...parseConfig({
      date,
      cron
    }),
    worker: {
      workerData
    }
  });
  return addedJob;
};

export { addBreeJob, bree, startBree };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-2IKT6M3Z.js.map