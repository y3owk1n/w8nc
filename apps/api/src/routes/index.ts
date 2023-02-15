import express from "express";
import { jobRoute } from "./job/jobRoute";
import { jobsRoute } from "./job/jobsRoute";

export const routes = express.Router();

routes.use("/jobs", jobsRoute);
routes.use("/job", jobRoute);
