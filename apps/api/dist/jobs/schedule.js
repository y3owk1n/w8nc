import { getJobType } from '../chunk-GDKE6HDW.js';
import { parseConfig } from '../chunk-GQXM3VM5.js';
import { workerData, parentPort } from 'worker_threads';
import process from 'process';
import axios from 'axios';
import pRetry, { AbortError } from 'p-retry';
import { client } from '@w8nc/database';
import { log } from 'console';

var getResponse = async ({
  jobId,
  url,
  data,
  headers,
  jobType
}) => {
  let attachHeaders = void 0;
  if (headers) {
    attachHeaders = headers;
  }
  try {
    const response = await axios.post(url, data, {
      headers: attachHeaders
    });
    const resReqHeaders = response.request.getHeaders();
    const resMethod = response.request.method;
    const resHeaders = response.headers;
    const resStatus = response.status;
    if (resStatus === 404) {
      throw new AbortError(response.statusText);
    }
    const reqResInput = {
      reqHeaders: resReqHeaders,
      resHeaders,
      resMethod,
      resStatus
    };
    await client.$transaction(async (tx) => {
      await tx.task.create({
        data: {
          url,
          ...reqResInput,
          data: data || {},
          status: "SUCCESS",
          jobId
        }
      });
      if (jobType === "SCHEDULE") {
        await tx.job.update({
          where: { id: jobId },
          data: { status: "SUCCESS" }
        });
      }
      return;
    });
  } catch (error) {
    const axiosError = error;
    const resReqHeaders = axiosError.request.getHeaders();
    const resMethod = axiosError.request.method;
    const resHeaders = axiosError.response?.headers;
    const resStatus = axiosError.status;
    const reqResInput = {
      reqHeaders: resReqHeaders,
      resHeaders: resHeaders || {},
      resMethod,
      resStatus: resStatus || 500
    };
    await client.$transaction(async (tx) => {
      await tx.task.create({
        data: {
          url,
          data: data || {},
          ...reqResInput,
          status: "FAILED",
          jobId
        }
      });
      if (jobType === "SCHEDULE") {
        await tx.job.update({
          where: { id: jobId },
          data: { status: "SUCCESS" }
        });
      }
      return;
    });
  }
  return;
};
async function schedule() {
  const { id, url, data, headers, date, cron, retry } = workerData.job.worker.workerData;
  const config = parseConfig({
    date,
    cron
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
          if (error.retriesLeft === 0)
            throw new Error("No more retries left");
          log(
            `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
          );
        }
      }
    );
    if (parentPort)
      parentPort.postMessage("done");
    else
      process.exit(0);
  } catch (error) {
    log({ error });
    process.exit(1);
  }
}
schedule();
//# sourceMappingURL=out.js.map
//# sourceMappingURL=schedule.js.map