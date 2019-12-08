import Vue from 'vue'
import Router from 'vue-router'
import { fetchWXBaseinfo, validRecommend } from './assets/js/api'
import { isWX, encodeQuery, isMobileAndroid, isApp } from './assets/js/util'
import { fetchAppBaseInfo,fetchBaseInfoAndroid } from './assets/js/native'
Vue.use(Router)

const Login = () => import('./views/Login.vue')
const Commend = () => import('./views/Commend.vue')
const FlashSale = () => import('./views/FlashSale.vue')
const RewardProgress = () => import('./views/RewardProgress.vue')
const Coupon = () => import('./views/Coupon.vue')
const CouponCopy = () => import('./views/CouponCopy.vue')
const Register = () => import('./views/Register.vue')
const RegisterSuccess = () => import('./views/RegisterSuccess.vue')
const CommendExpire = () => import('./views/CommendExpire.vue')
const Address = () => import('./views/Address.vue')
const CreateAddr = () => import('./views/CreateAddr.vue')
const DeliveryCouponSuccess = () => import('./views/DeliveryCouponSuccess.vue')
const DeliveryInfo = () => import('./views/DeliveryInfo.vue')
const Member = () => import('./views/Member.vue')
const NewPeople = () => import('./views/NewPeople.vue')
const CashBack = () => import('./views/CashBack.vue')
const UserService = () => import('./views/userService.vue')
const DownLoad = () => import('./views/DownLoad.vue')

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        docTitle: '登录'
      },
      component: Login
    },
    // 邀请类的路由
    {
      path: '/commend',
      meta: {
        docTitle: '推荐有奖'
      },
      component: Commend
    },
    {
      path: '/reward-progress',
      name: 'reward-progress',
      meta: {
        docTitle: '奖励进度'
      },
      component: RewardProgress
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        docTitle: '立即邀请',
        title: '分享标题',
        desc: '分享描述',
        imgUrl: 'https://web.24igo.com/commend-share.png'
      },
      component: Register
    },
    {
      path: '/registerSuccess',
      name: 'register-success',
      meta: {
        docTitle: '新人大礼包',
        title: '分享标题',
        desc: '分享描述',
        imgUrl: 'https://web.24igo.com/commend-share.png'
      },
      component: RegisterSuccess
    },
    {
      path: '/commend-expire',
      name: 'commend-expire',
      meta: {
        docTitle: '推荐码过期'
      },
      component: CommendExpire
    },
    {
      path: '/flash-sale',
      meta: {
        docTitle: '限时秒杀'
      },
      component: FlashSale
    },
    // 电子代金券的路由系列
    {
      path: '/coupon',
      name:'coupon',
      meta: {
        docTitle: '电子代金券'
      },
      component: Coupon
    },
    {
      path: '/couponcopy',
      name:'couponcopy',
      meta: {
        docTitle: '电子代金券页面'
      },
      component: CouponCopy
    },
    {
      path: '/member',
      name: 'member',
      meta: {
        docTitle: '成为会员'
      },
      component: Member
    },
    // 新增地址类的路由（暂时已经废弃）
    {
      path: '/delivery-coupon-success',
      name: 'delivery-coupon-success',
      meta: {
        docTitle: '支付成功'
      },
      component: DeliveryCouponSuccess
    },
    {
      path: '/delivery-info',
      name: 'delivery-info',
      meta: {
        docTitle: '填写配送信息'
      },
      component: DeliveryInfo
    },
    {
      path: '/address',
      name: 'address',
      meta: {
        docTitle: '选择地址'
      },
      component: Address
    },
    {
      path: '/create-addr',
      name: 'create-addr',
      meta: {
        docTitle: '新增地址'
      },
      component: CreateAddr
    },
    // app banner图静态页地址
    {
      path: '/newpeople',
      name: 'newpeople',
      meta: {
        docTitle: '新人首单'
      },
      component: NewPeople
    },
    {
      path: '/cashback',
      name: 'cashback',
      meta: {
        docTitle: '购物返现'
      },
      component: CashBack
    },
    // 用户协议路由
    {
      path: '/userService',
      name: 'userService',
      meta: {
        docTitle: '用户协议'
      },
      component: UserService
    },
    // 短信下载中专页面路由
    {
      path: '/D',
      name: 'downLoad',
      meta: {
        docTitle: '下载中转页面'
      },
      component: DownLoad
    },
    // 判断微信公众号里面是自提还是配送的路由页面
    {
      path: '/selectWay',
      name: 'selectWay',
      component(resolve) {
        require.ensure(['./views/DeliveryOrSelfWechat.vue'], () => {
          resolve(require('./views/DeliveryOrSelfWechat.vue'))
        })
      },
      meta: {
        docTitle: '微信公众号自提还是配送'
      },
    },
    // 优惠说明 静态图
    {
      path: '/privilege',
      name: 'privilege',
      meta: {
        docTitle: '优惠说明'
      },
      component: () => import('./views/Privilege.vue'),
    },
    // 爱购大卖场 静态图
    {
      path: '/loveBuy',
      name: 'loveBuy',
      meta: {
        docTitle: '爱购大卖场'
      },
      component: () => import('./views/LoveBuy.vue'),
    },
    // 电子签名
    {
      path: '/sign',
      name: 'sign',
      meta: {
        docTitle: '爱购大卖场'
      },
      component: () => import('./views/Sign.vue'),
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  // 零散的活动页面
  if (to.path == '/userService' || to.path == '/D' || to.path == '/selectWay' || to.path == '/sign') {
    return next()
  }
  // 检测是否是app。处理 app 内登录逻辑，不是app 就不走里面的数据逻辑。使得刘电脑浏览器能打开
  // if(isApp()) {
  //   const data = await fetchAppBaseInfo()
  //   router.app.$store.commit('updateBaseInfo', data)
  //   await next()
  // }

  // if(!isApp() && isMobileAndroid()) {
  //   const data = await fetchBaseInfoAndroid()
  //   router.app.$store.commit('updateBaseInfo', JSON.parse(data))
  //   await next()
  // }
  // 分享    
  if (!window.iOSShareURL) {
    window.iOSShareURL = window.location.href.split('#')[0]
  }
  const { token, code } = to.query
  const name = to.name
  const path = to.path
  let openId = localStorage.getItem('openId')
  if (isWX()) {
    if(to.path == '/newpeople' || to.path == '/cashback' || to.path == '/login'){
      return next()
    }
  }
  if (!isWX()) {
    changeDocumentTitle(to.meta.docTitle)
    return next()
  }
  if (openId) {
    changeDocumentTitle(to.meta.docTitle)
    await validateToken({ token, openId, next, name })
    return
  }
  if (!code) {
    getWXBaseInfo(path, encodeQuery({ token, wx: true }))
    return
  }
  if (code) {
    const info = await fetchWXBaseinfo({ code })
    openId = info.data.message
    localStorage.setItem('openId', openId)
    await validateToken({ token, openId, next, name })
  }
})

async function validateToken ({ token, openId, next, name }) {
  if (name === 'login' || !token || token === 'undefined') {
    return next()
  }
  const res = await validRecommend({ recommendToken: token, openId })
  const { code } = res.data
  if (code === 200) {
    // 新用户
    return next({ name: 'login', query: { token } })
  } else if (code === -1) {
    // 老用户
    return next({ name: 'register', query: {} })
  } else if (code === -2) {
    // 过期处理
    return next({ name: 'commend-expire', query: {} })
  }
}

function changeDocumentTitle (title) {
  // 更新页面标题
  document.title = title || '24爱购 -- 智能便利店'
}

function getWXBaseInfo (path, query) {
  // 获取 code
  const redirectURL = encodeURIComponent(`https://m.24igo.com/page/wx/recirect?url=${window.location.origin}${path}?${query}`)
  window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f801d4724b16b02&redirect_uri=${redirectURL}&response_type=code&scope=snsapi_base#wechat_redirect`)
}

export default router
