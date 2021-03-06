const path = require('path');
const cssConfig = require('./css-config.json');
const cssTest = require('./css-test');

const appPath = path.resolve(__dirname, '../src');

const publicPaths = [path.resolve(appPath, 'assets'), path.resolve(__dirname, '../node_modules')];

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: appPath,
            query: {
                presets: ['es2015', 'react'],
                compact: false
            }
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'url'
        }, {
            test: cssTest(cssConfig.language),
            include: publicPaths,
            loader: 'style!css!sass'
        }, {
            test: cssTest(cssConfig.language),
            exclude: publicPaths,
            loader: `style!css?modules&localIdentName=[name]__[local]${cssConfig.language ? '!' + cssConfig.language : ''}`
        }]
    }
}
