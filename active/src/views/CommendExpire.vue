<template>
  <div class="commend-expire">
    <section class="content">
      <h4 class="title">您来晚了</h4>
      <p class="tip">推荐码已经过期</p>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.commend-expire {
  position: relative;
  min-height: 100vh;
  background: #f64841 url(../assets/images/commend-expire.png) no-repeat center top;
  background-size: 100% auto;
  .content {
    padding-top: 600px;
    text-align: center;
    color: #FFF;
    line-height: 2;
    font-size: 50px;
  }
}
</style>

