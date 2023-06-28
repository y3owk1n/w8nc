import { client } from "@w8nc/database";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// type CreateContextOptions = {
//     session: Session | null;
//     currentProfileId: string | null | undefined;
// };

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
// export const createContextInner = async (opts: CreateContextOptions) => {
//     return {
//         session: opts.session,
//         prisma,
//         novu,
//         currentProfileId: opts.currentProfileId,
//     };
// };

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async ({ req, res }: trpcExpress.CreateExpressContextOptions) => {

    // const currentProfileId = req.cookies["currProfileId"];

    // Get the session from the server using the getServerSession wrapper function
    // const session = await getServerAuthSession({ req, res, platform: process.env.APP_TYPE as UserPermissionRole });

    // return await createContextInner({
    //     session,
    //     currentProfileId,
    // });
    return {}
};

export type Context = inferAsyncReturnType<typeof createContext>;
