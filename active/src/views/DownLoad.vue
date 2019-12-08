<template>
  <div class="cash-back_wrap" @click="handleToDownLoad"></div>
</template>

<script>
export default {
  methods:{
    handleToDownLoad(){
      window.location.href="http://www.24igo.com/share.html"
    }
  },
}
</script>

<style>
.cash-back_wrap{
  width: 100vw;
  height: 100vh;
  background: url(../assets/images/transfer.png) no-repeat;
  background-size: 100% 100%;
}
</style>
