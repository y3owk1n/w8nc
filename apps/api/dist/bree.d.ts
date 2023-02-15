import Bree from 'bree';

declare const bree: Bree;
declare function startBree(): Promise<void>;
declare const addBreeJob: ({ jobId, jobFileName, date, cron, workerData, }: {
    jobId: string;
    jobFileName: string;
    date: Date | null;
    cron: string | null;
    workerData: object;
}) => Promise<void>;

export { addBreeJob, bree, startBree };
