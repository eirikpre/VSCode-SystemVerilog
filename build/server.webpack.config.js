const path = require('path');
const withDefaults = require('./shared.webpack.config');

module.exports = withDefaults({
    context: path.join(__dirname),
    entry: {
        extension: '../src/server.ts'
    },
    output: {
        filename: 'server.js',
        path: path.join(__dirname, '..', 'dist', 'server')
    }
});
