<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setBridge, UPDATE_BASE_INFO_AFTER_LOGIN } from './assets/js/native'
import { isApp } from './assets/js/util'
import { mapMutations } from 'vuex'
export default {
  created () {
    // 原生调取h5的函数。h5获取更新后的数据   ios设备
    if(isApp()){
      setBridge(bridge => {
        bridge.registerHandler(UPDATE_BASE_INFO_AFTER_LOGIN, (data) => {
          if (typeof data === 'string') {
            data = JSON.parse(data)
            console.log(data)
          }
          this.updateBaseInfo(data)
        })
      })
    }
    // android设备
      window.callJsUpdateBaseInfoAndroid = this.callJsUpdateBaseInfoAndroid
  },
  methods: {
    ...mapMutations({
      updateBaseInfo: 'updateBaseInfo'
    }),
    callJsUpdateBaseInfoAndroid(data) {
      this.updateBaseInfo(data)
    },
  }
}
require('./assets/css/mint-reset.css')
</script>

<style lang="scss">
</style>
