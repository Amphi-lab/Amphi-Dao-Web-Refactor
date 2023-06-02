const cssnano = require("cssnano");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const presetEnv = require("postcss-preset-env");

const isBuild = process.env.NODE_ENV === 'production';

const plugins = [
    tailwindcss,
    presetEnv({}),
];

module.exports = {
    plugins: isBuild ? [...plugins, cssnano] : [...plugins, autoprefixer],
}