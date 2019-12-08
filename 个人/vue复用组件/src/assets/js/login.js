import { mapGetters } from 'vuex'
import { invokeNativeLogin } from './native'
export default {
  computed: {
    ...mapGetters({
      isLogin: 'isLogin'
    })
  },
  methods: {
    handleActionAfterJudgeLogin (cb, ...args) {
      if (!this.isLogin) {
        return invokeNativeLogin()
      }
      cb && cb.apply(this, args)
    }
  }
}