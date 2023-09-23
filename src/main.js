import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import plugin from "@/libs/plugin";
//  统一管理额外插件包方法
plugin(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
