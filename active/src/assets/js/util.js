const pk = require('../../../package.json')
// TODO 工具函数
const DOCUMENT_NODE_TYPE = 9

/**
 * 识别设备类型
 */
const userAgent = window.navigator.userAgent.toLowerCase()

function isFindInUserAgent (name) {
  return userAgent.indexOf(name) !== -1
}



export const isMobileAndroid = () => isFindInUserAgent('android')

export const isMobileIOS = () => isFindInUserAgent('iphone')

export const isWX = () => isFindInUserAgent('micromessenger')

export const isApp = () => isFindInUserAgent('24igo')

// {
//   if( process.env.NODE_ENV === 'development' ) {
//     return false
//   }
//   if( process.env.NODE_ENV === 'production' ) {
//     return true
//   }
// }

/**
 * 处理 URL query
 */

export const encodeQuery = (obj) => {
  if (typeof obj !== 'object') {
    return ''
  }
  return Object.keys(obj).map(key => {
    const value = obj[key]
    const ks = encodeURIComponent(key) + '='
    if (Array.isArray(value)) {
      return value.map(val => {
        return ks + encodeURIComponent(val)
      }).join('&')
    } else {
      return ks + encodeURIComponent(value)
    }
  }).join('&')
}

/**
 * 校验手机号码
 */
export function checkMobile(tel, callback) {
  var boolStr;
  //var reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  var reg = /^1[3-9]\d{9}$/;
  boolStr = reg.test(tel);
  callback ? callback(boolStr) : '';
  return boolStr;
}

export const fixWXInput = e => {
  return e.target.scrollIntoView(true);
};

if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype
  proto.matches = proto.matchesSelector || proto.webkitMatchesSelector || proto.msMatchesSelector || proto.mozMatchesSelector
}
export function closest (el, selector) {
  while (el && el.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof el.matches === 'function' && el.matches(selector)) {
      return el
    }
    el = el.parentNode
  }
}

// 项目版本
export const version = pk.version

// 后端返回时间的处理
export function transformTimestampToString(timestamp) {
  const _timestamp = +String(timestamp).padEnd(13, '0')
  const time = new Date(_timestamp)

  const year = time.getFullYear()
  const month = String(time.getMonth() + 1).padStart(2, '0')
  const day = String(time.getDate()).padStart(2, '0')
  const hour = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getHours()).padStart(2, '0')
  const seconds = String(time.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}
