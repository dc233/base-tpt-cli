import $axios from '../http/index'

// 普通post
export function getCount(data: object | undefined) {
  const url = 'getcount'
  return $axios.get(url, data)
}
