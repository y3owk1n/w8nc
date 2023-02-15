const eslintPreset = require("@w8nc/config/eslint-preset.cjs");

module.exports = {
    env: {
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    ...eslintPreset,
};
