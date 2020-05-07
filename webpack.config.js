const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    mode: "development",
    entry: [
        "./src/index.js",
        "./src/index.scss"
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    }, 
                    "sass-loader"
                    
                ]
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
        })
    ]

};