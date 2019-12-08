import axios from 'axios'
import Vue from 'vue'
const _instance = new Vue()

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api/'


axios.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
)

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const code = error.response.status
      switch (code) {
        case 500:
          break
        case 401:
          break
      }
    }
    _instance.$toast(error.message || error)
    return Promise.resolve(Object.create(null)) // 以免数据解构错误
  }
)

// TODO 定义接口

export const fetchRecommendSummaryAndDetail = (options) => {
  return axios.get('page/recommed/myRecommendReward', {
    params: options
  })
}

export const fetchRecommendTokenInApp = (options) => {
  return axios.get('page/recommed/getRecommendTokenById', {
    params: options
  })
}
/**
 * 获取微信 SDK 初始化参数
 * @param { String } url 重定向地址
 */
export const fetchWechatSDKConfig = (options) => {
  return axios.get('page/wx/jsInfo', {
    params: options
  })
}

// 图片短信验证码接口
export const getMessageValidate = (options) => {
  return axios.get('page/recommed/code', {
    params: options
  })
}
/**
 * 注册接口
 * @param { String } recommendToken
 * @param { Number } phone
 * @param { String } code
 * @param { String } openId
 * @param { String } captcha
 */
export const registerBind = (options) => {
  return axios.post('page/recommed/bind', {}, {
    params: options
  })
}

// 授权地址 https://m.24igo.com/page/wx/recirect
// code url state

/**
 * 获取微信基本信息
 * @param {String} options 参数 code
 */
export const fetchWXBaseinfo = (options) => {
  return axios.get('page/wx/userInfo', {
    params: options
  })
}

/**
 * 验证是否被推荐
 * @param { String } recommendToken
 * @param { String } openId
 */
export const validRecommend = (options) => {
  return axios.get('page/recommed/recommendTokenVerify', {
    params: options
  })
}

/**
 * 获取推荐令牌 根据 openId
 * @param { String } openId
 */
export const fetchRecommendTokenByOpenid = (options) => {
  return axios.get('page/recommed/getRecommendTokenByOpenId', {
    params: options
  })
}

export const createCouponOrder = (options) => {
  return axios.post('/app/assets/eleCouponRecharge', {}, {
    params: options
  })
}

/**
 * 全部电子券
 * @param { String } marketId
 */
export const allCoupon = (options) => {
  return axios.post('/app/assets/eleCouponModel', {}, {
    params: options
  })
}

/**
 *  我的电子券
 * @param { String } userId
 */
export const myCoupon = (options) => {
  return axios.get('/app/assets/myEleCouponModel', {
    params: options
  })
}


/**
 * 电子券充值
 * @param { String } couponId
 * @param { String } userId
 * @param { String } sign
 * @param { String } timestamp
 * @param { String } ip
 */
export const couponRecharge = (options) => {
  return axios.post('/app/assets/eleCouponRecharge', {}, {
    params: options
  })
}


/**
 * 电子券使用
 * @param { String } id
 * @param { String } userd
 * @param { String } sign
 * @param { String } timestamp
 */
export const couponUse = (options) => {
  return axios.post('/app/assets/eleCouponUse', {}, {
    params: options
  })
}
/**
 * 获取配送时间
 */
export const fetchDeliveryTime = () => {
  return axios.get('/app/assets/eleCouponDeliveryTime')
}

/**
 * 提交配送地址
 */
export const updateDeliveryInfo = (options) => {
  return axios.post('/app/assets/eleCouponDelivery', {}, {
    params: options
  })
}

/**
 * 地址列表
 * @param { String } marketId
 * @param { String } userId
 */
export const addressList = ({marketId, userId}) => {
  return axios.get(`/app/address/list/${marketId}`, {
    params: {
      userId
    }
  })
}

/**
 * 编辑地址
 * @param { String } userId
 * @param { String } addressId
 * @param { String } address
 * @param { String } doorNumber
 * @param { String } marketId
 * @param { String } marketName
 * @param { String } name
 * @param { String } sex
 * @param { String } phone
 * @param { String } isDefault
 */
export const editAddress = (options) => {
  return axios.put('/app/address/edit', options, {})
}

/**
 * 新增地址
 * @param { String } userId
 * @param { String } address
 * @param { String } doorNumber
 * @param { String } marketId
 * @param { String } marketName
 * @param { String } name
 * @param { String } sex
 * @param { String } phone
 * @param { String } isDefault
 */
export const createAddress = (options) => {
  return axios.post('/app/address/add', options, {})
}


/**
 * 会员购买
 * @param { String } userId
 * @param { String } marketId
 * @param { String } mon
 * @param { String } sign
 * @param { String } timestamp
 * @param { String } ip
 */
export const vipPayment = (options) => {
  return axios.post('/app/vip/vipPay', {}, {
    params: options
  })
}

/**
 * 微信公众号推送页面
 * @param { String } userId
 */
export const wxDeliveryOrSelf = ({orderId}) => {
  return axios.get(`/app/order/wxNewsOrderDetial/${orderId}`, {})
}