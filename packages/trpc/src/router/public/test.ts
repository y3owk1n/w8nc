import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, t } from "../../trpc";

export const testRouter = t.router({
    sayHiTest: publicProcedure.query(async () => {
        return {
            hello: `test trpc`,
        };
    }),
});
