<template>
    <div class="evaDia-hyper">
      <div class="evaDia-hyperTitle">3.糖尿病诊断情况</div>
       <div class="evaDia-complication">
        是否确诊
        <div class="radio-box" v-for="(item,index) in radioClas" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="radioCla" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="checkCal(index)" type="radio">{{item.label}}
      </div>
      </div>
       <div class="evaDia-complication" v-if="bingShow == 1">
        并发症：
        <div class="radio-box" v-for="(item,index) in radioComs" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="radioCom" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
      </div>
      </div>
    </div>
</template>

<script>
export default {
  props:["diaParams"],
  data() {
    return {
      bingShow:'',
      radioCom: '',
      radioCla: '',
      radioComs:[
        {
          label: '有并发症',
          value:'1',
          isChecked: false,
        },
        {
          label: '无并发症',
          value:'2',
          isChecked: false,
        },
      ],
      radioClas:[
        {
          label: '已确诊',
          value:'1',
          isChecked: false,
        },
        {
          label: '未确诊',
          value:'2',
          isChecked: false,
        },
      ],
    }
  },
  watch:{
    radioCom(newValue){
      if(newValue) {
        this.diaParams.diodi = newValue
      }
    },
    radioCla(newValue){
      console.log(newValue)
      if(newValue) {
        if(newValue == 1) {
          this.bingShow = 1
          this.diaParams.diodiYes = newValue
        } else{
          this.bingShow = 2
          this.diaParams.diodi = newValue
          this.radioCom = ''
        }
      }
    }
  },
  methods: {
    // 自定义radio
    check(index) {
      // 先取消所有选中项
      this.radioComs.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radioComs[index].value;
      // 设置值，以供传递
      this.radioComs[index].isChecked = true;
    },
    checkCal(index) {
      // 先取消所有选中项
      this.radioClas.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radioClas[index].value;
      // 设置值，以供传递
      this.radioClas[index].isChecked = true;
    },
  }
}
</script>>

<style lang="scss">
/*高血压*/
.evaDia-hyper{
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
  .evaDia-hyperTitle{
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
  /*已确诊糖尿病*/
  .evaDia-old{
    width:95%;
    height:50px;
    margin-top:40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   /* border:1px solid #0f0;*/
    .old {
      width:50px;
      height: 50px;
      border-radius: 50%;
      background: #fff;
      border:1px solid #22A559;
    }
    >span:nth-child(2) {
      margin-left: 20px;
    }
    .changecolor {
      background: #22A559;
    }
  }
  /*确诊糖尿病的并发症*/
  .evaDia-complication{
    width:90%;
    padding: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .radio-box{
      display: inline-block;
      position: relative;
      margin-left: 20px;
      height: 25px;
      line-height: 25px;
      // margin-right: 5px;
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
      margin-right: 10px;
      display: inline-block;
      position: absolute;
      opacity: 1;
      width: 30px;
      height: 30px;
      cursor: pointer;
      left: 0px;
      outline: none;
      -webkit-appearance: none;
    }
    .on {
      background: #035732;
    }
  }
  /*未确诊糖尿病*/
  .evaDia-unknow{
    width:95%;
    height:50px;
    margin-top:40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   /* border:1px solid #0f0;*/
    .unknow {
      width:50px;
      height: 50px;
      border-radius: 50%;
      background: #fff;
      border:1px solid #22A559;
    }
    >span:nth-child(2) {
      margin-left: 20px;
    }
    .changecolor {
      background: #22A559;
    }
  }
  /*糖尿病类型*/
  .evaDia-diaClassify{
    width:90%;
    padding: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .radio-box{
      display: inline-block;
      position: relative;
      padding-left: 20px;
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
  /*糖尿病病程*/
  .evaDia-year{
    width:95%;
    height:50px;
    margin-top:40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   /* border:1px solid #0f0;*/
    .year {
      width:50px;
      height: 50px;
      border-radius: 50%;
      background: #fff;
      border:1px solid #22A559;
    }
    >span:nth-child(2) {
      margin-left: 20px;
    }
    .changecolor {
      background: #22A559;
    }
  }
  /*糖尿病表格*/
  .evaDia-diafiled{
    width:90%;
    height:200px;
    font-size: 18px;
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      >li{
        margin-top: 20px;
        >input{
          border:none;
          outline: none;
          background: #C5E6DF;
        }
      }
    }
  }
}
</style>
