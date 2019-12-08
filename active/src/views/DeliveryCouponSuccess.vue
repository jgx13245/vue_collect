<template>
  <section class="delivery-coupon-success">
    <img src="../assets/images/delivery-coupon-success.png" width="200" alt="成功图片">
    <h3 class="delivery-coupon-success__title">支付成功</h3>
    <div class="delivery-coupon-success__message">
      <p>友好提示</p>
      <p>不要忘记填写赠品收货地址！</p>
    </div>
    <div class="delivery-coupon-success__btns">
      <a href="javascript:void(66);" role="button" @click="handleAction(0)">填写地址</a>
      <a href="javascript:void(66);" role="button" @click="handleAction(1)">稍后再填</a>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    handleAction(type) {
      if (type === 0) {
        this.$router.replace({
          path: '/delivery-info'
        })
      } else {
        this.$router.replace({
          path: '/coupon',
          query: {
            index: 2
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.delivery-coupon-success {
  min-height: 100vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-between;
  background: #FFF;
  padding: 120px 0;
}

.delivery-coupon-success__title {
  font-weight:500;
  color:rgba(254,116,24,1);
  line-height:24px;
  font-size: 60px;
}

.delivery-coupon-success__message {
  text-align: center;
  font-weight:500;
  color:rgba(255,108,8,1);
  line-height:72px;
  font-size: 36px;
}

.delivery-coupon-success__btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 28px;
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    width:240px;
    height:80px;
    border:1px solid rgba(255,107,6,1);
    border-radius:11px;
    color: rgba(254,116,24,1);
    line-height: normal;
  }
}
</style>
