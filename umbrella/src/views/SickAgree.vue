<template>
  <div class="signSick-wrap">
    <div class="signSick-ts">高血压合并危险因素患者血压血脂综合管理项目（简称 UMBRELLA项目）</div>
    <div class="signSick-title">患者知情同意书</div>
    <div class="signSick-negotiate">
      为加强高血压/血脂异常患者的临床规范化管理的正确认知和自我管理，加大在临床实践中对高血压及高血脂的重视力度，中国心血管健康联盟、苏州工业园区心血管健康研究院诚邀您参加“高血压合并危险因素患者血压血脂综合管理项目”（简称 UMBRELLA项目）的问卷调研。您通过参与项目调研问卷及定期填写您的健康管理记录，可以让医生可更好的了解您的病情，并给予更规范的治疗管理，同时本项目还会定期提供给您与您病情相关的健康科普小知识。
    </div>
    
    <div class="signSick-negotiate" style="text-indent:0">
      您在本程序中所录入的个人信息及数据说明：
    </div>
     <div class="signSick-negotiate">
      <ul>
        <li>1.本项目需要您填写个人基本信息并希望您提供手机号码，仅用于后续健康管理；。</li>
        <li>2.本项目中所需填写的血压/血脂等临床数据，仅用于健康管理评估。。</li>
      </ul>
    </div>
    <div class="signSick-negotiate">
      本项目将坚持自愿参与的原则，如果您同意参与此项目，请点击“知情”，我们会对您的个人信息及检测结果保密。
    </div>
    <div class="sigin-write">
      <div @click="handleToNoAgree">不同意</div>
      <div @click="handleToAgree">同意,下一步</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchSickAgreeData } from '../assets/js/api'
import { fetchSickInfoSave } from '../assets/js/api'
export default {
  data() {
    return {
     infconst: '',
	 fileds:{
	   caseName: '',
	   sex: '',
	   birthYear: '',
	   height: null,
	   weight: null,
	   bmi: null,
	   phone1: '',
	   whetherFollowUp: '',
	 },
    }
  },
  mounted() {
	 // console.log();
  },
  computed: {
    ...mapState(["caseId","caseTranches","caseName"])
  },
  methods: {
    async handleToNoAgree() {
      this.infconst = '0'
      this.FetchNoAgree(this.caseId, this.caseTranches, this.infconst)
    },
    handleToAgree() {
      this.infconst = '1'
      this.FetchAgree(this.caseId, this.caseTranches, this.infconst, this.caseName)
    },
    //不同意
    async FetchNoAgree(doctorId, tranches, infconst) {
      // const res = await fetchSickAgreeData({ doctorId, tranches, infconst })
      // console.log(res)
	  console.log("不同意");
	  this.$router.go(-1);//返回上一层
    },
    //同意
    async FetchAgree(caseId, tranches, infconst, name) {
      const res = await fetchSickAgreeData({ caseId, tranches, infconst, name })
      if(res.data.success === true) {
        this.$toast('保存成功')
        this.$router.push({path:'./sickThanks'})
      }
	  
	  // const { caseName, sex, birthYear, phone1,height,weight}  = this.fileds
	  const openId = localStorage.getItem('sickOpenId')
	  const params = this.$route.params.fields
	  console.log(params)
	  this.getSickInfo( this.caseId, openId, params.caseName, params.sex, params.birthYear,params.weight, params.height, params.bmi, params.phone1, params.whetherFollowUp)
	  
    },
	async getSickInfo(id, openId, caseName, sex, birthYear,weight, height, bmi, phone1, whetherFollowUp){
	  const res = await fetchSickInfoSave({id, openId, caseName, sex, birthYear,weight, height, bmi, phone1, whetherFollowUp})
	  console.log("医生个人信息提交")
	  console.log(res)
	  // if(res.data.success === true) {
	  //   this.$router.push({name: 'sickAgree', params: { fields: this.fileds }})
	  // }
	},
  }
}
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.signSick-wrap {
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
.signSick-ts{
  margin-top:10px;
  font-size:40px;
  font-weight: bold;
  text-align: center;
  color: #035732;
}
.signSick-title{
  margin-top:40px;
  font-size:40px;
  font-weight: bold;
  color: #035732;
}
.signSick-negotiate{
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
  margin-top:40px;
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
.signSickName{
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


