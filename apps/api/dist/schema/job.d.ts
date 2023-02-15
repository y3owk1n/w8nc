import { z } from 'zod';

declare const jobIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
declare const jobSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        retry: z.ZodOptional<z.ZodNumber>;
        config: z.ZodObject<{
            date: z.ZodOptional<z.ZodString>;
            cron: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            date?: string | undefined;
            cron?: string | undefined;
        }, {
            date?: string | undefined;
            cron?: string | undefined;
        }>;
        url: z.ZodString;
        data: z.ZodUnknown;
        headers: z.ZodOptional<z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data?: unknown;
        retry?: number | undefined;
        headers?: unknown;
        url: string;
        config: {
            date?: string | undefined;
            cron?: string | undefined;
        };
    }, {
        data?: unknown;
        retry?: number | undefined;
        headers?: unknown;
        url: string;
        config: {
            date?: string | undefined;
            cron?: string | undefined;
        };
    }>, {
        data?: unknown;
        retry?: number | undefined;
        headers?: unknown;
        url: string;
        config: {
            date?: string | undefined;
            cron?: string | undefined;
        };
    }, {
        data?: unknown;
        retry?: number | undefined;
        headers?: unknown;
        url: string;
        config: {
            date?: string | undefined;
            cron?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        data?: unknown;
        retry?: number | undefined;
        headers?: unknown;
        url: string;
        config: {
            date?: string | undefined;
            cron?: string | undefined;
        };
    };
}, {
    body: {
        data?: unknown;
        retry?: number | undefined;
        headers?: unknown;
        url: string;
        config: {
            date?: string | undefined;
            cron?: string | undefined;
        };
    };
}>;

export { jobIdSchema, jobSchema };
