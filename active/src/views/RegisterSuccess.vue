<template>
  <div class="wrap">
    <div class="inviteNow">注册成功! 点击下载App</div>
  </div>
</template>

<script>
import ShareMixins from '../assets/js/share.js'
export default {
  mixins: [ ShareMixins ],
  methods:{
    handleInvite() {
      // TODO 应用宝链接下载链接
    }
  }
};
</script>

<style lang="scss">
.wrap {
  width: 100%;
  min-height: 100vh;
  background: #ffd342 url("../assets/images/registeSuccess.png") no-repeat;
  background-size: 100% 100%;
  .inviteNow {
    width: 70%;
    height: 60px;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: #F4A323;
    border-radius: 30px;
    text-align: center;
    line-height: 60px;
    color:#fff;
    
  }
}
</style>

