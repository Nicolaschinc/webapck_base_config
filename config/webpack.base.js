const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const util = require('./util');
const conf = require('./project.json');
const isProd = (process.env.NODE_ENV === 'prod');

const entries = util.getEntries(conf.entry);

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: isProd ? './' : '',
        filename: 'js/' + (isProd ? '[name]-[hash:8].js' : '[name].js'),
        chunkFilename: 'js/[chunkhash:8].chunk.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: !isProd ? 'css/[name].css' : 'css/[name]-[hash:8].css',
            chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(html|htm)$/i,
                exclude: /node_modules/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(css)$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        esModule: false,
                        outputPath: (url) => `img/${url.split('/').pop()}`
                    }
                }, 'image-webpack-loader']
            }
        ]
    }

}