import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import messagePlugin from '@/components/message/register'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(messagePlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/utils/rem.js'
import "tailwindcss/tailwind.css"

import "./assets/iconfonts/iconfont.css" // 字体图标样式

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
