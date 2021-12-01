// 判断设备类型
export function judgeDeviceType() {
  let ua = window.navigator.userAgent.toLocaleLowerCase()
  let isIOS = /iphone|ipad|ipod/.test(ua)
  let isAndroid = /android/.test(ua)
  return {
    isIOS: isIOS,
    isAndroid: isAndroid,
  }
}

// blob 转file
export function blobToFile(theBlob: Blob, imgname: string) {
  let file = new window.File([theBlob], imgname, { type: 'image/jpeg' })
  return file
}
