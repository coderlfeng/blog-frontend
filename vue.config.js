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
        threshold: 1024,
        deleteOriginalAssets: true,
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
          priority: 1,
          chunks: "initial",
          minSize: 0,
          maxSize: 1024 * 100,
          minChunks: 1,
          maxInitialRequests: 20,
        },
      },
    });
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("webpack-bundle-analyzer")
        .use(WebpackBundleAnalyzer.BundleAnalyzerPlugin);
    });
  },
};
