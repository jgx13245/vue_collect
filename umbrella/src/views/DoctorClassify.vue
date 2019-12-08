<template>
  <div class="calssify-wrap">
    <div class="calssify-content">
      <div v-if="tranches == '1'">
        <div class="calssify-bloodPre" @click="handleToBloodPre"></div>
      </div>
      <div v-if="tranches == '2'">
        <div class="calssify-bloodFat" @click="handleToBloodFat"></div>
      </div>
      <div v-if="tranches == '1,2'">
        <div class="calssify-bloodPre" @click="handleToBloodPre"></div>
        <div class="calssify-bloodFat" @click="handleToBloodFat"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { fetchOpenIdLogin } from '../assets/js/api'
export default {
  data() {
    return {
      tranches: '',
    };
  },
  computed:{
    ...mapState(["gndc", "zqty"])
  },
  methods: {
    ...mapMutations({
      updateTranches:"updateTranches"
    }),
    handleToBloodPre() {
      this.updateTranches({tranches:'1'})
      console.log(this.gndc.length === 0, this.zqty.length === 0)
      if(this.gndc.length === 0 && this.zqty.length === 0) {
        this.$router.push({path:'./doctorInvestigate'})
      }else if(this.gndc.length === 0 && this.zqty.length !== 0) {
        this.$router.push({path:'./doctorInvestigate'})
      }else if(this.gndc.length !== 0 && this.zqty.length === 0) {
        this.$router.push({path:'./doctorAgree'})
      }else{
        this.$router.push({path:'./doctorQr'})
      }
     
    },
    handleToBloodFat() {
      this.updateTranches({tranches:'2'})
      if(this.gndc.length === 0 && this.zqty.length === 0) {
        this.$router.push({path:'./doctorInvestigate'})
      }
      // 观念调查书没有填写
      if(this.gndc.length === 0 && this.zqty.length !== 0) {
        this.$router.push({path:'./doctorInvestigate'})
      }
      // 知情同意书，没有填写
      if(this.gndc.length !== 0 && this.zqty.length === 0) {
        this.$router.push({path:'./doctorAgree'})
      }else{
        this.$router.push({path:'./doctorQr'})
      }
    },
    async showClass(openId) {
      const res = await fetchOpenIdLogin({ openId })
      console.log(res)
      if(res.data.success === true) {
        const {doctorId, token, tranches, gndc, zqty} = res.data.obj
        this.tranches = tranches
       }  
    }
  },
  created() {
    console.log(this.tranches)
    const openId = localStorage.getItem('openId')
    // const openId = "ojeDuwj-t9-CXyJyVXs3xiWYUEvY"
    this.showClass(openId)
  }
}
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.calssify-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calssify-content{
  width:90%;
  height:400px;
  margin-top:200px; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  >div{
    width:100%;
    height:240px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    >div{
      width:40%;
      height:240px;
      padding: 10px;
    }
    .calssify-bloodPre{
      background: #fff url("../assets/images/bloodPre.png") no-repeat center;
      background-size: 95% 95%;
    }
    .calssify-bloodFat{
      background: #fff url("../assets/images/bloodFat.png") no-repeat center;
      background-size: 95% 95%;
    }
  }
  
}
</style>


