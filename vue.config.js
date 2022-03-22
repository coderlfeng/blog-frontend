const CompressionPlugin = require("compression-webpack-plugin");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const UglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  productionSourceMap: false,

  devServer: {
    open: true,
    proxy: {
      "/map": {
        target: "https://api.map.baidu.com/reverse_geocoding/v3",
        changeOrigin: true,
        pathRewrite: {
          "^/map": "",
        },
      },
      "/weather": {
        target: "http://t.weather.itboy.net",
        changeOrigin: true,
        pathRewrite: {
          "^/weather": "",
        },
      },
      "/city": {
        target: "https://ip.ws.126.net",
        changeOrigin: true,
        pathRewrite: {
          "^/city": "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 把依赖分包
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

    config.when(process.env.NODE_ENV === "production", (config) => {
      // 打包分析
      config
        .plugin("webpack-bundle-analyzer")
        .use(WebpackBundleAnalyzer.BundleAnalyzerPlugin);

      // gzip压缩
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/,
          filename: "[path].gz",
          algorithm: "gzip",
          threshold: 1024,
          deleteOriginalAssets: false,
        })
      );

      // uglify代码
      config.plugin("uglifyPlugin").use(
        new UglifyPlugin({
          uglifyOptions: {
            output: { comments: false },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ["console.log"],
            },
          },
        })
      );
    });

    config.when(process.env.NODE_ENV === "development", (config) =>
      config.devtool("source-map")
    );
  },
};
