<template>
  <div class="m">
    <div class="signName">签名处</div>
    <vue-esign ref="esign" :width="800" :height="500" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
    <div class="btn">
      <button @click="handleReset">清空签名</button> 
      <button @click="handleGenerate">生成签名</button>
    </div>
    <img :src="resultImg" alt="" class="img">
  </div>
</template>

<script>
export default {
  data () {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false
    }
  },
  methods: {
    handleReset () {
      this.$refs.esign.reset()
      this.resultImg = ''
    },
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        console.log(res)
        this.resultImg = res
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    }
  }
}
</script>


<style lang="scss">
.m{
  width:100%;
}
.signName{
  padding: 10px;
  text-align: center;
  border-bottom:1px solid #ccc;
}
.img{
  width:50%;
  height:200px;
  border:1px solid #0f0;
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  border:1px solid #f00;
}
.btn{
  border-top:1px solid #ccc;
  display: flex;
  justify-content: flex-end;
}
button{
  background: #f00;
  color:#fff;
}
</style>