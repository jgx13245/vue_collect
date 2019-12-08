<template>
<!--医生的个人中心页面-->
  <div class="person-wrap">
    <div class="person-message">
      <ul>
        <li class="person_name">
          <span>姓名:</span>
          <input
            class="person_name-input"
            v-model="name"
            v-autoAdjust>
        </li>
        <li class="person_phone">
            <span>医院:</span>
            <input
              class="person_phoneNum"
              v-model="hospital"
              v-autoAdjust
            >
        </li>
        <li class="person_certificate">
            <span>科室:</span>
            <input
              type="text"
              class="person_certificate-input"
              v-model="offices"
              v-autoAdjust
            >
        </li>
         <li class="person-bankTitle">
           我的银行信息
        </li>
        <li class="person_name">
          <span>开户名:</span>
          <input
            type="text"
            
            class="person_name-input"
            v-model="accountName"
            v-autoAdjust>
        </li>
        <li class="person_phone">
            <span>开户银行:</span>
            <input
              type="text"
              
              class="person_phoneNum"
              v-model="bankName"
              v-autoAdjust
            >
        </li>
        <li class="person_certificate">
            <span>开户账号:</span>
            <input
              type="text"
              
              class="person_certificate-input"
              v-model="accountNumber"
              v-autoAdjust
            >
        </li>
        <li class="person_certificate">
            <span>身份证号:</span>
            <input
              type="text"
              class="person_certificate-input"
              v-model="personalId"
              v-autoAdjust
            >
        </li>
        <li class="negotiate">
          <span>[温馨提示]满足一下三个条件，自动生成协议</span>
          <span>1.招募10位高血压患者</span>
          <span>2.为患者完成风险评估</span>
          <span>3.录制健康教育视频课程</span>
          <span>注：如招募30位患者并完成风险评估，录制三个视频，则可生成劳动协议</span>
          <span class="subDorInfo" @click="handleSubDorInfo">提交</span>
        </li>
        <li class="btn">
          <div  class="bttn" v-for="item in list">
            <mt-button style="background: #035732; color:#fff; font-size: 10px;" @click="handleQuan(item.id,item.ubaDoctorConceptIfsignEntity,item.signature)" v-if="item.ubaDoctorConceptIfsignEntity === null && item.signature === null" type="default" :disabled="false" size="small" >生成的服务协议（未签署）</mt-button>
            <mt-button style="background: #035732; color:#fff; font-size: 10px;" @click="handleSign(item.id, item.ubaDoctorConceptIfsignEntity,item.signature)" v-if="item.ubaDoctorConceptIfsignEntity !== null && item.signature === null" type="default" :disabled="false" size="small" >生成的服务协议（未签署）</mt-button>
            <mt-button style="background: #035732; color:#fff; font-size: 10px;" @click="handleGuan(item.id, item.ubaDoctorConceptIfsignEntity,item.signature)" v-if="item.ubaDoctorConceptIfsignEntity === null && item.signature !== null" type="default" :disabled="false" size="small" >生成的服务协议（未签署）</mt-button>
            <mt-button style="background: #035732; color:#fff; font-size: 10px;" v-if="item.ubaDoctorConceptIfsignEntity !== null && item.signature !== null" type="default" :disabled="true" size="small" >生成的服务协议（已签署）</mt-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { encodeQuery,checkMobile,fixWXInput } from "../assets/js/util.js"
