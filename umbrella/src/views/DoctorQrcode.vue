<template>
  <div class="qrcode-wrap">
    <div class="qrcode-classify">{{tranchesWord}}</div>
    <div class="qrcode-info">
      <div class="qrcode-name">
        <div><span>医生姓名:</span><span>{{name}}</span></div>
        <div><span>所在医院:</span><span>{{hospital}}</span></div>
        <div><span>我的患者:</span><span>{{sickCount}}</span></div>
      </div>
      <div class="qrcode-qr">
        <img  v-image-preview :src="img" alt="" class="qr-picture">
      </div>
    </div>
    <div class="qrcode-detail">
      <div @click="handleToSick"></div>
      <div @click="handleToHealth"></div>
      <div @click="handleToPerson"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchDoctorFirst } from '../assets/js/api'
export default {
  data() {
    return {
      name:'',
      hospital:'',
      sickCount:'',
      tranchesWord:'',
      img: ''
    };
  },
  computed: {
    ...mapState(["tranches","doctorId"])
  },
  methods: {
    handleToSick() {
      this.$router.push({path:'./doctorSickManage'})
    },
    handleToHealth() {
      
      this.$router.push({path:'./doctorHealthClass'})
    },
    handleToPerson() {
      this.$router.push({path:'./doctorPerson'})
    },
    // 医生信息表接口
    async doctorFirst(doctorId, tranches) {
      console.log(doctorId, tranches)
      const res = await fetchDoctorFirst({ doctorId, tranches })
      if(res.data.success === true) {
        const { name, szyy, caseCount, qrCodeAddress} = res.data.obj
        this.name = name
        this.hospital = szyy
        this.sickCount = caseCount
        this.img = qrCodeAddress
      }
    }
  },
  mounted() {
    if( this.tranches == 1) {
      this.tranchesWord = "血压组"
    }
    if( this.tranches == 2) {
      this.tranchesWord = "血脂组"
    }
    const doctorId = this.doctorId
    const tranches = this.tranches
    this.doctorFirst(doctorId, tranches)
  }
}
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.qrcode-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.qrcode-classify{
  width: 90%;
  height:80px;
  font-weight:bold;
  background: #fff url("../assets/images/ren.png") no-repeat;
  background-size: 20% 100%;
  background-position: 40% 0;
  // border:1px solid #0f0;
  color:#035732;
  font-size: 60px;
}
.qrcode-info{
  width:90%;
  height:300px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .qrcode-name{
    flex:1;
    height: 300px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    >div{
      margin-top:25px;
      font-size: 30px;
      letter-spacing:3px;
      color: #2D2D2D;
    }
  }
  .qrcode-qr{
    width: 30%;
    height: 300px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .qr-picture{
      width: 100%;
    }
  }
}
.qrcode-detail{
  width:90%;
  height:200px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  >div{
    width: 30%;
    height:150px;
  }
  div:nth-child(1) {
    background: #fff url("../assets/images/sick.png") no-repeat;
    background-size: 100% 100%;
  }
  div:nth-child(2) {
    background: #fff url("../assets/images/health.png") no-repeat;
    background-size: 100% 100%; 
  }
  div:nth-child(3) {
    background: #fff url("../assets/images/person.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>


