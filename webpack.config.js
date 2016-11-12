'use strict';

module.exports = {
    entry: {
        game: './public/scripts/main',
        phaser: './node_modules/phaser/build/phaser'
    },

    output: {
        filename: '[name].bundle.js',
        path: './public/dist'
    },

    module: {
        loaders: [
            {
                text: /phaser\.js$/,
                loader: 'script-loader'
            },
            {
                text: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
