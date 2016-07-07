'use strict';
// Modules
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Get npm lifecycle event to determine the environment
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';
var isDevBuild = ENV === 'dev-build';

module.exports = function makeWebpackConfig () {

    var config = {};

    config.entry = isTest ? {} : {
        bundle: __dirname + '/frontend/js/core.js',
        styles: __dirname + '/frontend/styles/core.scss'
    };

    config.output = isTest ? {} : {
        // Absolute output directory
        path: __dirname + '/public',

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: (isProd || isDevBuild) ? '/' : 'http://localhost:8080/',

        // Filename for entry points
        filename: '[name].js',

        // Filename for non-entry points
        chunkFilename: '[name].js',

        // The global variable name to get access to code inside the app.
        // It may be useful with debugging.
        library: '[name]'
    };

    // Devtool
    // Reference: http://webpack.github.io/docs/configuration.html#devtool
    // Type of source map
    if (isTest) {
        config.devtool = 'inline-source-map';
    } else  {
        config.devtool = 'source-map';
    }

    // The project rebuilds through 300 ms after changes have been made
    config.watchOptions = {
        aggregateTimeout: 300
    };

    // Resolve setting describes how Webpack resolves modules.
    // We can simplify the default settings in purpose of making Webpack work more quickly
    // Reference: https://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
    config.resolve = {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    };

    // The same thing we are doing for loaders
    config.resolveLoader = {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    };

    config.module = {
        preLoaders: [],

        loaders: [{
            // Babel loader
            // Compiles ES6 into ES5 code
            // Reference: https://github.com/babel/babel-loader
            test: /\.js$/,
            include: /frontend/,
            loader: 'babel',
            query: {presets: ['es2015']}
            }, {
            // HTML loader
            // Allow loading html through js
            // Reference: https://github.com/webpack/html-loader
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html'
            }, {
            // URL loader
            // The URL loader returns a Data Url if a file is smaller than a limit.
            // If it is not  - the file is copied to a separate directory.
            // The URL loader is an extension of the File loader,
            // that is why we need the File loader as a dependency.
            // Reference: https://github.com/webpack/url-loader
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            exclude: /node_modules/,
            loader: 'url?name=[path][name].[ext]&limit=10000'
            }, {
            // SASS, CSS and Style loaders
            // SASS loader compiles SASS into CSS.
            // CSS and Style loaders allow loading CSS through JS,
            // by injecting a <style> tag to the DOM.
            // ExtractTextPlugin extracts CSS from JS to the separate file.
            // References: https://github.com/jtangelder/sass-loader
            //             https://github.com/webpack/css-loader
            //             https://github.com/webpack/style-loader

            // Note: in this project CSS is extracted to the separate file,
            // therefore The Style loader is not used.
            // In case of injecting CSS into JS, this configuration would be:
            // loader: 'style!css!resolve-url!sass?sourceMap',
            // and we also need to add The style loader into the dependencies.
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: isTest ? 'null' : ExtractTextPlugin.extract('css!resolve-url!sass?sourceMap')
        }],

        // Loaders must not parse next libraries and frameworks
        noParse: wrapRegexp(/\/node_modules\/(angular\/angular|angular-messages\/angular-messages|angular-ui-router\/release\/angular-ui-router|angularfire\/dist\/angularfire|firebase\/lib\/firebase-node|angular-material\/|angular-animate\/|angular-aria\/)/, 'noParse')
    };

    // Isparta loader
    // Instrument JS files with Isparta for subsequent code coverage reporting.
    // Reference: https://github.com/deepsweet/isparta-loader
    if (isTest) {
        config.isparta = {
            babel: {
                presets: ['es2015']
            }
        };

        config.module.preLoaders.push({
            test: /\.js$/,
            // Skip node_modules, mocks and files that end with '.spec.js'
            exclude: [
                /node_modules/,
                /mock-.*\.js/,
                /\.spec\.js$/
            ],
            loader: 'isparta'
        })
    }

    // Plugins
    // Reference: http://webpack.github.io/docs/configuration.html#plugins
    // List: http://webpack.github.io/docs/list-of-plugins.html
    config.plugins = [];

    config.plugins.push(
        // CopyWebpackPlugin copies individual files or entire directories to the build directory.
        // https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin([{from: 'node_modules/angular-material/angular-material.min.css'}])
    );

    if(!isTest) {
        config.plugins.push(
            // Extract CSS from JS to the separate file.
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            new ExtractTextPlugin('styles.css', {allChunks: true})
        );
    }

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Only emit files when there are no errors
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            new webpack.NoErrorsPlugin(),

            // Minify all javascript, switch loaders to minimizing mode
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            new webpack.optimize.UglifyJsPlugin()
        )
    }

    // Dev server configuration
    // Reference: http://webpack.github.io/docs/configuration.html#devserver
    // Reference: http://webpack.github.io/docs/webpack-dev-server.html

    config.devServer = {
        host: 'localhost', //default
            port: '8080', //default
            contentBase: './public',
            stats: 'minimal'
        /*
         Note that many editors support “safe write” feature and have it enabled by default,
         which makes dev server unable to watch files correctly. “Safe write” means changes
         are not written directly to original file but to temporary one instead,
         which is renamed and replaces original file when save operation is completed successfully.
         This behaviour causes file watcher to lose the track because the original file is removed.
         In order to prevent this issue, you have to disable “safe write” feature in your editor.
         */
    };

    // This helper function writes into console, which files have not been parsing
    function wrapRegexp(regexp, label) {
        regexp.test = function(path) {
            console.log(label, path);
            return RegExp.prototype.test.call(this, path);
        };
        return regexp;
    }

    return config;
}();