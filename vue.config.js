const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/,
            threshold: 10240,
            deleteOriginalAssets: false,
          }),
        ],
      };
    }
  },
};
