<template>
    <div class="evaHyper-hyper">
      <div class="evaHyper-hyperTitle">1.高血压诊断情况</div>
      <!-- <div class="evaHyper-new"><span class="new" isSick="new" :class="{changecolor:change}"></span><span>新诊断的高血压患者</span></div> -->
      <!-- <div class="evaHyper-unknow"><span  class="unknow" isSick="unknow" :class="{changecolor:!change}"></span><span>未确诊高血压</span></div> -->
      <div class="evaHyper-radio">
        <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="hyperParams.doh" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div>
      <div class="evaHyper-year" v-if="yearShow === true"> <span>此前确诊的患者，高血压病程（年）：</span><input type="text" placeholder="请填写" v-model="hyperParams.dohNum"></div>
      <div class="evaHyper-recently">最近一次的血压水平（mmHg）</div>
      <div class="evaHyper-hyperRange">
        <div class="evaHyper-sys">
          <div>收缩压</div>
          <div class="sub" @click="handleSubNum">-</div>
          <div class="evaHyper-range"> 
            <mt-range v-model="hyperParams.sbpLately" :min="60" :max="300">
            </mt-range>
          </div>
          <div class="add" @click="handleAddNum">+</div>
          <div class="evaHyper-count">{{hyperParams.sbpLately}}</div>
        </div>
        <!--舒张压-->
        <div class="evaHyper-dia">
          <div>舒张压</div>
          <div class="sub" @click="handleSubShu">-</div>
          <div class="evaHyper-range"> 
            <mt-range v-model="hyperParams.dbpLately" :min="40" :max="130">
            </mt-range>
          </div>
          <div class="add"  @click="handleAddShu">+</div>
          <div class="evaHyper-count">{{hyperParams.dbpLately}}</div>
        </div>
        <!--心率-->
          <div class="evaHyper-heart">
          <div>心率</div>
          <div class="sub" @click="handleSubXin">-</div>
          <div class="evaHyper-range"> 
            <mt-range v-model="hyperParams.hrLately" :min="30" :max="300">
            </mt-range>
          </div>
          <div class="add" @click="handleAddXin">+</div>
          <div class="evaHyper-count">{{hyperParams.hrLately}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:["hyperParams"],
  data() {
    return {
      yearShow:false,
      rangeShou:60, //收缩压
      rangeShu:0, //舒张压
      rangevaXin: 0,// 心率
      doh:'', //新诊断情况
      change:true,
      radio: '',
      radios:[
        {
          label: '新诊断的高血压患者',
          value:'1',
          isChecked: false,
        },
        {
          label: '此前确诊的高血压，高血压病程',
          value:'2',
          isChecked: false,
        },
        {
          label: '未确诊的高血压',
          value:'3',
          isChecked: false,
        }]
    }
  },
  watch: {
    radio(newValue){
      if(newValue == 2) {
        this.yearShow = true
      }else{
        this.yearShow = false,
        this.hyperParams.dohNum = ''
      }
    }
  },
  methods: {
    check(index) {
      // 先取消所有选中项
      this.radios.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radios[index].value;
      // 设置值，以供传递
      this.radios[index].isChecked = true;
    },
    // 点击增加收缩压
    handleAddNum() {
      this.hyperParams.sbpLately ++
      if(this.hyperParams.sbpLately > 300) {
        this.hyperParams.sbpLately = 300
      }
    },
    // 点击减少收缩压
    handleSubNum() {
      this.hyperParams.sbpLately --
      if(this.hyperParams.sbpLately < 60) {
        this.hyperParams.sbpLately = 60
      }
    },
    // 点击增加舒张压
    handleAddShu(){
      this.hyperParams.dbpLately ++
      if(this.hyperParams.dbpLately > 130) {
        this.hyperParams.dbpLately = 130
      }
    },
    // 点击减少舒张压
    handleSubShu(){
      this.hyperParams.dbpLately --
      if(this.hyperParams.dbpLately < 40) {
        this.hyperParams.dbpLately = 40
      }
    },
    // 点击增加心率
    handleAddXin(){
      this.hyperParams.hrLately ++
      if(this.hyperParams.hrLately> 300) {
        this.hyperParams.hrLately = 300
      }
    },
    // 点击减少心率
    handleSubXin(){
      this.hyperParams.hrLately --
      if(this.hyperParams.hrLately < 30) {
        this.hyperParams.hrLately = 30
      }
    }
  }
}
</script>

