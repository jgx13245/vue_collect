import Vue from 'vue'
import Router from 'vue-router'
import {  fetchDocOpenid, fetchOpenIdLogin, fetchOpenIdSickLogin } from './assets/js/api'
// import { isWX, encodeQuery } from './assets/js/util'
import store from './store'

Vue.use(Router)


const GetCode = () =>import('./views/w.vue')


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 医生模块
    {
      path: '/doctorLogin',
      name: 'doctorLogin',
      meta: {
        docTitle: '医生登录'
      },
      component: () => import('./views/DoctorLogin.vue')
    },
    {
      path: '/doctorRegister',
      name: 'doctorRegister',
      meta: {
        docTitle: '医生注册'
      },
      component: () => import('./views/DoctorRegister.vue')
    },
    {
      path: '/doctorClassify',
      name: 'doctorClassify',
      meta: {
        docTitle: '医生分组'
      },
      component: () => import('./views/DoctorClassify.vue')
    },
    {
      path: '/doctorSign',
      name: 'doctorSign',
      meta: {
        docTitle: '医生签名'
      },
      component: () => import('./views/DoctorSign.vue')
    },
    {
      path: '/doctorQr',
      name: 'doctorQr',
      meta: {
        docTitle: '医生二维码'
      },
      component: () => import('./views/DoctorQrcode.vue')
    },
    {
      path: '/doctorSickManage',
      name: 'doctorSickManage',
      meta: {
        docTitle: '医生-患者管理'
      },
      component: () => import('./views/DoctorSickManage.vue')
    },
    {
      path: '/doctorSickEva',
      name: 'doctorSickEva',
      meta: {
        docTitle: '医生-患者患者评估'
      },
      component: () => import('./views/DoctorSickEva.vue')
    },
    {
      path: '/doctorHealthClass',
      name: 'doctorHealthClass',
      meta: {
        docTitle: '医生-健教中心'
      },
      component: () => import('./views/DoctorHealthClass.vue')
    },
    {
      path: '/doctorPerson',
      name: 'doctorPerson',
      meta: {
        docTitle: '医生-个人中心'
      },
      component: () => import('./views/DoctorPerson.vue')
    },
    {
      path: '/doctorInvestigate',
      name: 'doctorInvestigate',
      meta: {
        docTitle: '医生-观念调查'
      },
      component: () => import('./views/DoctorInvestigate.vue')
    },
    {
      path: '/doctorInvesTwo',
      name: 'doctorInvesTwo',
      meta: {
        docTitle: '医生-观念调查2'
      },
      component: () => import('./views/DoctorInvesTwo.vue')
    },
    {
      path: '/evaResult',
      name: 'evaResult',
      meta: {
        docTitle: '医生-评估结果'
      },
      component: () => import('./views/EvaResult.vue')
    },
    {
      path: '/doctorAgree',
      name: 'doctorAgree',
      meta: {
        docTitle: '医生-知情同意书'
      },
      component: () => import('./views/DoctorAgree.vue')
    },
    // 患者模块
    {
      path: '/sickInfo',
      name: 'sickInfo',
      meta: {
        docTitle: '患者信息'
      },
      component: () => import('./views/SickInfo.vue')
    }, 
    {
      path: '/sickThanks',
      name: 'sickThanks',
      meta: {
        docTitle: '患者感谢你参加'
      },
      component: () => import('./views/SickThanks.vue')
    }, 
    {
      path: '/sickMyNews',
      name: 'sickMyNews',
      meta: {
        docTitle: '患者-我的消息'
      },
      component: () => import('./views/SickMyNews.vue')
    },
    {
      path: '/sickQuestion',
      name: 'sickQuestion',
      meta: {
        docTitle: '患者-问卷调查'
      },
      component: () => import('./views/SickQuestion.vue')
    },
    {
      path: '/sickAgree',
      name: 'sickAgree',
      meta: {
        docTitle: '患者-知情同意书'
      },
      component: () => import('./views/SickAgree.vue')
    },
    {
      path: '/sickHealth',
      name: 'sickHealth',
      meta: {
        docTitle: '患者-健康'
      },
      component: () => import('./views/SickHealth.vue')
    },
    {
      path: '/doctorSickEvaDetail',
      name: 'doctorSickEvaDetail',
      meta: {
        docTitle: '患者-评估详情'
      },
      component: () => import('./views/DoctorSickEvaDetail.vue')
    },
    {
      path: '/sickSuiFang',
      name: 'sickSuiFang',
      meta: {
        docTitle: '患者-随访问卷'
      },
      component: () => import('./views/SickSuiFang.vue')
    },
    {
      path: '/sickEvaResult',
      name: 'sickEvaResult',
      meta: {
        docTitle: '患者-评估结果'
      },
      component: () => import('./views/SickEvaResult.vue')
    },
    // 代表模块
    {
      path: '/representInfo',
      name: 'representInfo',
      meta: {
        docTitle: '代表信息'
      },
      component: () => import('./views/RepresentInfo.vue')
    },
    {
      path: '/representGetUrl',
      name: 'representGetUrl',
      meta: {
        docTitle: '代表-获取视频连接'
      },
      component: () => import('./views/RepresentGetUrl.vue')
    },
    {
      path: '/representSubDocName',
      name: 'representSubDocName',
      meta: {
        docTitle: '代表-提交医生名单'
      },
      component: () => import('./views/RepresentSubmitDoctorName.vue')
    },
    {
      path: '/representChoose',
      name: 'representChoose',
      meta: {
        docTitle: '代表-选择组别医院'
      },
      component: () => import('./views/RepresentChoose.vue')
    },
    {
      path: '/representVideo',
      name: 'representVideo',
      meta: {
        docTitle: '代表-录制方法'
      },
      component: () => import('./views/RepresentVideo.vue')
    },
    {
      path: '/getCode',
      name: 'getCode',
      meta: {
        docTitle: '代表-获取视频连接'
      },
      component: GetCode
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const { code } = to.query
  // const code  = 111
  console.log(to.path)
  if (to.path == '/sickInfo' || to.path == '/sickMyNews' || to.path == '/sickQuestion' || to.path == '/sickAgree' || to.path == '/sickEvaResult') {
    const openId = localStorage.getItem('sickOpenId')
    // const openId = "oYQyT0mmEgzcUA0fSVhcKXe_kH14"
    if(openId) {
      const res = await fetchOpenIdSickLogin({ openId })
      if(res.data.success === true) {
        console.log(res,'患者端opedId获得接口数据')
        const { id, token, tranches, name, } = res.data.obj
        // 存储患者id
        store.commit('updateCaseId', { caseId: id })
        localStorage.setItem('caseId',id)
        // 存储患者分组
        store.commit('updateCaseTranches', { caseTranches: tranches })
        // 存储患者name
        store.commit('updateCaseName', { caseName: name })
        localStorage.setItem('caseToken',token)
        return next()
      }
    }
    if(code) {
      // 如果有code获取患者openid的信息
      const type = 2
      const info = await fetchDocOpenid({ code, type })
      const openId = info.data.obj
      console.log(openId,'这个表示患者openId获取到了')
      localStorage.setItem('sickOpenId',openId)
      const res = await fetchOpenIdSickLogin({ openId })
      console.log(res)
      if(res.data.success === true) {
        console.log(res,'患者的openid登录')
        const { id, token, tranches, name, } = res.data.obj
        // 存储患者id
        store.commit('updateCaseId', { caseId: id })
        localStorage.setItem('caseId',id)
        // 存储患者分组
        store.commit('updateCaseTranches', { caseTranches: tranches })
        // 存储患者name
        store.commit('updateCaseName', { caseName: name })
        localStorage.setItem('caseToken',token)
        return next()
      }
    }
    if(!code) {
       SickGetWXBaseInfo()
       return
    }
  }

  next()

  if (to.path == '/getCode') {  
    const market = sessionStorage.getItem('market')
    console.log(market)
    if(market == undefined) {
      // const openId = "ojeDuwj-t9-CXyJyVXs3xiWYUEvY"
	  const openId = localStorage.getItem('openId')
      sessionStorage.setItem('market',false)
      if(openId) {
        const res = await fetchOpenIdLogin({ openId })
        console.log(res)
        if(res.data.success === true) {
          const {doctorId, token, tranches, gndc, zqty} = res.data.obj
          // 存储医生id
          store.commit('updateDoctorId', { doctorId: doctorId })
          // 存储分组
          store.commit('updateTranches', { tranches: tranches })
          // 存储观念调查
          store.commit('updateGndc', { gndc: gndc })
          // 存储知情同意
          store.commit('updateZqty', { zqty: zqty })
          // 存储医生的token
          localStorage.setItem('docToken',token)
          if(gndc.length === 0 && zqty.length === 0){
            return next({ name: 'doctorLogin' })
          }else{
            return next({ name: 'doctorClassify' })
          }
        }else{
          return next({ name: 'doctorLogin' })
        }
      }
      if (code) {
        console.log(code,'医生的code')
        store.commit('updateCode', { code: code })
        // 如果有code获取openid的信息
        const type = 1
        const info = await fetchDocOpenid({ code, type })
        const openId = info.data.obj
        console.log(openId,'这个表示医生openId获取到了')
        localStorage.setItem('openId', openId)
        // 通过opednId判断是否登录，是否填写知情同意书
        const res = await fetchOpenIdLogin({ openId })
        if(res.data.success === true) {
          const {doctorId, token, tranches, gndc, zqty} = res.data.obj
          // 存储医生id
          store.commit('updateDoctorId', { doctorId: doctorId })
          // 存储分组
          store.commit('updateTranches', { tranches: tranches })
          // 存储观念调查
          store.commit('updateGndc', { gndc: gndc })
          // 存储知情同意
          store.commit('updateZqty', { zqty: zqty })
          // 存储医生的token
          localStorage.setItem('docToken',token)
          if(gndc.length === 0 && zqty.length === 0){
            return next({ name: 'doctorLogin' })
          }else{
            return next({ name: 'doctorClassify' })
          }
        }else{
          return next({ name: 'doctorLogin' })
        }
      }
      if (!code) {
        DoctorGetWXBaseInfo()
        return
      }
    }else{
      console.log('关掉')
    }
  } 
})



function DoctorGetWXBaseInfo () {
  // 获取医生端 code
  const redirectURL = encodeURIComponent(window.location.href)
  window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx48df7179395f96bc&redirect_uri=${redirectURL}&response_type=code&scope=snsapi_base#wechat_redirect`)
}

function SickGetWXBaseInfo () {
  // 获取 code
  // const redirectURL = encodeURIComponent(`https://m.24igo.com/page/wx/recirect?url=${window.location.origin}${path}?${query}`)
  const redirectURL = encodeURIComponent(window.location.href)
  window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx570ec39f0ce851bf&redirect_uri=${redirectURL}&response_type=code&scope=snsapi_base#wechat_redirect`)
}

export default router


