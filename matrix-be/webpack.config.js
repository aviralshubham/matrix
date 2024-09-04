const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './index.js',
    plugins: [new HtmlWebpackPlugin({ title: 'Matrix API' })],
    output: {
        path: path.join(__dirname, 'be-build'),
        publicPath: '/',
        filename: 'be-server.js',
        clean: true,
    },
    target: 'node',
}
