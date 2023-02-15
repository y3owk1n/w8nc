import { badRequest } from '@hapi/boom';
import { ZodError } from 'zod';

// src/lib/zParse.ts
async function zParse(schema, req) {
  try {
    return schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message);
    }
    return badRequest(JSON.stringify(error));
  }
}

export { zParse };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-ZET6VW4Y.js.map