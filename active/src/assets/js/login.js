import { mapGetters } from 'vuex'
import { invokeNativeLogin, invokeNativeLoginAndroid } from './native'
import { isMobileAndroid,isApp } from './util.js'

export default {
  created(){
    if(isMobileAndroid()) {
      window.callJsCouponPayAfterAndroid = this.callJsCouponPayAfterAndroid
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  methods: {
    handleActionAfterJudgeLogin (cb, ...args) {
      if (!this.isLogin) {
        if(isApp()) {
          return invokeNativeLogin()
        }
        if(!isApp() && isMobileAndroid()){
          return invokeNativeLoginAndroid()
        }
      }
      cb && cb.apply(this, args)
    },
  }
}