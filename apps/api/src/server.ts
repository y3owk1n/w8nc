import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createServer = () => {
    const app = express();
    app.disable("x-powered-by")
        .use(morgan("dev"))
        .use(helmet())
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors())
        // .use(
        //     "/trpc",
        //     trpcExpress.createExpressMiddleware({
        //         router: appRouter,
        //         createContext,
        //     })
        // )
        .get("/message/:name", (req, res) => {
            return res.json({ message: `hello ${req.params.name}` });
        })
        .get("/healthz", (req, res) => {
            return res.json({ ok: true });
        });

    return app;
};
