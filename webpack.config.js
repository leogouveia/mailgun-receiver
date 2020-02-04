const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// Credits: https://hackernoon.com/webpack-creating-dynamically-named-outputs-for-wildcarded-entry-files-9241f596b065
const entryArray = glob.sync("./src/**/app.ts");
const entryObject = entryArray.reduce((acc, item) => {
  let name = path.dirname(item.replace("./src/", ""));
  // conforms with Webpack entry API
  // Example: { test: './src/test/app.ts' }
  acc[name] = item;
  return acc;
}, {});

const config = smp.wrap({
  entry: entryObject,
  devtool: "source-map",
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  resolve: {
    extensions: [".ts", ".js"],
    symlinks: false,
    cacheWithContext: false
  },
  // Output directive will generate build/<function-name>/app.js
  output: {
    filename: "[name]/app.js",
    path: path.resolve(__dirname, "build"),
    devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    // credits to Rich Buggy!!!
    libraryTarget: "commonjs2"
  }
});

if (process.env.BUNDLE_ANALYZER && process.env.BUNDLE_ANALYZER === "true") {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "../info/bundle-report.html",
      openAnalyzer: false
    })
  );
}

module.exports = config;
