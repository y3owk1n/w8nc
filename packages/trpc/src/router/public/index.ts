import { publicProcedure, t } from "../../trpc";
import { helloRouter } from "./hello";
import { testRouter } from "./test";

export const publicRouter = t.mergeRouters(helloRouter, testRouter);
