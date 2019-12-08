<template>
    <div class="evaCom-hyper">
      <div class="evaCom-hyperTitle">6.临床合并症 (可多选)</div>
      <div class="evaTarget-reason">
        <div class="radio-box" v-for="(item,index) in radiocoms" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="comParams.ccac" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div>
       <!--脑血管病史-->
        <div class="evaCom-brain" @click="handleBrain">
          <span class="evaCom-change" :class="{beautiful:brainState}"></span>
          <span>脑血管病史</span>
        </div>
        <div class="brain-wrap" v-if="brainState === true">
          <mt-checklist
            v-model="comParams.cvsHisIf"
            :options="optionsBrain">
          </mt-checklist>
        </div>
        <!--心脏病史-->
        <div class="evaCom-heart" @click="handleHeart">
          <span class="evaCom-change" :class="{beautiful:heartState}"></span>
          <span>心脏病史</span>
        </div>
        <div class="heart-wrap" v-if="heartState === true">
           <mt-checklist
            v-model="comParams.hghIf"
            :options="optionsHeart">
          </mt-checklist>
        </div>
        <!--肾脏病史-->
        <div class="evaCom-kidney" @click="handleKindney">
          <span class="evaCom-change" :class="{beautiful:kidneyState}"></span>
          <span>肾脏病史</span>
        </div>
        <div class="kidney-wrap" v-if="kidneyState === true">
           <mt-checklist
            v-model="comParams.ckdIf"
            :options="optionsKidney">
          </mt-checklist>
        </div>
        <!--外周血管病史-->
        <div class="evaCom-blood" @click="handleBlood">
          <span class="evaCom-change" :class="{beautiful:bloodState}"></span>
          <span>外周血管病史</span>
        </div>
        <!--视网膜病变-->
        <div class="evaCom-eye" @click="handleEye">
          <span class="evaCom-change" :class="{beautiful:eyeState}"></span>
          <span>视网膜病变</span>
        </div>
        <!--临床并发症于合并症-->
        <!-- <div class="evaCom-com" @click="handleCom">
          <span class="evaCom-change" :class="{beautiful:ccacState}"></span>
          <span>临床并发症与合并症</span>
        </div> -->
    </div>
</template>

