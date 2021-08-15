const path = require('path');
const webpack = require("webpack");
const ConsoleLogOnBuildWebpackPlugin = require("./plugins/ConsoleLogOnBuildWebpackPlugin");

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ConsoleLogOnBuildWebpackPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        useLocalIp: true,
        host: '0.0.0.0',
        port: 3000,
        disableHostCheck: true,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true,
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8080'
        })
    },
    entry: './src/index.jsx',
    output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist/",
    filename: 'bundle.js'
  }
}




