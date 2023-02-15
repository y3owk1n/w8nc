const eslintPreset = require("@w8nc/config/eslint-preset.cjs");

module.exports = {
    settings: {
        react: {
            version: "detect",
        },
    },
    ...eslintPreset,
};
