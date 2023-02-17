// import { client } from "@w8nc/database";
// import { getServerAuthSession } from "@skba/lib/index";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
// import { Session } from "next-auth";

type CreateContextOptions = {
    // session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
    return {
        // session: opts.session,
        // client,
    };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
    opts: trpcExpress.CreateExpressContextOptions
) => {
    // Get the session from the server using the unstable_getServerSession wrapper function
    // const session = await getServerAuthSession(opts);

    return await createContextInner({
        // session,
    });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
