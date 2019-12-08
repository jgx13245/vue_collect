import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Component',
      component: () => import('@/views/ComponentList.vue'),
      meta: { title: '登录页' }
    },
    {
      path: '/popup',
      name: 'TestPopup',
      component: () => import('@/views/TestPopup.vue'),
      meta: { title: '登录页' }
    },
    {
      path: '/toast',
      name: 'TestToast',
      component: () => import('@/views/TestToast.vue'),
      meta: { title: '弹框' }
    },
    {
      path:'/table',
      name:'TestTable',
      component: () => import('@/views/TestTable.vue'),
      mate: {title: '弹幕'}
    },
    {
      path: '/if',
      name: 'If',
      component: () => import('@/views/TestIf.vue'),
      meta: { title: 'if-else优化' }
    },
  ]
})




// 路由导航，判断路由是都在微信 或者 APP打开
// router.beforeEach(async (to, from, next) => {


// })

export default router
