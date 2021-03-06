'use strict';

module.exports = {
    entry: {
        game: './app/client/main',
        phaser: './node_modules/phaser/build/phaser'
    },

    output: {
        filename: '[name].bundle.js',
        path: './public/dist'
    },

    module: {
        loaders: [
            {
                test: /phaser\.js$/,
                loader: 'script-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ]
    }
};
