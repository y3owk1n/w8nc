import type { JobType } from "@prisma/client";

export const JobMap = new Map([
    ["date", "SCHEDULE"],
    ["cron", "CRON"],
]);

export const getJobType = (config: object) => {
    const configKeys = Object.keys(config);
    if (configKeys.length !== 1) {
        throw new Error("Only 1 key shall exitst");
    }

    const type = JobMap.get(configKeys[0] as string) as JobType;

    return type;
};
