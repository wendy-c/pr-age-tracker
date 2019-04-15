import * as webpack from 'webpack';
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const clientConfig: webpack.Configuration = {
  entry: {
    app: ["./src/client/index.tsx", "webpack-hot-middleware/client"],
  },
  output: {
    path: __dirname + '/public',
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    contentBase: "public",
    overlay: true,
    hot: true
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        }
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

const serverConfig: webpack.Configuration = {
  entry: {
    server: "./src/server/index.ts"
  },
  output: {
    path: __dirname + "/public",
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "css-loader/locals",
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: "awesome-typescript-loader",
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
        }
      },
    ],
  },
  target: "node",
  externals: [nodeExternals()]
};

export default [clientConfig, serverConfig];