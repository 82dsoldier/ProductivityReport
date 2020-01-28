var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    //'Application/application': './src/js/Application/application.tsx',
    'server': './src/ts/server.tsx',
    'drive': './src/ts/drive.tsx'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'Layouts/Application.Management'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(eot|woff|ttf)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: '/fonts',
            publicPath: './wwwroot/fonts',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: '/images',
            publicPath: '/_layouts/15/Application.Management/images',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['src', 'node_modules']
  },
  externals: {
    'React': 'react',
    'ReactDOM': 'react-dom'
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      }
    })
  ]
};