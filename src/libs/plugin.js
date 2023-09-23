//  UI
import "amfe-flexible";
import Vant from "vant";
import "vant/lib/index.css";
//  定制存储
import StorageClient from "@/libs/storage";
//  定制组件
import Loading from "@/directive/loading";
//  站点配置

//  三方插件
import VConsole from "vconsole";
//  剪贴板功能
import vueclipboard from "vue-clipboard2";

export const storage = new StorageClient({
  storage: localStorage,
  lock: process.env.VUE_APP_VERSION,
  clearTime: 3 * 60 * 60 * 1000,
});

export default (Vue) => {
  if (process.env.NODE_ENV === "development") {
    new VConsole();
  }
  //  全局挂载
  Vue.prototype.storage = storage;

  //  全局注册
  Vue.use(Vant);
  Vue.use(vueclipboard);
  //  全局指令
  Vue.use(Loading);
};
