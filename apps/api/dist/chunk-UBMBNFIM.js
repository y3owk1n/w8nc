import { jobRoute } from './chunk-QZKY3LT4.js';
import { jobsRoute } from './chunk-Q4XMHGFZ.js';
import express from 'express';

var routes = express.Router();
routes.use("/jobs", jobsRoute);
routes.use("/job", jobRoute);

export { routes };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-UBMBNFIM.js.map