const path = require('path');
const merge = require('merge-options'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function withDefaults(extConfig) {
    const config = {
        mode: 'none',
        target: 'node',
        node: {
            __dirname: false
        },
        entry: './src/extension.ts',
        output: {
            path: path.join(extConfig.context, 'dist'),
            filename: '[name].js',
            libraryTarget: 'commonjs2',
            devtoolModuleFilenameTemplate: '../[resource-path]'
        },
        devtool: 'source-map',
        externals: {
            vscode: 'commonjs vscode'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
            ]
        }
    };

    return merge(config, extConfig);
};
