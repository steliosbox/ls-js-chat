const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {

    output: {
        filename: 'main.bundle.js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    scss: 'style-loader!css-loader!sass-loader'
                }
            },
        }),
        // new UglifyJSPlugin()
    ]
};

module.exports = config;