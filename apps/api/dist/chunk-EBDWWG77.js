import { routes } from './chunk-7PJ5ZCCZ.js';
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

var { json, urlencoded } = bodyParser;
var createServer = () => {
  const app = express();
  app.disable("x-powered-by").use(morgan("combined")).use(helmet()).use(urlencoded({ extended: true })).use(json()).use(cors()).use("/api", routes).get("/healthz", (_, res) => {
    return res.json({ ok: true });
  }).post("/pass", (_, res) => {
    res.send({ received: true });
  }).post("/fail", (_, res) => {
    res.status(500).send("error");
  });
  return app;
};

export { createServer };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-EBDWWG77.js.map