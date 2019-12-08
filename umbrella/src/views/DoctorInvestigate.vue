<template>
  <div class="inves-wrap">
    <div class="inves-list">
      <ul class="inves-gun">
        <li class="inves-img">
          <img :src="require('../assets/images/1.png')" alt="">
        </li>
        <li class="inves-desc">
          为了更好的了解医务工作人员在临床实践中对高血压/血脂异常患者的规范化管理认知，
          提高患者的知晓率和治愈率，中国心血管健康联盟，苏州工业园区心血管健康研究院主办的umbrella项目诚邀您参与此次调查
        </li>
         <!-- <li style="width:90%; text-align:left; padding-left:20px; color:#326F51; font-size:24px">心血管风险评估观念调查</li> -->
        <li class="inves-item">
          <div>1.对高血压和/或血脂异常患者，在确定治疗方案前是否应该进行心血管风险评估？（多选）</div>
          <div class="inves-select">
            <mt-checklist
              v-model="valueOne"
              :options="optionsOne">
            </mt-checklist>
          </div>
        </li>
        <li class="inves-item">
           <div>2.临床实践中，您是否对高血压患者进行CVD评估?（单选）</div>
          <div class="inves-select">
            <mt-radio
              v-model="valueTwo"
              :options="optionsTwo">
            </mt-radio>
          </div>
        </li>
        <li class="inves-item">
          <div>3.在临床实践中，您是否对血脂异常的患者进行ASCVD风险评估？（单选）</div>
          <div class="inves-select">
            <mt-radio
              v-model="valueThree"
              :options="optionsThree">
            </mt-radio>
          </div>
        </li>
        <li class="inves-item">
          <div>4.您使用的CVD风险在线评估工具，对高血压患者的临床管理是否有帮助？（单选）</div>
          <div class="inves-select">
            <mt-radio
              v-model="valueFour"
              :options="optionsFour">
            </mt-radio>
          </div>
        </li>
        <li class="inves-item">
          <div>5.您使用的ASCVD风险在线评估工具，对血脂异常的患者的临床管理是否有帮助？（单选）</div>
          <div class="inves-select">
            <mt-radio
              v-model="valueFive"
              :options="optionsFive">
            </mt-radio>
          </div> 
        </li>
        <li class="inves-item">
          <div>6.对于合并多重危险因素/靶器官损害的高血压患者，您认为应该选择哪类药物作为基础用药？（多选）</div>
          <div class="inves-select">
            <mt-checklist
              v-model="valueSix"
              :options="optionsSix">
            </mt-checklist>
          </div>
        </li>
        <li class="inves-item">
           <div>7.以下哪些高血压人群属于ACEI类药物主要适应症人群？（多选）</div>
          <div class="inves-select">
             <mt-checklist
              v-model="valueSeven"
              :options="optionsSeven">
            </mt-checklist>
          </div>
        </li>
        <li class="inves-item">
          <div>8.以下哪些血脂异常患者，需要使用他汀进行ASCVD一级预防？（多选）</div>
          <div class="inves-select">
            <mt-checklist
              v-model="valueEight"
              :options="optionsEight">
            </mt-checklist>
          </div>
        </li>
        <li class="inves-item">
          <div>9.对血脂异常患者，临床调脂达标首选他汀类药物，起始治疗应该应用____他汀？（单选）</div>
          <div class="inves-select">
            <mt-radio
              v-model="valueNine"
              :options="optionsNine">
            </mt-radio>
          </div>
        </li>
        <li class="inves-item" v-if="TenShow == 1">
          <div>10.什么样的患者会起始中等强度的他汀？（单选）</div>
          <div class="inves-select">
            <mt-radio
              v-model="valueTen"
              :options="optionsTen">
            </mt-radio>
          </div> 
        </li>
         <li class="inves-sub" @click="handleSubmit">
           <span>提交</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchDocGndcSave } from '../assets/js/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      valueOne: [],
      valueTwo: '',
      valueThree: '',
      valueFour: '',
      valueFive: '',
      valueSix: [],
      valueSeven: [],
      valueEight: [],
      valueNine: '',
      TenShow: 2,
      valueTen: '',
      // one
      optionsOne: [
      {
        label: '对高血压患者评估心血管疾病（CVD）风险',
        value: '1',
      },
      {
        label: '对血脂异常患者评估动脉粥样硬化性心血管疾病（ASCVD）风险',
        value: '2'
      },
      {
        label: '对高血压患者不评估风险',
        value: '3'
      },
      {
        label: '对血脂异常者不评估风险',
        value: '4'
      }],
       // Two
      optionsTwo: [
      {
        label: '对新诊断未治疗的患者进行评估',
        value: '1',
      },
      {
        label: '对正在进行降压治疗的患者进行评估',
        value: '2'
      },
      {
        label: '不评估',
        value: '3'
      }],
      optionsThree: [
      {
        label: '对新诊断未治疗的患者进行评估',
        value: '1',
      },
      {
        label: '对正在进行降压治疗的患者进行评估',
        value: '2'
      },
      {
        label: '不评估',
        value: '3'
      }],
      optionsFour: [
      {
        label: '有帮助',
        value: '1',
      },
      {
        label: '没有帮助',
        value: '2'
      },
      {
        label: '不确定',
        value: '3'
      }],
      optionsFive: [
      {
        label: '有帮助',
        value: '1',
      },
      {
        label: '没有帮助',
        value: '2'
      },
      {
        label: '不确定',
        value: '3'
      }],
      optionsSix: [
      {
        label: 'ACEI类药物',
        value: '1',
      },
      {
        label: 'ARB类药物',
        value: '2'
      },
      {
        label: 'CCB类药物',
        value: '3'
      },
       {
        label: '利尿剂类药物',
        value: '4',
      },
      {
        label: 'β阻滞剂类药物',
        value: '5'
      },
      {
        label: '其他类药物',
        value: '6'
      }],
      optionsSeven: [
      {
        label: '左心室肥厚',
        value: '1',
      },
      {
        label: '稳定性冠心病',
        value: '2'
      },
      {
        label: '心肌梗死后',
        value: '3'
      },
       {
        label: '心力衰竭',
        value: '4',
      },
      {
        label: '心房颤动预防',
        value: '5'
      },
      {
        label: '脑血管病',
        value: '6'
      },{
        label: '颈动脉内中膜增厚',
        value: '7',
      },
      {
        label: '蛋白尿/微量白蛋白尿',
        value: '8'
      },
      {
        label: '肾功能不全',
        value: '9'
      },
       {
        label: '老年',
        value: '10',
      },
      {
        label: '糖尿病',
        value: '11'
      },
      {
        label: '血脂异常',
        value: '12'
      }],
      optionsEight: [
      {
        label: 'LDL-C>=4.9mmol/L者',
        value: '1',
      },
      {
        label: 'TC>=7.2mmol/L者',
        value: '2'
      },
      {
        label: '1.8mmol/L<=LDL-C<4.9mmol/L的糖尿病患者',
        value: '3'
      },
       {
        label: '3.1mmol/L<=tc<7.2mmol/L的糖尿病患者',
        value: '4',
      },
      {
        label: '合并1个危险因素的高血压患者',
        value: '5'
      },
      {
        label: '合并2个危险因素的高血压患者',
        value: '6'
      }, 
      {
        label: '以上都不会',
        value: '7'
      }],
      optionsNine: [
      {
        label: '中等强度他汀',
        value: '1',
      },
      {
        label: '高强度他汀',
        value: '2'
      }],
      optionsTen: [
      {
        label: '所有血脂异常患者都应起始使用中毒强度他汀',
        value: '1',
      },
      {
        label: '极高危患者起始使用高强度他汀，高位及以下起始使用中等强度他汀',
        value: '2'
      },
      {
        label: '有肝/肾功能异常的患者起始使用中等强度他汀',
        value: '3'
      },
      {
        label: '基本不选择中等强度他汀起始治疗',
        value: '4'
      }],
    }
  },
  components:{
    
  },
  computed:{
    ...mapState(["zqty", "tranches", "doctorId"])
  },
  watch:{
    valueNine(newValue) {
      if(newValue == 1) {
        this.TenShow = 2
        this.valueTen = ''
      }
      if(newValue == 2) {
        this.TenShow = 1
      }
    },
    immdiate:true,
    deep:true
  },
  methods:{
    async handleSubmit() {
      const params = {
        question1 :this.valueOne,
        question2 :this.valueTwo,
        question3 :this.valueThree,
        question4 :this.valueFour,
        question5 :this.valueFive,
        question6 :this.valueSix,
        question7 :this.valueSeven,
        question8 :this.valueEight,
        question9 :this.valueNine,
        question10 :this.valueTen,
      }
     this.docGndcSave(params.question1.join(','), params.question2, params.question3, params.question4, params.question5, params.question6.join(','), params.question7.join(','), params.question8.join(','), params.question9, params.question10,this.tranches,this.doctorId)
      //  this.docGndcSave(ubaDoctorConceptQuestionnaire)
    },
    // 医生观念调查保存
    async docGndcSave(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10,tranches, doctorId) {
    // async docGndcSave(ubaDoctorConceptQuestionnaire) {
      console.log(12)
      const res = await fetchDocGndcSave( {question1, question2, question3, question4, question5, question6, question7, question8, question9, question10,tranches, doctorId} )
      console.log(res)
      if(res.data.success  === true && this.zqty.length === 0) {
        this.$router.push({path:'./doctorAgree'})
        return 
      }
      if(res.data.success  === true && this.zqty.length !== 0) {
        this.$router.push({path:'./doctorQr'})
        return 
      }
    }
  }
}
</script>

