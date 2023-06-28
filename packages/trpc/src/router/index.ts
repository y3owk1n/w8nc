import { publicProcedure, router, t } from "../init";

export const appRouter = router({
    // shared: t.mergeRouters(sharedRouter),
    me: publicProcedure.query(async () => {

        return 'hecllo from public';
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
