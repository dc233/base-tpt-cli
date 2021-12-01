import { isFunction } from '@/utils/validate'

// 使用async/await 包装的请求方法
export const $awaitHttpRequest = async function(pro, objct = {}) {
  if (isFunction(pro)) {
    const { formData, parms, success, fail, complete } = objct
    try {
      const res = await pro(formData, parms)
      success && isFunction(success) && (await success(res))
    } catch (error) {
      console.log(error)
      fail && isFunction(fail) && (await fail(error))
    } finally {
      complete && isFunction(complete) && (await complete())
    }
  } else {
    throw TypeError('只能传promise作为第一个参数')
  }
}
