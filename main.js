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
import httpApi from '@/config/request'
Vue.use(httpApi, app)

// 4.引入自定义的utils工具,如判断是否登录，未登录则重定向到login页面
import utils from '@/common/utils'
Vue.use(utils, app)

// 5.注册过滤器
import * as filters from '@/common/filters'
Object.keys(filters).forEach((key) => {
  Vue.filter(key,filters[key])
})
app.$mount()
