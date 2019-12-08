<template>
  <div class="eva-wrap">
    <div class="eva-title">患者评估</div>
    <div class="eva-list">
      <ul class="eva-gun">
        <li class="eva-item">
          <Hyper :hyper-params="hyperParams"/>
        </li>
        <li class="eva-item">
          <BloodFat :fat-params="fatParams" />
        </li>
        <li class="eva-item">
          <DoctorSickDia :dia-params="diaParams" />
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
          <div class="img-box">
            <div class="mei">
              <span>请拍照上传患者信息，用于验证患者身份</span>
              <span>(医保卡/化验单/病历本/诊断书)</span>
            </div>
            <div class="img-right">
              <span  class="upload" @change="chooseImg">
                <input class="change" accept="image/*" type="file" multiple="multiple"/>
              </span>
            </div>
          </div>
        </li>
        <li class="eva-item">
          <div class="img-left">
            <canvas class="imgborder" ref="imgPreview" height="0" width="0"></canvas>
          </div>
        </li>
        <li class="eva-item SubmitEva">
           <span @click="handleSubmitEva">提交</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Hyper from '../components/DoctorSickEva/DoctorSickEvaHyper'
import BloodFat from '../components/DoctorSickEva/DoctorSickEvaBloodFat'
import DoctorSickDia from '../components/DoctorSickEva/DoctorSickDia'
import DoctorSickHeartBlood from '../components/DoctorSickEva/DoctorSickHeartBlood'
import DoctorSickTarget from '../components/DoctorSickEva/DoctorSickTarget'
import DoctorSickCom from '../components/DoctorSickEva/DoctorSickCom'
import DoctorSickNow from '../components/DoctorSickEva/DoctorSickNow'
import { fetchDocEvaSave } from '../assets/js/api'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 高血压患者情况
      hyperParams: {
        doh: '', //高血压诊断情况
        dohNum: '', // 此前确诊高血压患者的病程
        sbpLately: 60, // 最近一次收缩压
        dbpLately: 40, //最近一次舒张压
        hrLately: 30, //最近一次心率（次/分）
      },
      // 血脂异常诊断情况
      fatParams: {
        dod: '', // 血脂异常诊断情况*
        dodLatelyTcMm: 1, //最近一次血脂：TC（mmol/L）*
        dodLatelyTgMm: 0, // 最近一次血脂：TG（mmol/L）*
        dodLatelyLdlCMm: 0, //最近一次血脂：LDL-C（mmol/L）*
        dodLatelyHdlCMm: 0, //最近一次血脂：HDL-C（mmol/L）*
      },
      // 糖尿病诊断情况
      diaParams: {
        diodi: '',  //糖尿病诊断情况
        diodiYes: '', // 确诊糖尿病 
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
      upload: '',
    }
  },
  components:{
    Hyper,
    BloodFat,
    DoctorSickDia,
    DoctorSickHeartBlood,
    DoctorSickTarget,
    DoctorSickCom,
    DoctorSickNow
  },
  computed:{
    ...mapState(["doctorId","tranches","caseId"])
  },
  methods:{
    ...mapMutations({
      updateEvaResult:"updateEvaResult",
      updateInvesFinish:"updateInvesFinish",
    }),
    chooseImg (event) { //上传
      let file = event.target.files[0]
      let reader = new FileReader()
      let img = new Image()
      // 读取图片
      reader.readAsDataURL(file)
      // 读取完毕后的操作
      reader.onloadend = (e) => {
        img.src = e.target.result
        this.upload = reader.result
        this.$toast('已选择照片')
      }
      // 预览图片
      let canvas = this.$refs['imgPreview']
      let context = canvas.getContext('2d')
      img.onload = () => {
        img.width = 300
        img.height = 200
        // 设置canvas大小
        canvas.width = 300
        canvas.height = 200
        // 清空canvas
        context.clearRect(0, 0, 300, 200)
        // 画图
        context.drawImage(img, 0, 0, 300, 200)
      }
    },
    handleSubmitEva() {
      // if(this.tranches == '1') {
        if(this.hyperParams.doh === '') {
          this.$toast('请填写高血压诊断情况')
          return 
        }
        if(this.hyperParams.doh == '1') {
          if(this.hyperParams.sbpLately == 60 ) {
            this.$toast('请填写最近一次收缩压')
            return 
          } 
          if(this.hyperParams.dbpLately == 40) {
            this.$toast('请填写最近一次舒张压')
            return
          } 
          if(this.hyperParams.hrLately == 30) {
            this.$toast('请填写最近一次心率')
            return
          }
        }
        if(this.hyperParams.doh == '2') {
          if(this.hyperParams.dohNum === '' ) {
            this.$toast('请填写此前确诊高血压患者的病程')
            return
          }
          if(this.hyperParams.sbpLately == 60 ) {
            this.$toast('请填写最近一次收缩压')
            return 
          } 
          if(this.hyperParams.dbpLately == 40) {
            this.$toast('请填写最近一次舒张压')
            return
          } 
          if(this.hyperParams.hrLately == 30) {
            this.$toast('请填写最近一次心率')
            return
          }
        }
      // } 
      //如果是血脂组
      // if(this.tranches == '2') {
        if(this.fatParams.dod === '') {
          this.$toast('血脂异常诊断情况')
          return 
        }
        if(this.fatParams.dod == '1' || this.fatParams.dod == '2' ) {
          console.log('2222')
          if(this.fatParams.dodLatelyTcMm == 1 ) {
            this.$toast('请填写最近一次血脂：TC')
            return
          }
          if(this.fatParams.dodLatelyTgMm == 0 ) {
            this.$toast('请填写最近一次血脂：TG')
            return
          }
          if(this.fatParams.dodLatelyLdlCMm == 0 ) {
            this.$toast('请填写最近一次血脂：LDL-C')
            return
          }
          if(this.fatParams.dodLatelyHdlCMm == 0 ) {
            this.$toast('请填写最近一次血脂：HDL-C')
            return
          }
        }
      // } 

      if(this.diaParams.diodi === '' ) {
        this.$toast('请填写糖尿病诊断情况')
        return 
      } 
       if(this.diaParams.diodi == 1 ) {
         if(this.diaParams.diodiYes === '' ) {
            this.$toast('请填写确诊糖尿病')
            return
          }
      } 
      if(this.bloodParams.crfs === '' ) {
        this.$toast('请填写是否有心血管危险因素')
        return 
      }
      if(this.targetParams.tod === '' ) {
        this.$toast('请填写是否有靶器官损害')
        return 
      }
      if(this.comParams.ccac === '' ) {
        this.$toast('请填写是否有临床并发症与合并症')
      }
      const options =  Object.assign(this.targetParams, this.comParams, this.fatParams, this.diaParams, this.bloodParams, this.nowParams, this.hyperParams);
        options.caseId = this.caseId
        options.doctorId = this.doctorId
        options.tranches = this.tranches
        options.crfsIf = options.crfsIf.join(',')
        options.todIf = options.todIf.join(',')
        options.cvsHisIf = options.cvsHisIf.join(',')
        options.hghIf = options.hghIf.join(',')
        options.ckdIf = options.ckdIf.join(',')
        options.antiHnt = options.antiHnt.join(',')
        options.lla = options.lla.join(',')
        options.upload = this.upload
        this.evaSave(options)
      // }
      /*
  
      if(comParams.ccac === '1' ) {
        if(comParams.cvsHis === '' ) {
          this.$toast('请填写脑血管病史')
          return
        }
        if(comParams.cvsHis === '1' ) {
          if(comParams.cvsHisIf.length === 0 ) {
              this.$toast('请填写如有脑血管病史，请勾选')
              return
          }
        }
        if(comParams.hdh === '' ) {
          this.$toast('请填写心脏病史')
          return
        }
        if(comParams.hdh === '1' ) {
          if(comParams.hghIf.length === 0 ) {
              this.$toast('请填写如有心脏病史，请勾选')
              return
          }
        }
        if(comParams.ckd === '' ) {
          this.$toast('请填写肾脏病史')
          return
        }
        if(comParams.ckd === '1' ) {
          if(comParams.ckdIf.length === 0 ) {
              this.$toast('请填写如有肾脏病史，请勾选')
              return
          }
          if(comParams.ckdStage === '' ) {
              this.$toast('请填写CKD分期')
              return
          }
        }
        if(comParams.pvh === '' ) {
          this.$toast('请填写外周血管病史')
          return
        }
        if(comParams.retinopathy === '' ) {
          this.$toast('请填写视网膜病变')
          return
        }
      }*/
    },
    async evaSave(options) {
      const res = await fetchDocEvaSave(options)
      // this.$loading.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // })
      const assessId = res.data.obj.assessId
      this.updateInvesFinish({ assessId })
      if(res.data.success === true) {
        // this.$loading.close()
        const result = Object.assign(res.data.obj.ascvdResult,res.data.obj.cvdResult)
        console.log(result,"合并")
        this.updateEvaResult(result)
        this.$router.push({path:'./evaResult'})
      }
    }
  }
}
</script>

<style lang="scss">
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
.img-box{
  width:95%;
  height:100px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position: relative;
  border:1px solid #00f;
  overflow: hidden;
  .mei{
    pointer-events: none;
    position: absolute;
    width:100%;
    height: 100%;
    background: #035732;  
    text-align: center;
    color:#fff;
    font-size:22px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .img-left{
    position: absolute;
    z-index: 1000;
  }
}
.change{
  display: block;
  width: 100%;
  height: 100%;
  margin:0;
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
