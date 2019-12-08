<template>
  <div class="eva-wrap">
    <div class="eva-title">风险评估内容</div>
    <div class="eva-list">
      <ul class="eva-gun">
        <li class="eva-item">
          <Hyper :hyper-params="hyperParams" />
        </li>
        <li class="eva-item">
          <BloodFat :fat-params="fatParams" />
        </li>
        <li class="eva-item">
          <DoctorSickDia :dia-params="diaParams"/>
        </li>
        <li class="eva-item">
          <DoctorSickHeartBlood :blood-params="bloodParams" />
        </li>
        <li class="eva-item">
          <DoctorSickTarget :target-params="targetParams" />
        </li>
        <li class="eva-item">
          <DoctorSickCom :com-params="comParams" />
        </li>
        <li class="eva-item">
          <DoctorSickNow :now-params="nowParams" />
        </li>
         <li class="eva-item">
           <DoctorEvaResult  :res-params="resParams" v-if="Object.keys(resParams).length > 0" />
        </li> 
        <li class="eva-item">
          <DoctorSickHealthRecord :record-params="RecordParams" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Hyper from '../components/DoctorSickEvaDetail/DoctorSickEvaHyper'
import BloodFat from '../components/DoctorSickEvaDetail/DoctorSickEvaBloodFat'
import DoctorSickDia from '../components/DoctorSickEvaDetail/DoctorSickDia'
import DoctorSickHeartBlood from '../components/DoctorSickEvaDetail/DoctorSickHeartBlood'
import DoctorSickTarget from '../components/DoctorSickEvaDetail/DoctorSickTarget'
import DoctorSickCom from '../components/DoctorSickEvaDetail/DoctorSickCom'
import DoctorSickNow from '../components/DoctorSickEvaDetail/DoctorSickNow'
import DoctorSickHealthRecord from '../components/DoctorSickEvaDetail/DoctorSickHealthRecord'
import DoctorEvaResult from '../components/DoctorSickEvaDetail/DoctorEvaResult'
import DoctorRecord from '../components/DoctorSickEvaDetail/DoctorRecord'
import { mapState } from 'vuex'
import { fetchDocEvaResult } from '../assets/js/api'
export default {
  data() {
    return {
      // 高血压患者情况
      hyperParams: {
        doh: '', //高血压诊断情况
        dohNum: 0, // 此前确诊高血压患者的病程
        sbpLately:60, // 最近一次收缩压
        dbpLately: 40, //最近一次舒张压
        hrLately: 30, //最近一次心率（次/分）
      },
      // 血脂异常诊断情况
      fatParams: {
        dod: '', // 血脂异常诊断情况*
        dodLatelyTcMm: 0, //最近一次血脂：TC（mmol/L）*
        dodLatelyTgMm: 0, // 最近一次血脂：TG（mmol/L）*
        dodLatelyLdlCMm: 0, //最近一次血脂：LDL-C（mmol/L）*
        dodLatelyHdlCMm: 0, //最近一次血脂：HDL-C（mmol/L）*
      },
      // 糖尿病诊断情况
      diaParams: {
        diodi: '',  //糖尿病诊断情况
        diodiYes: '', // 并发症
      },
      // 心血管危险因素*
      bloodParams:{
        crfs: '', //心血管危险因素
        crfsIf: [], //如有，请勾选合并危险因素数组
      },
      // 靶器官损害*
      targetParams: { 
        tod: '', //是否有靶器官损害
        todIf: [], // 靶器官损害合并项
      },
      // 合并症
      comParams: {
        cvsHis:'', // 脑血管病史
        cvsHisIf: [],	 ///如有脑血管病史，请勾选*
        hdh:'',	// 心脏病史
        hghIf:[], // 如有心脏病史，请勾选*
        ckd:'', //	肾脏病史*
        ckdIf:[],	// 如有肾脏病史，请勾选*
        ckdStage:'', //CKD分期*
        pvh:'',	// 外周血管病史*
        retinopathy:'',	// 视网膜病变(出血或渗出，或视网膜水肿)*
        ccac:'', // 临床并发症与合并症*
      },
       // 目前治疗方案
      nowParams: {
        antiHnt	: [],	 ///降压治疗方案*
        lla:[], // 他汀调脂治疗方案*
      },
      resParams:{

      },
      // 健康记录数据
      RecordParams:{
        data:[]
      }
    }
  },
  components:{
    Hyper,
    BloodFat,
    DoctorSickDia,
    DoctorSickHeartBlood,
    DoctorSickTarget,
    DoctorSickCom,
    DoctorSickNow,
    DoctorSickHealthRecord,
    DoctorRecord,
    DoctorEvaResult
  },
  methods:{
    handleSubmitEva() {
      const options =  Object.assign(this.targetParams, this.comParams, this.fatParams, this.diaParams, this.bloodParams, this.nowParams, this.hyperParams);
      // console.log(options)
    },
    async getEvaResult(id) {
      const res = await fetchDocEvaResult({id})
      console.log(res)
      const { 
        doh, 
        dohNum,
        sbpLately, 
        dbpLately, 
        hrLately, 
        dod, 
        dodLatelyTcMm, 
        dodLatelyTgMm, 
        dodLatelyLdlCMm,
        dodLatelyHdlCMm, 
        diodi, 
        diodiYes,  
        crfs,
        crfsIf,   
        tod,
        todIf,
        cvsHis,
        cvsHisIf,
        hdh,
        hghIf,
        ckdStage,
        ckd,
        ckdIf,
        pvh,
        retinopathy,
        ccac,
        antiHnt,
        lla
      } = res.data.obj.ubaAssess
        this.resParams = res.data.obj.result
        // 健康管理记录
        this.RecordParams.data = res.data.obj.requestList
        console.log(this.resParams,'医生查看。。啊啊啊啊')
        this.$set(this.hyperParams,'doh',doh)
        this.$set(this.hyperParams,'dohNum',dohNum)
        this.$set(this.hyperParams,'sbpLately',sbpLately)
        this.$set(this.hyperParams,'dbpLately',dbpLately)
        this.$set(this.hyperParams,'hrLately',hrLately)
        // 血脂
        this.$set(this.fatParams,'dod',dod)
        this.$set(this.fatParams,'dodLatelyTcMm',dodLatelyTcMm)
        this.$set(this.fatParams,'dodLatelyTgMm',dodLatelyTgMm)
        this.$set(this.fatParams,'dodLatelyLdlCMm',dodLatelyLdlCMm)
        this.$set(this.fatParams,'dodLatelyHdlCMm',dodLatelyHdlCMm)
        // 糖尿病诊断情况
        this.$set(this.diaParams,'diodi',diodi)
        this.$set(this.diaParams,'diodiYes',diodiYes)
        // 心血管危险因素*
        // split(",")
        this.$set(this.bloodParams,'crfs',crfs)
        if(crfsIf !== null) {
          console.log(124)
           this.$set(this.bloodParams,'crfsIf',crfsIf.split(','))
        }else{
           this.$set(this.bloodParams,'crfsIf',[])
        }
       
        // 靶器官损害*
        // split(",")
        this.$set(this.targetParams,'tod',tod)
        if(todIf !== null) {
           this.$set(this.targetParams,'todIf',todIf.split(','))
        }else{
           this.$set(this.targetParams,'todIf',[])
        }
        
        // // 合并症
        this.$set(this.comParams,'cvsHis',cvsHis)
        if(cvsHisIf !== null) {
          this.$set(this.comParams,'cvsHisIf',cvsHisIf.split(','))
        }else{
          this.$set(this.comParams,'cvsHisIf',[])
        }

        this.$set(this.comParams,'hdh',hdh)
        if(hghIf !== null) {
          this.$set(this.comParams,'hghIf',hghIf.split(','))
        }else{
          this.$set(this.comParams,'hghIf',[])
        }

        this.$set(this.comParams,'ckdStage',ckdStage)
        this.$set(this.comParams,'ckd',ckd)
        if(ckdIf !== null) {
          this.$set(this.comParams,'ckdIf',ckdIf.split(','))
        }else{
          this.$set(this.comParams,'ckdIf',[])
        }
        this.$set(this.comParams,'pvh',pvh)
        this.$set(this.comParams,'retinopathy',retinopathy)
        this.$set(this.comParams,'ccac',ccac)
        // 目前治疗方案

        if(antiHnt !== null) {
          this.$set(this.nowParams,'antiHnt',antiHnt.split(','))
        }else{
          this.$set(this.nowParams,'antiHnt',[])
        }

        if(lla !== null) {
          this.$set(this.nowParams,'lla',lla.split(','))
        }else{
          this.$set(this.nowParams,'lla',[])
        }
        // 随访记录数据
        // 评估结果
        
    }
  },
  computed:{
    ...mapState(["assessId"])
  },
  created() {
    console.log(this.assessId)
    this.getEvaResult(this.assessId)
  }
}
</script>

<style lang="scss" scoped>
.eva-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #E9F5F1;
}
.eva-title{
  width:100%;
  height:5%;
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#3D3F3E;
  letter-spacing: 5px;
  font-size: 35px;
}
.eva-list{
  height: 95%;
  overflow-y: scroll;
}
.eva-gun{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 10px 0 10px 0;
}
.eva-item{
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:20px;
}
.SubmitEva{
  width:90%;
  height:100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  >span{
    padding: 10px 40px 10px 40px;
    background: #035732;
    border-radius: 20px;
    color:#fff;
  }
}
</style>

