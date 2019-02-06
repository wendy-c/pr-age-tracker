import * as webpack from 'webpack';
const Dotenv = require('dotenv-webpack');

const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();

const clientConfig: webpack.Configuration = {
  entry: "./src/client/index.tsx",
  output: {
    path: __dirname + '/public',
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
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
  plugins: [new Dotenv()]
};

const serverConfig: webpack.Configuration = {
  entry: {
    server: "./src/server/index.ts"
  },
  target: "node",
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
  externals: ['express']
};

export default [clientConfig, serverConfig];