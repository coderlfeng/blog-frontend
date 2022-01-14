const CompressionPlugin = require("compression-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");

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
  devServer: {
    // port: port,
    open: true,
  },
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
          minSize: 0,
          maxSize: 1024 * 20,
          minChunks: 1,
          maxInitialRequests: 5
        },
      },
    });
    config
      .plugin("webpack-bundle-analyzer")
      .use(WebpackBundleAnalyzer.BundleAnalyzerPlugin);
  },
};
