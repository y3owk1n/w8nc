
export const parseConfig = ({
    date,
    cron,
}: {
    date: Date | null;
    cron: string | null;
}) => {
    if (date && cron) {
        throw new Error("error parsing config");
    }
    if (date) {
        return {
            date: date,
        };
    }
    if (cron) {
        return {
            cron: cron,
        };
    }
};
