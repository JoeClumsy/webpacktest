"use strict";

// Switch prod / develop
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: "./home", // entry point
    output: {
        filename: "build.js", // output filename
        library: "home" //
    },

    watch: NODE_ENV == 'development', // auto webpack command

    watchOptions: {
        aggregateTimeout: 100 // auto timeout
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null, // source map

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV), // set NODE_ENV=development
            LANG: JSON.stringify('ru')
        })
    ],

    module: {

        loaders: [{
            test: /\.js$/,
            loader: 'babel?optional[]=runtime'
        }]

    }

};