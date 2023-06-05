const cssnano = require("cssnano");
// const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const presetEnv = require("postcss-preset-env");

const isBuild = process.env.NODE_ENV === 'production';

const plugins = [
    cssnano,
    presetEnv({}),
];

module.exports = {
    plugins
}