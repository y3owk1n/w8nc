import { PrismaClient } from '@prisma/client';
export * from '@prisma/client';

// src/client.ts
var client = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { client };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-7YSJQHHN.mjs.map