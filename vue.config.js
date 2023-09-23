const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "./", // 公共路径
  outputDir: "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  chainWebpack: (config) => {
    //  全局导入外部cdn环境变量
    config.externals({ hw: "hw" });
    config.plugin("html").tap((args) => {
      args[0].cdn = {
        js: [
          "https://ganfutong.jiangxi.gov.cn/jmopenpub/jmopen_files/webapp/html5/gftAPI/hanwebAPI-2.0.0.min.js",
        ],
      };
      //  设置站点标题
      args[0].title = process.env.VUE_APP_NAME;
      return args;
    });
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve(__dirname, "./src/static/theme/default.less")],
    },
  },
  devServer: {
    proxy: {
      //配置多个跨域
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "/",
        },
      },
    },
  },
});
