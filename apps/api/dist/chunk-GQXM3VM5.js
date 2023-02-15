// src/lib/parseConfig.ts
var parseConfig = ({
  date,
  cron
}) => {
  if (date && cron) {
    throw new Error("error parsing config");
  }
  if (date) {
    return {
      date
    };
  }
  if (cron) {
    return {
      cron
    };
  }
};

export { parseConfig };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-GQXM3VM5.js.map