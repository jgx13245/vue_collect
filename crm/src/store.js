import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchPhone: '',
    pageNumber: '',
    MarketList: [],
    MarketId: '',
    selectMarket: false,
  },
  mutations: {
    updateSearchPhone(state, option) {
      const newState = state
      newState.searchPhone = option.phone
    },
    updatePageNumber(state, option) {
      const newState = state
      newState.pageNumber = option.page
    },
    // 修改是否可以选择超市
    updateSelectMarket(state, option) {
      const newState = state
      newState.selectMarket = option.status
    },
    updateMarketId(state, options) {
      const newState = state
      const LocalMarketId = localStorage.getItem('marketId')
      if (LocalMarketId === options) {
        newState.MarketId = localStorage.setItem('marketId', options)
      } else {
        newState.MarketId = options
        localStorage.setItem('marketId', options)
      }
    },
    updateMarketList(state, options) {
      const newState = state
      newState.MarketList = options
    },
  },
  actions: {

  },
})
