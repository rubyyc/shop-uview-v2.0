import App from './App'

// #ifndef VUE3
import Vue from 'vue'

// 假设您项目中已使用VueX
import store from './store'
Vue.prototype.$store = store

const vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 引入请求封装，将app参数传递到配置中
require('@/config/request.js')(app)

app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif