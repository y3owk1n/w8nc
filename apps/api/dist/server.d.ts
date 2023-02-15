import * as express_serve_static_core from 'express-serve-static-core';

declare const createServer: () => express_serve_static_core.Express;

export { createServer };
