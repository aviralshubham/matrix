const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './index.js',
    plugins: [new HtmlWebpackPlugin({ title: 'Matrix FE Server' })],
    output: {
        path: path.join(__dirname, 'fe-build'),
        publicPath: '/',
        filename: 'fe-server.js',
        clean: true,
    },
    target: 'node',
}
