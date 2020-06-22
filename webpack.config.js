const path = require("path");
const autoprefixer = require("autoprefixer");
const miniCssExtract = require("mini-css-extract-plugin");

const ENTRY = path.resolve(__dirname, "assets", "js", "main");
const OUTPUT = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY],
  mode: process.env.WEBPACK_ENV,
  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          miniCssExtract.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer()];
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new miniCssExtract({ filename: "styles.css" })],
  output: {
    path: OUTPUT,
    filename: "[name].js",
  },
};

module.exports = config;
