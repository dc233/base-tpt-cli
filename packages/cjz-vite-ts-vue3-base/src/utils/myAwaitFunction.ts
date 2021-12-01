interface optionsInterface {
  pro: Function
  formData?: object | undefined
  parms?: string | number | undefined
  success?: Function | undefined
  fail?: Function | undefined
  complete?: Function | undefined
}

// 使用async/await 包装的请求方法
export const $awaitHttpRequest = async function (options: optionsInterface) {
  const { pro, formData, parms, success, fail, complete } = options
  try {
    const res = await pro(formData, parms)
    success && (await success(res))
  } catch (error) {
    console.log(error)
    fail && (await fail(error))
  } finally {
    complete && (await complete())
  }
}
