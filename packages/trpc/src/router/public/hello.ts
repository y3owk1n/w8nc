import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, t } from "../../trpc";

export const helloRouter = t.router({
    sayHi: publicProcedure.query(async () => {
        return {
            hello: `trpc`,
        };
    }),
});
