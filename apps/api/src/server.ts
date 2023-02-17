import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { routes } from "./routes";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "@w8nc/trpc";
import bodyParser from "body-parser";

const { json, urlencoded } = bodyParser;

export const createServer = () => {
    const app = express();
    app.disable("x-powered-by")
        .use(morgan("combined"))
        .use(helmet())
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors())
        .use(
            "/trpc",
            trpcExpress.createExpressMiddleware({
                router: appRouter,
                createContext,
            })
        )
        .use("/api", routes)
        .get("/healthz", (_, res) => {
            return res.json({ ok: true });
        })
        .post("/pass", (_, res) => {
            res.send({ received: true });
        })
        .post("/fail", (_, res) => {
            res.status(500).send("error");
        });

    return app;
};
