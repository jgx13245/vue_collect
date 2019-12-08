import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Home from './views/Index/Home.vue'
import IndexPage from './views/Index/IndexPage.vue'
import PayInterval from './views/Index/PayInterval.vue'
import OrderType from './views/Index/OrderType.vue'
import OrderTime from './views/Index/OrderTime.vue'
import Goods from './views/Index/Goods.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          component: IndexPage,
        },
        {
          path: '/home',
          component: Home,
        },
        {
          path: '/orderType',
          component: OrderType,
        },
        {
          path: '/payInterval',
          component: PayInterval,
        },
        {
          path: '/orderTime',
          component: OrderTime,
        },
        {
          path: '/goods',
          component: Goods,
        },
        {
          path: '/market',
          name: 'Market',
          component: () => import('./views/Index/Market.vue'),
          mate: { title: '超市状态', keepAlive: false },
        },
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: () => import('./views/Index/UserInfo.vue'),
          mate: {
            title: '用户信息',
            keepAlive: true,
          },
        },
        {
          path: '/userOrder',
          name: 'userOrder',
          component: () => import('./views/Index/UserOrder.vue'),
          mate: { title: '用户订单', keepAlive: false },
        },
        {
          path: '/userGoods',
          name: 'userGoods',
          component: () => import('./views/Index/UserGoods.vue'),
          mate: { title: '用户商品', keepAlive: false },
        },
        {
          path: '/userTime',
          name: 'userTime',
          component: () => import('./views/Index/UserTime.vue'),
          mate: { title: '用户登录时间', keepAlive: false },
        },
      ],
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  if (to.path === '/userOrder' || to.path === '/userGoods' || to.path === '/userTime') {
    store.commit('updateSelectMarket', { status: true })
    return next()
  }
  if (to.path !== '/userOrder' || to.path !== '/userGoods' || to.path !== '/userTime') {
    store.commit('updateSelectMarket', { status: false })
    return next()
  }
})

export default router
