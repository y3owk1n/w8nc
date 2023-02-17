import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

/**
 * Init TRPC Server
 * @link https://trpc.io/
 */
export const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

/**
 * Init Public Procedure for procedures.
 * @link https://trpc.io/
 */
export const publicProcedure = t.procedure.use(({ ctx, next }) => {
    return next({
        ctx: {
            ...ctx,
        },
    });
});

/**
 * Init Authed Procedure for procedures.
 * @link https://trpc.io/
 */
// export const authedProcedure = t.procedure.use(({ ctx, next }) => {
//     if (!ctx.session || !ctx.session.user) {
//         throw new TRPCError({ code: "UNAUTHORIZED" });
//     }
//
//     return next({
//         ctx: {
//             ...ctx,
//             // infers that `session` is non-nullable to downstream resolvers
//             session: { ...ctx.session, user: ctx.session.user },
//         },
//     });
// });
