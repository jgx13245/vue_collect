<template>
  <div id="app">
    <button @click="back" class="btnBack">返回</button>
    <router-view />
  </div>
</template>

<script>
require('./assets/css/mint-reset.css')
export default { 
  methods:{
    back() {
      this.$router.push({path:'/'})
    }
  }
}

</script>

<style lang="scss">
.btnBack{
  width:80%;
  height:100px;
  background: #ff0;
  position: absolute;
  left:50%;
  bottom:10%;
  transform: translate3d(-50%,-20%,0)

}
</style>
