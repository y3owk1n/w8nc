// src/lib/getJobType.ts
var JobMap = /* @__PURE__ */ new Map([
  ["date", "SCHEDULE"],
  ["cron", "CRON"]
]);
var getJobType = (config) => {
  const configKeys = Object.keys(config);
  if (configKeys.length !== 1) {
    throw new Error("Only 1 key shall exitst");
  }
  const type = JobMap.get(configKeys[0]);
  return type;
};

export { JobMap, getJobType };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-GDKE6HDW.js.map