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
                test: /phaser\.js$/,
                loader: 'script-loader'
            },
            {
                test: /public\/(.*)\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
