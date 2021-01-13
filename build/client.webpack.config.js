const path = require('path');
const withDefaults = require('./shared.webpack.config');

module.exports = withDefaults({
    context: path.join(__dirname),
    entry: {
        extension: '../src/extension.ts'
    },
    output: {
        filename: 'extension.js',
        path: path.join(__dirname, '..', 'dist', 'client')
    }
});
