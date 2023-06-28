import { startBree } from "./bree";
import { createServer } from "./server";
import { log } from "@w8nc/logger";

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
    log(`api running on ${port}`);

    startBree()
        .then(() => {
            return;
        })
        .catch(() => {
            return;
        });
});