<script>
export default {
  props:["comParams"],
  data() {
    return {
      radio: '',
      radiocoms:[
        {
          label:'有',
          value:'1',
          isChecked: false,
        },
        {
          label: '没有',
          value:'2',
          isChecked: false,
      }],
      optionsBrain:[
        {
          label: '短暂性脑缺血发作',
          value: '1'
        },
        {
          label: '缺血性脑卒中',
          value: '2'
        }, 
        {
          label: '脑出血',
          value: '3'
      }],
      optionsHeart:[
        {
          label: '心绞痛',
          value: '1'
        },
        {
          label: '心肌梗死',
          value: '2'
        }, 
        {
          label: '冠状动脉血运重建',
          value: '3'
      },{
          label: '急性冠状动脉综合征',
          value: '4'
        },
        {
          label: '稳定性冠心病',
          value: '5'
        }, 
        {
          label: '缺血性心肌病',
          value: '6'
      },
      {
          label: '慢性心力衰竭',
          value: '7'
        }, 
        {
          label: '心房颤动',
          value: '8'
      }],
      optionsKidney:[
        {
          label: '糖尿病肾病',
          value: '1'
        },
        {
          label: '临床蛋白尿（≥300mg/24h）',
          value: '2'
        }, 
        {
          label: 'eGFR<30ml/min/1.73m2',
          value: '3'
      },
      {
          label: '血肌酐升高（男性≥133mmol/L或1.5mg/dl，女性≥124mmol/L或1.4mg/dl）',
          value: '4'
      }],
      brainState:false,
      heartState: false,
      kidneyState: false,
      bloodState: false,
      eyeState: false,
      ccacState: false,
      // comParams:{
      //   cvsHis:'', // 脑血管病史
      //   cvsHisIf: [],	 ///如有脑血管病史，请勾选*
      //   hdh:'',	// 心脏病史
      //   hghIf:[], // 如有心脏病史，请勾选*
      //   ckd:'', //	肾脏病史*
      //   ckdIf:[],	// 如有肾脏病史，请勾选*
      //   ckdStage:'', //CKD分期*
      //   pvh:'',	// 外周血管病史*
      //   retinopathy:'',	// 视网膜病变(出血或渗出，或视网膜水肿)*
      //   ccac:'', // 临床并发症与合并症*
      // }
    }
  },
  methods: {
    check(index) {
      // 先取消所有选中项
      this.radiocoms.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radiocoms[index].value;
      // 设置值，以供传递
      this.radiocoms[index].isChecked = true;
    },
    handleBrain(){
      this.brainState = !this.brainState
      this.comParams.cvsHis = 1
    },
    handleHeart()  {
      this.heartState = !this.heartState
      this.comParams.cvsHis = 1
    },
    handleKindney() {
      this.kidneyState = !this.kidneyState
      this.comParams.cvsHis = 1
    },
    handleBlood() {
      this.bloodState = !this.bloodState
    },
    handleEye() {
      this.eyeState = !this.eyeState
    },
    handleCom(){
      this.ccacState = !this.ccacState
    },
  },
  mounted() {
    if(this.comParams.cvsHisIf.length !== 0) {
      this.brainState = true
    }
    if(this.comParams.hghIf.length !== 0) {
      this.heartState = true
    }
    if(this.comParams.ckdIf.length !== 0) {
      this.kidneyState = true
    }
  },
  watch:{
    brainState(newValue) {
      if(newValue === true){
        this.comParams.cvsHis = 1
      }else{
        this.comParams.cvsHis = ''
        this.comParams.cvsHisIf = []
      }
    },
    heartState(newValue) {
      if(newValue === true){
        this.comParams.hdh = 1
      }else{
        this.comParams.hdh = ''
        this.comParams.hghIf = []
      }
    },
    kidneyState(newValue) {
      if(newValue === true){
        this.comParams.ckd = 1
      }else{
        this.comParams.ckd = ''
        this.comParams.ckdIf = []
      }
    },
    bloodState(newValue) {
      if(newValue === true){
        this.comParams.pvh = 1
      }else{
        this.comParams.pvh = ''
      }
    },
    eyeState(newValue) {
      if(newValue === true){
        this.comParams.retinopathy = 1
      }else{
        this.comParams.retinopathy = ''
      }
    },
    ccacState(newValue) {
      console.log(newValue,'2121')
      if(newValue === true){
        this.comParams.ccac = 1
      }else{
        this.comParams.ccac = ''
      }
    },
    comParams:{
      handler(val) {
        if(val.cvsHis == 1 ){
          this.brainState = true
        }
        if(val.hdh == 1 ){
          this.heartState = true
        }
        if(val.ckd == 1 ){
          this.kidneyState = true
        }
        if(val.pvh == 1 ){
          this.bloodState = true
        }
        if(val.retinopathy == 1 ){
          this.eyeState = true
        }
        if(val.ccac == 1 ){
          this.radiocoms[0].isChecked = true
        }
        if(val.ccac == 2 ){
          this.radiocoms[1].isChecked = true
        }
      },
      immediate: true,
      deep:true
    },
   immediate: true,
   deep:true
  }
}
</script>

<style lang="scss" scoped>
/*高血压*/
.evaCom-hyper{
  width:95%;
  // height:400px;
  margin-top:40px;
  background: #C5E6DF;
  border-radius: 30px;
  position: relative;
  border:1px solid #035832;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
  .evaCom-hyperTitle{
    height:50px;
    padding: 0 10px;
    border-radius: 10px;
    background: #22A559;
    color: #fff;
    text-align: center;
    line-height: 50px;
    position: absolute;
    z-index: 100;
    left:30px;
    top:-20px;
  }
  .evaCom-brain, .evaCom-heart, .evaCom-kidney, .evaCom-blood, .evaCom-eye, .evaCom-com{
    width:85%;
    height:50px;
    margin-top:50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    >span:nth-child(2){
      margin-left:20px;
      font-size: 24px;
    }
    .evaCom-change{
      width:40px;
      height:40px;
      border:1px solid #032735;
      border-radius: 50%;
      background: #fff;
    }
    .beautiful{
      width:40px;
      height:40px;
      border:1px solid #032735;
      border-radius: 50%;
      background: #035832;
    }
  }
  /*隐藏的数据*/
  .brain-wrap, .heart-wrap, .kidney-wrap{
    width: 75%;
    .mint-checkbox-input:checked + .mint-checkbox-core {
      background: #035732;
    }
    .mint-checkbox-core::after {
      content: " ";   
      border: none;
      border-left: none;
    }
    .mint-cell-wrapper{
      background: #C5E6DF;
    }
    .mint-checkbox-label{
      font-size: 12px;
    }
  }
}
</style>