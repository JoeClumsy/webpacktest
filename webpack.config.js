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

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" :
        null, // source map

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV), // set NODE_ENV=development
            LANG: JSON.stringify('ru')
        })
    ],

    resolve: { // find modules
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: { // find loaders
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {

        loaders: [{
            test: /\.js$/,
            loader: 'babel?optional[]=runtime' // babel
        }]

    }

};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ // minification
            compress: {
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    )
}