import { fetchDoctorAccount, fetchDoctorPersonInfo } from "../assets/js/api.js"
import { mapState, mapMutations } from 'vuex'
export default {
  directives: {
    autoAdjust: {
      bind(el) {
        el.addEventListener("blur", fixWXInput, false);
      },
      unbind(el) {
        el.removeEventListener("blur", fixWXInput, false);
      }
    }
  },
  data() {
    return {
      name: "",
      hospital: "",
      offices: "", //科室
      accountName: "", // 开户名
      bankName: "" ,//开户行
      accountNumber:"" ,// 开户账号
      personalId:"", // 身份证号
      doctorMobile:"",// 手机号
      images: "",
      list:[{gndc:['1']},{gndc:['1']},{gndc:['1']},]
    };
  },
  watch:{

  },
  computed:{
    ...mapState(["doctorId", "tranches"])
  },
  methods: {
    // 提交医生个人信息
    handleSubDorInfo() {
      this.pushDoctorInfo(this.tranches, this.name, this.accountName, this.bankName, this.accountNumber, this.doctorMobile, this.doctorId)
    },
    async pushDoctorInfo(tranches, name, accountName, bankName, accountNumber, doctorMobile, doctorId) {
      console.log(tranches, name, accountName, bankName, accountNumber, doctorMobile, doctorId)
      const res = await fetchDoctorPersonInfo({ tranches, name, accountName, bankName, accountNumber, doctorMobile, doctorId })
      console.log(res)
      if(res.data.success === true) {
        this.$toast('提交成功')
      }
    },
    // 提交医生个人信息
    async fetchDocAccount(doctorId, tranches) {
      const res = await fetchDoctorAccount({ doctorId, tranches })
      console.log(res)
      if(res.data.success === true) {
        const { doctorAccountInfo, doctorInfo, serviceAgreementList }  = res.data.obj
        this.name = doctorInfo.name
        this.hospital = doctorInfo.szyy
        this.offices = doctorInfo.off
        this.accountName = doctorAccountInfo.accountName
        this.bankName = doctorAccountInfo.bankName
        this.accountNumber = doctorAccountInfo.accountNumber
        this.personalId = doctorInfo.personalId
        this.doctorMobile = doctorInfo.doctorMobile
        this.list = serviceAgreementList
      }
    },
    ...mapMutations({
      updateServiceId:"updateServiceId",
      updateGndc2:"updateGndc2",
      updateSign:"updateSign",
      updateDoc:"updateDoc",
    }),
    // 观念调查没有填写
    handleGuan(id,gndc2, sign) {
      this.updateServiceId({id})
      this.updateGndc2({gndc2})
      this.updateSign({sign})
      const name = this.name
      const hospital = this.hospital
      const offices = this.offices //科室
      const accountName = this.accountName // 开户名
      const bankName = this.bankName//开户行
      const accountNumber = this.accountNumber// 开户账号
      const personalId = this.personalId
      const doctorMobile = this.doctorMobile
      this.updateDoc({name, hospital, offices, accountName, bankName, accountNumber, personalId, doctorMobile})
      this.$router.push({path:'./doctorInvesTwo'})
    },
    // 签署没有填写
    handleSign(id,gndc2, sign) {
      this.updateServiceId({id})
      this.updateGndc2({gndc2})
      this.updateSign({sign})
      const name = this.name
      const hospital = this.hospital
      const offices = this.offices //科室
      const accountName = this.accountName // 开户名
      const bankName = this.bankName//开户行
      const accountNumber = this.accountNumber// 开户账号
      const personalId = this.personalId 
      const doctorMobile = this.doctorMobile
      this.updateDoc({name, hospital, offices, accountName, bankName, accountNumber, personalId, doctorMobile})
      this.$router.push({path:'./doctorSign'})
    },
    // 都没有签署
    handleQuan(id,gndc2, sign) {
      this.updateServiceId({id})
      this.updateGndc2({gndc2})
      this.updateSign({sign})
      const name = this.name
      const hospital = this.hospital
      const offices = this.offices //科室
      const accountName = this.accountName // 开户名
      const bankName = this.bankName//开户行
      const accountNumber = this.accountNumber// 开户账号
      const personalId = this.personalId 
      const doctorMobile = this.doctorMobile
      this.updateDoc({name, hospital, offices, accountName, bankName, accountNumber, personalId, doctorMobile})
      this.$router.push({path:'./doctorInvesTwo'})
    }
  },
  mounted() {
    this.fetchDocAccount(this.doctorId, this.tranches)
  }
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.person-wrap {
  width: 100%;
  min-height: 100vh;
  padding-top:200px;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .person-message {
    width: 98%;
    height: 750px;
    margin-top:300px;
    border-radius: 20px;
    margin-bottom: 10%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      li {
        width: 90%;
        height: 90px;
        padding-right: 20px;
        margin-top:10px;
        border: 1px solid #035732;
        border-radius: 10px;
      }
      // 姓名
      .person_name {
        // height: 60px;
        display: flex;
        background: #C5E6DF;
        justify-content: center;
        border-radius: 10px;
        align-items: center;
        >span{
          width: 30%;
          font-size:26px;
          color:#035732;
          text-align:center;
        }
        .person_name-input {
          background: #C5E6DF;
          display: block;
          flex:1;
          height: 50px;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
      }
       // 手机号
       .person_phone {
        // height: 60px;
        display: flex;
        background: #C5E6DF;
        justify-content: center;
        border-radius: 10px;
        align-items: center;
        >span{
          width: 30%;
          font-size:26px;
          color:#035732;
          text-align:center;
        }
        .person_phoneNum {
          background: #C5E6DF;
          display: block;
          flex:1;
          height: 50px;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
      }
      // 证书编号
       .person_certificate {
        // height: 60px;
        display: flex;
        background: #C5E6DF;
        justify-content: center;
        border-radius: 10px;
        align-items: center;
        >span{
          width: 30%;
          font-size:26px;
          color:#035732;
          text-align:center;
        }
        .person_certificate-input {
          background: #C5E6DF;
          display: block;
          flex:1;
          height: 50px;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
       }
       .person-bankTitle{
        // height: 60px;
        color:#035732;
        font-weight: bold;
        border:none;
        display: flex;
        justify-content: center;
        align-items: center;
       }
      // 协议
      .negotiate{
        height: 220px;
        border:none;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        color:#035732;
        font-size: 20px;
        position: relative;
        .subDorInfo{
          width:100px;
          height:50px;
          background: #035732;
          border-radius: 10px;
          color:#fff;
          text-align: center;
          line-height:50px;
          position: absolute;
          right: 0;
          top:20%;
        }
      }
      .btn{
        width: 100%;
        height:150px;
        display: flex;
        // flex-direction: column;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        padding-right: 0px !important;
        border:none;
        .bttn{
          width:50%;
          margin-bottom:10px;
          display: flex;
          justify-content: center;

        }
      }
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #b6b3b3;
    font-size: 30px;
  }
}
</style>


