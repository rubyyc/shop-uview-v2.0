import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

// 1.引入uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 2.引入vuex
import store from '@/store'
Vue.prototype.$store = store

const vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)



const app = new Vue({
  store,
  ...App
})

// 3.引入请求封装，将app参数传递到配置中
// require('@/config/request.js')(app)

// 3.引入请求封装，将app参数传递到配置中
import httpApi from '@/config/request.js'
Vue.use(httpApi, app)


app.$mount()
