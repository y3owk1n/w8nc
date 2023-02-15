module.exports = {
    plugins: ["@typescript-eslint"],
    extends: [
        "next",
        "turbo",
        "prettier",
        "plugin:@typescript-eslint/recommended",
    ],
    settings: {
        next: {
            rootDir: ["apps/*/", "packages/*/"],
        },
    },
    overrides: [
        {
            extends: [
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            files: ["*.ts", "*.tsx"],
            parserOptions: {
                project: "tsconfig.json",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    rules: {
        "@next/next/no-html-link-for-pages": "off",
        "react/jsx-key": "off",
        "@typescript-eslint/consistent-type-imports": "warn",
    },
};
