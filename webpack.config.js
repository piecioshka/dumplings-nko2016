module.exports = {
    entry: __dirname + '/app/main.js',

    output: {
        path: __dirname + '/public/dist/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};
