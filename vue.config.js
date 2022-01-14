const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/,
        filename: "[path].gz",
        algorithm: "gzip",
        threshold: 10240,
        deleteOriginalAssets: false,
      })
    );
  },
};
