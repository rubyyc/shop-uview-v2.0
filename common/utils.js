const install = (Vue, vm) => {
  const isLogin = () => {
    console.log('utils来统一判断是否登录');
  }

  vm.$u.utils = {
    isLogin
  }
  
}

export default {
  install
}