<style lang="scss" >
.inves-wrap{
  width: 100%;
  height: 100%;
  background: #FFF;
  overflow-y: scroll;
}
.inves-list{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
/*ul*/
.inves-gun{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px 0 10px 0;
  .inves-sub{
    width: 100%;
    height: 100px;
    margin-top:20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    >span{
      width: 40%;
      text-align: center;
      border-radius: 10px;
      background: #035732;
      color:#fff;
      padding: 10px;
    }
  }
}
.inves-img{
  width:100%;
  img{
    width: 100%;
  }
}
.inves-desc{
  width:100%;
  font-size:28px;
  color:#aaaaaa;
  // font-weight: bold;
  margin-bottom:20px;
  text-indent:20px;
  padding: 10px 20px 0 20px;
}

.inves-item{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:20px;
  >div:nth-child(1) {
    width: 90%;
    background: #EDF2EE;
    font-size: 30px;
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    color:#000;
  }
  .inves-select{
    width:90%;  
    margin-top:10px;
    // border:1px solid #0f0;
  }
  .mint-cell-wrapper{
    border:none !important;
  }
  .mint-radio-input:checked + .mint-radio-core {
    background: #035732;
  }
  .mint-radio-label, .mint-checkbox-label{
    font-size: 15px;
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background: #035732;
  }
  .mint-checkbox-core::after {
    border:none !important;
  }
  .mint-cell{
    border: none;
  }
}

/*父组件定义好方法列表，吧列表数据给子组件。子组件直接用赋值。*/
</style>