import { Request } from 'express';
import { AnyZodObject, z } from 'zod';

declare function zParse<T extends AnyZodObject>(schema: T, req: Request): Promise<z.infer<T>>;

export { zParse };
