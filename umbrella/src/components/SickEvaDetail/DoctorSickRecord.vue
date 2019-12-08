<template>
    <div class="evaEnd-hyper">
      <div class="evaEnd-hyperTitle">7.评估结果</div>
      <img src="../../assets/images/cvdGao.png" alt="">
    </div>
</template>

<script>
export default {
  data() {
    return {
      // img:'../../assets/images/cvdGao.png'
    }
  },
  methods: {}
}
</script>

<style lang="scss">
/*高血压*/
.evaEnd-hyper{
  width:95%;
  height:400px;
  margin-top:40px;
  background: #C5E6DF;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .evaEnd-hyperTitle{
    height:50px;
    padding: 0 10px;
    border-radius: 10px;
    background: #22A559;
    color: #fff;
    text-align: center;
    line-height: 50px;
    position: absolute;
    z-index: 100;
    left:30px;
    top:-20px;
  }
  >img{
      width: 100%;
  }
}
</style>
