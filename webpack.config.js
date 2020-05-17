const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const { mode } = env;

    isDev = mode === "development";

    return {
        mode: mode,
        entry: [
            "./src/index.js"
        ],
        output: {
            filename: "./js/bundle.[hash].js",
            path: path.resolve(__dirname, "build"),
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [ !isDev ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./public/index.html"
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "./css/[name].[hash].css"
            }),
            new CopyPlugin({
                patterns: [
                    { from: "public/sounds", to: "sounds" }
                ]
            })
        ],

        devServer: {
            contentBase: path.resolve(__dirname, "build")
        }

    };
};