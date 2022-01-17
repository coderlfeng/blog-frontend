import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from '@/components/message/register'

Vue.config.productionTip = false
Vue.use(messagePlugin)

import "./assets/css/normalize.css" // 重置样式表
import "./assets/css/comm.css" // 公共样式

import "./assets/iconfonts/iconfont.css" // 字体图标样式

Vue.prototype.$EventBus = new Vue(); // 中央事件总线

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
