axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  vant.Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
  });
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.status == 200){
    vant.Toast.clear()
    return response.data
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
var API = {
  DEBUG: true,
  _send(method, data) {
    return new Promise((resolve, reject) => {
      axios.get(method, {
        params: data || {}
      }).then(function (response) {
        resolve(response)
      }).catch(function (error) {
        reject(error)
        console.log(err)
      })
    })
  },

  /**
   * 获取歌单分类
   * @params 方法名 如/playlist/catlist
   * @params Function success 回调函数 如果回调为null说明服务器报错了或者errcod非0
   */
  getSongList(url, data) {
    return new Promise((resolve, reject) => {
      API._send(url, data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(error)
      })
    })
  },
  /**
   * 获取歌单分类下的具体歌单列表
   * @params 方法名 如/playlist/catlist
   * @params Function success 回调函数 如果回调为null说明服务器报错了或者errcod非0
   */
  getSongList(url, data) {
    return new Promise((resolve, reject) => {
      API._send(url, data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(error)
      })
    })
  }
}
