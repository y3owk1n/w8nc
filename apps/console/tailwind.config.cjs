const { join } = require("path");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
    theme: {
        extend: {
            colors: {
                brandblue: colors.blue[500],
                brandred: colors.red[500],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
