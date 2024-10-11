const path = require('path');
const rimraf = require('rimraf');
const wepack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');

const isProduction = process.env.NODE_ENV === 'production';
rimraf.sync(path.resolve(__dirname, '../build'));

wepack(
  {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
      }),
      // 生成react-client-manifest.json文件
      new ReactServerWebpackPlugin({ isServer: false }),
    ],
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log('Finished running webpack with errors.');
      info.errors.forEach((e) => console.error(e));
      process.exit(1);
    } else {
      console.log('Finished running webpack.');
    }

    console.log('Build complete');
  },
);
