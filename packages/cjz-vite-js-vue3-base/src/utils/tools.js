// 判断设备类型
export function judgeDeviceType() {
  let ua = window.navigator.userAgent.toLocaleLowerCase()
  let isIOS = /iphone|ipad|ipod/.test(ua)
  let isAndroid = /android/.test(ua)
  return {
    isIOS: isIOS,
    isAndroid: isAndroid
  }
}

// blob 转file
export function blobToFile(theBlob, imganme) {
  let file = new window.File([theBlob], imganme, { type: 'image/jpeg' })
  return file
}
