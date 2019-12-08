import { isMobileIOS, isMobileAndroid } from './util'
import { eventBus, APP_JS_BRIDGE_CONNECT } from './event-bus'


/**
 * --------------
 *  获取基本信息
 *  
 *  web --> app
 * --------------
 * @return 
 * 安卓 和 iOS 返回的不太一样 判断是否为字符串 再转换为对象
 * 
 * marketId 
 * marketLocation 
 * marketName 
 * 
 * （用户未定位情况下，超市信息不存在。）
 * userId 
 * userToken 
 */
export const FETCH_BASE_INFO = 'fetchBaseInfo' // 获取基本信息
/**
 * ---------------
 * 调用原生的登录
 * web --> app
 * ---------------
 */
export const NATIVE_LOGIN = 'nativeLogin'
/**
 * --------------
 * 登录之后更新信息
 * app --> web
 * --------------
 */
export const UPDATE_BASE_INFO_AFTER_LOGIN = 'updateUserInfo'
/**
 * 
 *  * 调用原生支付
 */
export const NATIVE_COUPON_PAY = 'nativeCouponPay'
/**
 * -----------
 * 调用原生支付
 * web --> app
 * -----------
 */
// export const NATIVE_PAY_ACTION = 'nativePayAction'
/**
 * -----------
 * token过期
 * web -- app
 * -----------
 */
// export const TOKEN_EXPIRE = 'nativeToken'
/**
 * ------------
 * 调用原生分享
 * web --> app
 * 
 * type WechatSession QQ WechatTimeLine
 * title
 * description
 * goodsImageLink 小程序图片
 * imageLink 
 * path 小程序的
 * url
 * ------------
 */
export const INVITE_ACTION = 'invite'
/**
 * -------------
 * 返回上层控制器
 * web --> app
 * -------------
 */
// export const NAVIGATION_BACK = 'navigationBack'
/**
 * -------------------
 * 生成导航栏右边的分享
 * web --> app
 * -------------------
 */
export const SHOW_NATIVE_SHARE_BUTTON = 'showNativeShareButton'

function setAndroidWebviewJSBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  document.addEventListener('WebViewJavascriptBridgeReady', () => {
    callback(window.WebViewJavascriptBridge)
  }, false)
}

// ---------------------------ios和h5交互的方法-----------------------------

function setIOSWebviewJSBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(() => {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

const JSBridgePlugins = Object.create(null)

JSBridgePlugins.install = (Vue) => {
  if (isMobileAndroid()) {
    setAndroidWebviewJSBridge(bridge => {
      Object.defineProperty(Vue.prototype, '$bridge', {
        value: bridge
      })
    })
    eventBus.$emit(APP_JS_BRIDGE_CONNECT)
    return
  }
  if (isMobileIOS()) {
    setIOSWebviewJSBridge(bridge => {
      Object.defineProperty(Vue.prototype, '$bridge', {
        value: bridge
      })
      eventBus.$emit(APP_JS_BRIDGE_CONNECT)
    })
    return
  }
}

export const setBridge = isMobileAndroid() ? setAndroidWebviewJSBridge : setIOSWebviewJSBridge
// export const setBridge = setIOSWebviewJSBridge

// 主动请求用户信息
export const fetchAppBaseInfo = () => {
  return new Promise((resolve) => {
    setBridge(bridge => {
      bridge.callHandler(FETCH_BASE_INFO, {}, (data) => {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        resolve(data)
      })
    })
  })
}

// 调用原生登录界面
export const invokeNativeLogin = () => {
  setBridge(bridge => {
    bridge.callHandler(NATIVE_LOGIN, {}, () => {})
  })
}

// 获取原生的加密信息
export const invokeNativeSign = () => {
  return new Promise((resolve) => {
    setBridge(bridge => {
      bridge.callHandler(FETCH_BASE_INFO, {}, (data) => {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        const { sign, timestamp, userId } = data
        resolve({sign, timestamp, userId})
      })
    })
  })
}

// 调用原生分享方法
export const invokeNativeShare = (options) => {
  return new Promise((resolve) => {
    setBridge(bridge => {
      bridge.callHandler(INVITE_ACTION, options, () => {
        // 原生反馈信息
        resolve()
      })
    })
  })
}

// 调用电子券原生支付方式
// type [wx, zfb, ye]
export const invokeNativeCouponPay = (options) => {
  return new Promise((resolve) => {
    setBridge(bridge => {
      bridge.callHandler(NATIVE_COUPON_PAY, options, (data) => {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        resolve(data)
      })
    })
  })
}

export const nativePlugin = JSBridgePlugins


// ---------------------------新安卓和h5交互的方法-----------------------------

/*global  $App:true*/
// 原生登录接口
export const invokeNativeLoginAndroid = () => {
  return $App.nativeLoginAndroid()
}

// 进入路由获取用户的id等信息
export const fetchBaseInfoAndroid = () => {
  return new Promise((resolve) => {
    const data = $App.fetchBaseInfoAndroid()
    resolve(data)
  }) 
}

// 获取原生的加密信息 (其实本质上就是获取用户信息)
export const invokeNativeSignAndroid = () => {
  return new Promise((resolve) => {
    const data = $App.fetchBaseInfoAndroid()
    const { sign, timestamp, userId } = JSON.parse(data)
    resolve({sign, timestamp, userId})
  })
}

// 调用电子券原生支付方式
// type [wx, zfb, ye]
export const invokeNativeCouponPayAndroid = (options) => {
  return new Promise((resolve) => {
    const data = $App.nativeCouponPayAndroid(options)
    resolve(data)
    console.log(data)
  })
}

