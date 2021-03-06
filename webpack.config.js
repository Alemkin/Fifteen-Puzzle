const path = require('path')
const EncodingPlugin = require('webpack-encoding-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const encodingPlugin = new EncodingPlugin({
  encoding: 'UTF-8'
})

const minimize = {
  minimizer: [
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 5
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

module.exports = {
  entry: [
    './app/index.js'
  ],

  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'main.[hash].js'
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ['babel-loader'], include: path.join(__dirname, 'app') },
      { test: /\.(scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|svg|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader?name=img/[name]-[hash].[ext]',
            options: {
              limit: 8192
            }
          }
        ]
      },
      { test: /\.js$/, use: ['i18next-resource-store-loader'], include: path.join(__dirname, './app/translations') },
      { test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: 'file-loader?name=[name].[ext]' }
    ]
  },

  plugins: [
    encodingPlugin,
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      inject: false,
      filename: 'index.html',
      title: 'Puzzle Game'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new GenerateSW({
      exclude: ['index.html', '/index.html']
    }),
    new CopyPlugin({
      patterns: [
        { from: './pwa', to: '' },
        { from: './assets/css/bootstrap-4.2.1.min.css', to: './assets/css' },
        { from: './assets/js/core-js-3.6.4.min.js', to: './assets/js' },
        { from: './assets/js/runtime-0.13.3.min.js', to: './assets/js' }
      ]
    })
  ],

  optimization: process.env.NODE_ENV === 'production' ? minimize : {},

  devServer: {
    port: 3002,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  }
}
