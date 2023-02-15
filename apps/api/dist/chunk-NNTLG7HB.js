import cron from 'cron-validate';
import dayjs from 'dayjs';
import { z } from 'zod';

// src/schema/job.ts
var jobIdSchema = z.object({
  params: z.object({
    id: z.string()
  })
});
var jobSchema = z.object({
  body: z.object({
    retry: z.number().optional(),
    config: z.object({
      date: z.string().datetime().optional(),
      cron: z.string().optional()
    }),
    url: z.string().url(),
    data: z.unknown(),
    headers: z.unknown().optional()
  }).superRefine((data, ctx) => {
    const configArr = Object.entries(data.config);
    if (configArr.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["config"],
        message: "Need to at least have 1 property in config"
      });
    }
    if (configArr.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["config"],
        message: "Pleas only provide one of the config"
      });
    }
    if (data.config.cron) {
      const cronResult = cron(data.config.cron);
      if (cronResult.isError()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["config.cron"],
          message: "Please provide a correct cron expression"
        });
      }
    }
    if (data.config.date) {
      if (dayjs(data.config.date).isBefore(dayjs())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["config.date"],
          message: "Need to be later than today"
        });
      }
    }
  })
});

export { jobIdSchema, jobSchema };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-NNTLG7HB.js.map