<style lang="scss">
/*高血压*/
.evaHyper-hyper{
  width:95%;
  padding: 20px 0;
  margin-top:40px;
  background: #C5E6DF;
  border-radius: 30px;
  position: relative;
  border:1px solid #035832;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .evaHyper-hyperTitle{
    width: 40%;
    height:50px;
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
  .evaHyper-radio{
    width: 95%;
    height:200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .radio-box{
      width: 100%;
      margin-top:20px;
      position: relative;
      line-height: 25px;
      margin-right: 5px;
    }
    .radio {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin-right: 5px;
      border:1px solid #032735;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: 0 0;
    }
    .input-radio {
      margin-right: 10px;
      display: inline-block;
      position: absolute;
      opacity: 1;
      width: 50px;
      height: 50px;
      cursor: pointer;
      left: 0px;
      outline: none;
      -webkit-appearance: none;
    }
    .on {
     background: #035732;
    }
  }
  // .evaHyper-new{
  //   width:95%;
  //   height:50px;
  //   margin-top:40px;
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //  /* border:1px solid #0f0;*/
  //   .new {
  //     width:50px;
  //     height: 50px;
  //     border-radius: 50%;
  //     background: #fff;
  //     border:1px solid #22A559;
  //   }
  //   >span:nth-child(2) {
  //     margin-left: 20px;
  //   }
  //   .changecolor {
  //     background: #22A559;
  //   }
  // }
  .evaHyper-year{
    width:95%;
    height:50px;
    margin-top:40px;
   /* border:1px solid #0f0;*/
    display: flex;
    justify-content: flex-end;
    align-items: center;
    >span{
      flex:1;
      font-size: 20px;
    }
    >input{
      width: 30%;
      border:none;
      outline: none;
      background: #C5E6DF;
    }
  }
  // .evaHyper-unknow{
  //   width:95%;
  //   height:50px;
  //   margin-top:40px;
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //  /* border:1px solid #0f0;*/
  //   .unknow {
  //     width:50px;
  //     height: 50px;
  //     border-radius: 50%;
  //     background: #fff;
  //     border:1px solid #22A559;
  //   }
  //   >span:nth-child(2) {
  //     margin-left: 20px;
  //   }
  //   .changecolor {
  //     background: #22A559;
  //   }
  // }
  .evaHyper-recently{
    width:95%;
    height:50px;
    margin-top:40px;
   /* border:1px solid #0f0;*/
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
  }
  /* 进度条 */ 
  .evaHyper-hyperRange{
    width:95%;
    height:250px;
    border-radius: 30px;
    background: #E9F5F1;
    margin-top:20px;
   /* border:1px solid #0f0;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .evaHyper-sys {
      width:95%;
      height:70px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 20%;
        font-size: 26px;
      }
      .evaHyper-range {
        flex:1;
      }
      .evaHyper-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
    /*舒张压*/
    .evaHyper-dia {
      width:95%;
      height:70px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 20%;
        font-size: 26px;
      }
      .evaHyper-range {
        flex:1;
      }
      .evaHyper-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
     /*心率*/
    .evaHyper-heart {
      width:95%;
      height:70px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 20%;
        font-size: 26px;
      }
      .evaHyper-range {
        flex:1;
      }
      .evaHyper-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
  }
  /*高血压分类*/
  .evaHyper-classify{
    width: 100%;
    height:40px;
    margin-top:20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
   /* border:1px solid #0f0;*/
  }
  .radio-box{
    display: inline-block;
    position: relative;
    height: 25px;
    line-height: 25px;
    margin-right: 5px;
  }
  .radio {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border:1px solid #032735;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: 0 0;
  }
  .input-radio {
    border-radius: 50%;
    margin-right: 10px;
    display: inline-block;
    position: absolute;
    opacity: 1;
    width: 25px;
    height: 25px;
    cursor: pointer;
    left: 0px;
    outline: none;
    -webkit-appearance: none;
  }
  .on {
    background: #035732;
  }
}
</style>
