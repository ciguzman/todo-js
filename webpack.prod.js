
const path = require('path');   
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    //el npm run build arroja que esta haciendo en modo de produccion por defecto
    //remuebe comentarios (si esta como production), pero en desarrollo ocupamos ver los comentarios
    mode: 'production',

    //sirve cuando el modo esta en produduction (para minimizar css)(por ahora no jala)
    optimization:{
        minimizer: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
    output:{
        //contentHash evita cache
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            //que hacer con ciertos tipos de archivos
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['minify']
                  }
                }
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                //la condicion que tiene que evaluar
                //expresion recular: buscar coincidencias
                //aplique esta regla si encuenta un archivo html
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },                
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                //lo que quiero que haga
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            //cual y hacia donde
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        }),
    ]

}


