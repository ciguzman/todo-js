

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    //el npm run build arroja que esta haciendo en modo de produccion por defecto
    //remuebe comentarios (si esta como production), pero en desarrollo ocupamos ver los comentarios
    mode: 'development',

    //sirve cuando el modo esta en produduction (para minimizar css)
    optimization:{
        minimizer: [new OptimizeCssAssetsPlugin()]
    },

    module: {
        rules: [
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
            //que hacer con ciertos tipos de archivos
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
            //para prevenir el cache, pero aun estamos en desarrolo
            // filename: '[name].[contenthash].css',
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' },
            ],
        })
    ]

}


