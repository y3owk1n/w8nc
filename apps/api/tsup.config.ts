import { defineConfig } from "tsup";
import type { Options } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig((options: Options) => ({
    treeshake: true,
    splitting: true,
    clean: true,
    dts: true,
    entry: ["src/**/*.ts"],
    format: ["esm"],
    minify: isProduction,
    sourcemap: true,
    external: ["@w8nc/logger", "@w8nc/database"],
    ...options,
}));
