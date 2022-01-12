const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/,
        filename: "[path][base].gz",
        algorithm: "gzip",
        threshold: 10240,
        deleteOriginalAssets: false,
      })
    );
  },
  devServer: {
    // port: port,
    open: true,
  }
};
