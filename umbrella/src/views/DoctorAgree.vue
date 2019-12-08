<template>
  <div class="sign-wrap">
     <div class="sign-ts">高血压合并危险因素患者血压血脂综合管理项目（简称 UMBRELLA项目）</div>
    <div class="sign-title">医生知情同意书</div>
    <div class="sign-negotiate">
     为进一步提高临床医生对高血压合并危险因素的认知，加强血压、血脂等危险因素的筛查和管理，降低心血管死亡率，中国心血管健康联盟、苏州工业园区心血管健康研究院
  主办，施维雅（天津）制药有限公司支持的支持的”<span style="color:#035732">高血压合并危险因素患者血压血脂综合管理项目</span>”（简称 UMBRELLA项目） ,计划于2019年12月至2020年9月在全国范围内实施开展。
    </div>
     <div class="sign-negotiate">
      本项目根据2018年《中国高血压防治指南》进行高血压CVD患者风险评估，根据2016版《中国成人血脂异常防治指南》有关动脉粥样硬化性心血管疾病（ASCVD） 进行风险评估，<span style="color:#035732">您将通过本项目为高血压/血脂异常患者进行风险评估并结合线上的视频分享课程来更好的管理患者。</span>
    </div>
     <div class="sign-negotiate">
     本项目使用“爱优医”健康管理平台，以下声明请您仔细阅读，感谢您的支持！
    </div>
    <div class="sign-negotiate" style="text-indent:0">
      声明：
    </div>
     <div class="sign-negotiate">
     <ul>
       <li>1.基于您输入的数据，此程序将对相关指标进行自动分析并给出风险评估结果和建议。此结果仅供您参考。</li>
       <li>2.本项目所有方不参与任何医疗诊治，亦不承担任何与医疗诊治相关的责任。</li>
       <li><span style="color:#035732">3.本项目所获得的相关信息将仅用于项目本身。</span> </li>
       <li><span style="color:#035732">4.您所提供的个人银行信息，包括银行开户行、银行账号、身份证反正面照片、手机号码，仅用于劳务费支付使用，本项目主办方及支持方对以上信息具有知情权，便于与您核实劳务费收款情况。
</span></li>
       <li><span style="color:#035732">5.您自愿参与本项目，并确保所输入信息的真实、准确。</span></li>
     </ul>
    </div>
    <div class="sigin-write">
      <div @click="handleToNoAgree">不同意</div>
      <div @click="handleToAgree">同意,下一步</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchDocZqty } from '../assets/js/api'
export default {
  data() {
    return {
     infconst: '',
    }
  },
  computed: {
    ...mapState(["doctorId","tranches"])
  },
  methods: {
    async handleToNoAgree() {
      this.infconst = '0'
      this.FetchNoAgree(this.doctorId, this.tranches, this.infconst)
    },
    handleToAgree() {
      this.infconst = '1'
      this.FetchAgree(this.doctorId, this.tranches, this.infconst)
    },
    //不同意
    async FetchAgree(doctorId, tranches, infconst) {
      const res = await fetchDocZqty({ doctorId, tranches, infconst })
      if(res.data.success === true) {
        this.$router.push({path:'./doctorQr'})
      }
    },
    //同意
    async FetchAgree(doctorId, tranches, infconst) {
      console.log(doctorId, tranches, infconst)
      const res = await fetchDocZqty({ doctorId, tranches, infconst })
      console.log(res)
      if(res.data.success === true) {
        this.$router.push({path:'./doctorQr'})
      }
      if(res.data.msg == '本医生本组已经填写过知情同意书'){
        this.$router.push({path:'./doctorQr'})
      }
    }
  },
  mounted() {
    console.log(111, this.doctorId)
    console.log(222, this.tranches)
  }
}
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.sign-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/docAgree.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sign-ts{
  margin-top:10px;
  font-size:40px;
  font-weight: bold;
  text-align: center;
  color: #035732;
}
.sign-title{
  margin-top:20px;
  font-size:40px;
  font-weight: bold;
  color: #035732;
}
.sign-negotiate{
  width:90%;
  padding: 10px;
  font-size: 30px;
  overflow: auto;
  text-indent: 50px;
  color:#3E3A39;
  font-size: 26px;
  margin-top:10px;
  ul{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  li{
    margin-top:15px;
    display: flex;
    width: 90%;
    justify-content: flex-start;
    text-indent: 0
  }
}
.sigin-write{
  width:90%;
  height:120px;
  margin-top:30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >div {
    width: 30%;
    text-align: center;
    margin-right: 10px;
    font-size: 30px;
    font-weight:bolder;
    color: #035732;
  }
   >div:nth-child(1) {
    width: 20%;
    text-align: center;
    margin-right: 10px;
    font-size: 30px;
    font-weight:bolder;
    color: #595757;
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
</style>


