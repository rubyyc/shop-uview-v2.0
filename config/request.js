// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
  // 初始化请求配置
  uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置*/
    config.baseURL = 'https://api.shop.eduwork.cn/' /* 根域名 */
    config.header = {}
    config.dataType = 'json'
    config.timeout = 60000
    config.custom.auth = true
    return config
  })

  // 请求拦截
  uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
    config.data = config.data || {}
    // 根据custom参数中配置的是否需要token，添加对应的请求头
    if (config?.custom?.auth) {
      // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
      // config.header.token = vm.$store.state.userInfo.token
      config.header.Authorization = 'Bearer ' + vm.access_token
    }
    return config
  }, config => { // 可使用async await 做异步操作
    return Promise.reject(config)
  })


  // 响应拦截
  uni.$u.http.interceptors.response.use((response) => {
    // statusCode为200的情况
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    console.log('结果', response);
    return response.data === undefined ? {} : response.data
  }, (response) => {
    // 对响应错误做点什么 （statusCode !== 200）
    console.log('不等于200');
    // token验证失败
    const {
      statusCode,
      data
    } = response
    // 自定义参数
    const custom = response.config?.custom
    // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
    if (custom.toast !== false) {
      uni.$u.toast(data.errMsg)
    }
    if (statusCode === 400) {
      console.log('400错误');
      // uni.$u.toast(data.errMsg)
    } else if (statusCode === 401) {
      console.log('401错误');
      setTimeout(() => {
        uni.$u.route('pages/login/login')
      },1500)
    } else if (statusCode === 422) {
      console.log('422错误');
      const {
        errors
      } = data
      uni.$u.toast(Object.values(errors)[0][0])
    }
    // 如果需要catch返回，则进行reject
    console.log('custom', custom);
    if (custom?.catch) {
      return Promise.reject(data)
    } else {
      // 否则返回一个pending中的promise，请求不会进入catch中
      console.log('请求不会进入catch中');
      return new Promise(() => {})
    }
    // return Promise.reject(response)
  })

  // 增加patch
  uni.$u.patch = (url, params = {},config = {}) => {
    console.log('patch请求');
    // 模拟patch
    const _params = {
      ...params,
      _method: 'PATCH'
    }
    return uni.$u.http.post(url,_params,config)
  }
}