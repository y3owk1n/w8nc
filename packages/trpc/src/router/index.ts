import { publicProcedure, t } from "../trpc";
import { publicRouter } from "./public";

export const appRouter = t.mergeRouters(publicRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
