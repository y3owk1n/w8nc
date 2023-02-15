declare const parseConfig: ({ date, cron, }: {
    date: Date | null;
    cron: string | null;
}) => {
    date: Date;
    cron?: undefined;
} | {
    cron: string;
    date?: undefined;
} | undefined;

export { parseConfig };
