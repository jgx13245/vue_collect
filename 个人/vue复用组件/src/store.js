import Vue from 'vue'
import Vuex from 'vuex'

const state = {
  marketId: process.env.NODE_ENV === 'development' ? 300 : null,
  marketLocation: null,
  marketName: null,
  sign: null,
  timestamp: null,
  userId:  null,
  isLogin: false,
  couponId: null, // 当前支付成功的优惠券
  currentAddress: {
    name: null,
    phone: null,
    doorNumber: null,
    addressId: null,
    address: null,
    marketName: null,
    sex: null,
    isDefault: null,
    userId: null,
    marketId: null,
  },
  currentDeliveryTime: []
}

const mutations = {
  updateBaseInfo (state, options) {
    const { marketId, marketLocation, marketName, sign, timestamp, userId } = options
    if (userId) {
      state.isLogin = true
    }
    state.marketId = marketId
    state.marketLocation = marketLocation
    state.marketName = marketName
    state.sign = sign
    state.timestamp = timestamp
    state.userId = userId
  },
  updateCouponId (state, options) {
    state.couponId = options.couponId
  },
  currentCurrentAddress (state, options) {
    const {name, phone, doorNumber, addressId, address, marketName, sex, isDefault, userId, marketId} = options
    state.currentAddress.name = name
    state.currentAddress.phone = phone
    state.currentAddress.doorNumber = doorNumber
    state.currentAddress.addressId = addressId
    state.currentAddress.address = address
    state.currentAddress.marketName = marketName
    state.currentAddress.sex = sex
    state.currentAddress.isDefault = isDefault
    state.currentAddress.userId = userId
    state.currentAddress.marketId = marketId
  },
  updateCurrentDeliveryTime (sttate, options) {
    state.currentDeliveryTime = options
  },
  resetDeliveryInfo (state) {
    state.couponId = null
    state.currentDeliveryTime = []
    state.currentAddress.name = null
    state.currentAddress.phone = null
    state.currentAddress.doorNumber = null
    state.currentAddress.addressId = null
    state.currentAddress.address = null
    state.currentAddress.marketName = null
    state.currentAddress.sex = null
    state.currentAddress.isDefault = null
    state.currentAddress.userId = null
    state.currentAddress.marketId = null
  }
}

const getters = {
  getUserId: state => {
    return state.userId
  },
  isLogin: state => {
    return state.isLogin
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters
})
