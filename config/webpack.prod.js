const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.base');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -1,
                    chunks: 'all',
                    name: 'vendors'
                }
            }
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin()
    ]
})