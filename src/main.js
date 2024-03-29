import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/components/message/register";
import "@/utils/io";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

Vue.config.productionTip = false;
Vue.use(messagePlugin);
Vue.use(mavonEditor);

import "./assets/css/normalize.css"; // 重置样式表

import "./assets/iconfonts/iconfont.css"; // 字体图标样式
import "./assets/css/font.css";

Vue.prototype.$EventBus = new Vue(); // 中央事件总线

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
