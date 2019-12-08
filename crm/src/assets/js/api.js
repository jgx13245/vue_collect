import axios from 'axios'

axios.defaults.timeout = 50000
axios.defaults.baseURL = '/api/'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
)

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      const code = error.response.status
      console.log(code)
    }
    console.log(error)
    return Promise.resolve(Object.create(null)) // 以免数据解构错误
  },
)

// TODO 定义接口

// ------------------------------------------------------------------------------------------------------
// // 获取首页所有的超市信息
// export const fentcHomeMarketList = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/marketList', {
//     params: options,
//   })
// )

// 获取首页所有的超市信息
export const fentcHomeMarketList = options => (
  axios.post('homeSale/marketList', {}, {
    params: options,
  })
)

// 获取首页对应的超市销售信息
// export const fentcHomeSaleInfo = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/saleInfo', {
//     params: options,
//   })
// )

export const fentcHomeSaleInfo = options => (
  axios.post('homeSale/saleInfo', {}, {
    params: options,
  })
)


// 获取订单类型所有的数据
// export const fetchOrderTypeData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/orderType', {
//     params: options,
//   })
// )
export const fetchOrderTypeData = options => (
  axios.post('order/orderType', {}, {
    params: options,
  })
)

// 获取消费区间所有的数据
// export const fetchPayIntervalData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/payInterval', {
//     params: options,
//   })
// )

export const fetchPayIntervalData = options => (
  axios.post('pay/payInterval', {}, {
    params: options,
  })
)

// 获取下单时间饼状图数据
// export const fetchOrderTimeCakeData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/orderTimeCake', {
//     params: options,
//   })
// )
export const fetchOrderTimeCakeData = options => (
  axios.post('/order/orderTimeCake', {}, {
    params: options,
  })
)
// 获取下单时间一天曲线走势数据
// export const fetchOrderTimeTrendDayData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/orderTimeTrendDayData', {
//     params: options,
//   })
// )
export const fetchOrderTimeTrendDayData = options => (
  axios.post('order/orderTimeTrendDayData', {}, {
    params: options,
  })
)

// 获取下单时间一段时间曲线走势数据
// export const fetchOrderTimeTrendData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/orderTimeTrendData', {
//     params: options,
//   })
// )

export const fetchOrderTimeTrendData = options => (
  axios.post('order/orderTimeTrendData', {}, {
    params: options,
  })
)

// 获取商品饼状图数据
// export const fetchGoodsCakeData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/goodsCake', {
//     params: options,
//   })
// )
export const fetchGoodsCakeData = options => (
  axios.post('goods/goodsCake', {}, {
    params: options,
  })
)

// 获取商品柱状图数据
// export const fetchGoodsHistogramData = options => (
//   axios.get('https://www.easy-mock.com/mock/5d282d4bfd93d84bcd01f010/goodsHistogram', {
//     params: options,
//   })
// )

export const fetchGoodsHistogramData = options => (
  axios.post('goods/goodsHistogram', {}, {
    params: options,
  })
)

// 超市运行状态数据
export const fetchMarketHistogramData = options => (
  axios.post('market/marketTime', {}, {
    params: options,
  })
)

// 获取用户数据

export const fetchUserData = options => (
  axios.post('account/accountList', {}, {
    params: options,
  })
)

// 获取用户订单列表

export const fetchUserOrderData = options => (
  axios.post('account/orderList', {}, {
    params: options,
  })
)


// 获取用户商品列表

export const fetchUserGoodsData = options => (
  axios.post('account/orderGoodsList', {}, {
    params: options,
  })
)

// 获取用户登录时间列表

export const fetchUserTimesData = options => (
  axios.post('account/loginTimeList', {}, {
    params: options,
  })
)
