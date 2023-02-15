import { createServer } from "./server";
import { startBree } from "./bree";
import { log } from "@w8nc/logger";

const port = process.env.PORT || 8000;
const server = createServer();

startBree()
    .then(() => {
        return;
    })
    .catch(() => {
        return;
    });

server.listen(port, () => {
    log(`api running on ${port}`);
});
