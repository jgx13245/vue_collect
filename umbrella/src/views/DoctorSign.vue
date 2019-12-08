<template>
  <div class="sign-wrap">
    <div class="sign-title">劳动协议签名</div>
    <div class="sign-negotiate" @click="handleSign">
     劳务协议点击签名
    </div>
    <div class="sigin-write">
      <div>
        <img :src="resultImg" alt="" class="img">
      </div>
      <div @click="handleSign">点击签名</div>
      <div @click="handleSubmit">确定提交</div>
    </div>
    <Popup :isVisible="show" @changeClose="changeClose">
      <div class="box" slot="content">
        <div class="m">
          <div class="signName">
            <span>签名处</span>
            <span @click="handleCloseSign">关闭</span>
          </div>
          <vue-esign ref="esign" :width="300" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
          <div class="btn">
            <button @click="handleReset">清空签名</button> 
            <button @click="handleGenerate">生成签名</button>
          </div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import Popup from '../components/Popup'
import { mapState } from 'vuex'
import { fetchDocInfoSave } from '../assets/js/api'

export default {
  data() {
    return {
      show:false,
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '#fff',
      resultImg: '',
      isCrop: false,
    };
  },
  computed:{
    ...mapState(["serviceId","gndc2","name","hospital","offices","accountName","bankname","accountNumber","bankPhone","tranches","doctorId"])
  },
  methods: {
    handleSign() {
      this.show = true
    },
    changeClose() {

    },
    // 关闭签名
    handleCloseSign() {
      this.show = false
    },
    handleReset () {
      this.$refs.esign.reset()
      this.resultImg = ''
    },
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res
        this.show = false
      }).catch(err => {
        alert(err) // 画布没有签字时会执行这里 'Not Signned'
      })
    },
    // 签名提交
    handleSubmit() {
      this.docInfo( this.resultImg, this.serviceId,this.accountName, this.bankname, this.accountNumber, this.bankPhone,  this.doctorId, this.tranches)
    },

    async docInfo(signature, id, accountName, bankName, accountNumber, bankPhone, doctorId, tranches) {
      console.log(signature,'000000000000')
      if(this.resultImg === '') {
        this.$toast('请签名')
      }else{
        const res = await fetchDocInfoSave({ signature, id, accountName, bankName, accountNumber, bankPhone, doctorId, tranches })
        if(res.data.success === true) {
          this.$toast('签名提交成功')
          this.$router.push({path:'./doctorPerson'})
        }
      }
    }

  },
  components: {
    Popup
  },
  watch:{
    resultImg(newValue) {
      if(newValue) {

      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.sign-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sign-title{
  margin-top:400px;
  font-size:40px;
  font-weight: bold;
  color: #035732;
}
.sign-negotiate{
  width:90%;
  height:500px;
  padding: 10px;
  font-size: 30px;
  color:#A8A8A8;
  margin-top:40px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sigin-write{
  width:90%;
  height:120px;
  margin-top:40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  >div {
    width: 25%;
    margin-right: 10px;
    font-size: 30px;
    font-weight:bolder;
    color: #035732;
  }
  div:nth-child(1) {
    flex:1;
    .img{
      width: 100%;
      height: 120px;
      padding: 10px;
      display: block;
    }
  }
}
.m{
  width:100%;
  border:1px solid #035732;
  background: #fff;
}
.signName{
  font-size: 50px;
  padding: 10px;
  background: #fff;
  color:#035732;
  text-align: center;
  border-bottom:1px solid #ccc;
  position: relative;
  >span:nth-child(2){
    position:absolute;
    padding: 5px;
    right: 3px;
    top: 3px;
    opacity: 0.4;
    border:1px solid #035732;
    font-size: 10px;
  }
}
.btn{
  background: #fff;
  border-top:1px solid #ccc;
  display: flex;
  justify-content: flex-end;
}
button{
  background: #035732;
  color:#fff;
}
</style>


