import { JobType } from '@prisma/client';

declare const JobMap: Map<string, string>;
declare const getJobType: (config: object) => JobType;

export { JobMap, getJobType };
