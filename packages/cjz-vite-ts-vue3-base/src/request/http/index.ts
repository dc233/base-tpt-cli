import axios from 'axios'

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: import.meta.env.VITE_BASE_URL as string | undefined,
})

console.log(import.meta.env.VITE_BASE_URL)

// 请求拦截器
$axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
$axios.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data
    if (code !== 200) {
      alert(msg)
      return Promise.reject(msg)
    }
    return { data, msg }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          alert('网络请求不存在')
          break
        case 503:
          alert('服务器不可用')
          break
        default:
          alert(error.response.data.message)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        alert('网络请求超时')
      } else {
        alert('请求失败')
      }
    }
    return Promise.reject(error)
  }
)

// get，post请求方法
export default {
  post(url: string, data: object | undefined) {
    return $axios({
      method: 'post',
      url,
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
  },
  postupload(url: string, data: object | undefined) {
    return $axios({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  jsonpost(url: string, data: object | undefined) {
    return $axios({
      method: 'post',
      url,
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })
  },
  get(url: string, params: object | undefined) {
    return $axios({
      method: 'get',
      url,
      params,
    })
  },
}
