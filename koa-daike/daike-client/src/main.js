import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import store from './store/index'
import 'vant/lib/vant-css/index.css'
import './assets/css/clear-default.css'

Vue.config.productionTip = false
Vue.use(Vant)

import api from './axios/index'
Vue.use(api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
