module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                'no-console': 'off',
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};