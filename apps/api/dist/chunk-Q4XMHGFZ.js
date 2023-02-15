import { client } from '@w8nc/database';
import express from 'express';

// src/routes/job/jobsRoute.ts
var jobsRoute = express.Router();
jobsRoute.get("/", async (_, res) => {
  const jobs = await client.job.findMany({
    include: {
      task: true
    }
  });
  res.send(jobs);
  return;
});

export { jobsRoute };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-Q4XMHGFZ.js.map