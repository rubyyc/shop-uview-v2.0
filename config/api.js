const http = uni.$u.http

// post请求，获取菜单
// export const postMenu = (params, config = {}) => http.post('/ebapi/public_api/index', params, config)

export const postIndex = (params, config = {}) => http.post('/api/auth/login', params, config)


// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
// 实际上每个api的data,params.config可以自由配置,具体看你的业务逻辑
// export const getIndex = (params, config) => http.get('/api/goods' + uni.$u.queryParams(params), config)

export const getIndex = id => http.get(`/api/goods/${id}`)