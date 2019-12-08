<template>
    <div class="evaBlood-hyper">
      <div class="evaBlood-hyperTitle">2.血脂异常诊断情况</div>
      <div class="evaBlood-classify">
        <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="radio" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div>
      <div class="evaBlood-recently">最近一次的血脂水平（mmHg）</div>
      <div class="evaBlood-hyperRange">
        <!-- <div class="evaBlood-sys">
          <div> TC</div>
          <div class="sub">-</div>
          <div class="evaBlood-range"> 
            <mt-range v-model="rangevaTc" :min="1" :max="20">
            </mt-range>
          </div>
          <div class="add">+</div>
          <div class="evaBlood-count">{{rangevaTc}}</div>
        </div> -->
        <div class="evaBlood-sys">
          <div><span>TC</span><span>总胆固醇</span></div>
          <div class="sub" @click="handleSubTc">-</div>
          <div class="evaBlood-range"> 
             <range-slider
                class="slider"
                min="1"
                max="15"
                step="0.01"
                v-model="fatParams.dodLatelyTcMm">
            </range-slider>
          </div>
          <div class="add" @click="handleAddTc">+</div>
          <div class="evaBlood-count">{{fatParams.dodLatelyTcMm.toFixed(2)}}</div>
        </div>
        <!--LDL-C-->
        <div class="evaBlood-dia">
          <div><span>LDL-C</span><span>低密度脂蛋白胆固醇</span></div>
          <div class="sub" @click="handleSubLdlc">-</div>
          <div class="evaBlood-range"> 
            <!-- <mt-range v-model="rangevaLDL" :min="0" :max="15" @input="inputEvent()" @change="changeEvent2()" :step="0.1">
            </mt-range> -->
             <range-slider
                class="slider"
                min="0"
                max="15"
                step="0.01"
                v-model="fatParams.dodLatelyLdlCMm">
            </range-slider>
          </div>
          <div class="add" @click="handleAddLdlc">+</div>
          <div class="evaBlood-count">{{fatParams.dodLatelyLdlCMm.toFixed(2)}}</div>
        </div>
        <!--HDL-->
        <div class="evaBlood-heart">
          <div><span>HDL-C</span><span>高密度脂蛋白胆固醇</span></div>
          <div class="sub" @click="handleSubHdl">-</div>
          <div class="evaBlood-range"> 
            <!-- <mt-range v-model="rangevaHDL" @input="inputEvent()" @change="changeEvent3()">
            </mt-range> -->
             <range-slider
                class="slider"
                min="0.5"
                max="2"
                step="0.01"
                v-model="fatParams.dodLatelyHdlCMm">
            </range-slider>
          </div>
          <div class="add" @click="handleAddHdl">+</div>
          <div class="evaBlood-count">{{fatParams.dodLatelyHdlCMm.toFixed(2)}}</div>
        </div>
        <!--TG-->
         <div class="evaBlood-heart">
          <div><span>TG</span><span>甘油三酯</span></div>
          <div class="sub" @click="handleSubTg">-</div>
          <div class="evaBlood-range"> 
            <!-- <mt-range v-model="rangevaTG" @input="inputEvent()" @change="changeEvent4()">
            </mt-range> -->
             <range-slider
                class="slider"
                min="0"
                max="20"
                step="0.01"
                v-model="fatParams.dodLatelyTgMm">
            </range-slider>
          </div>
          <div class="add" @click="handleAddTg">+</div>
          <div class="evaBlood-count">{{fatParams.dodLatelyTgMm.toFixed(2)}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  props:["fatParams"],
  data() {
    return {
      radio: '',
      radios:[
        {
          label: '新诊断的血脂异常',
          value:'1',
          isChecked: false,
        },
        {
          label: '此前确诊的血脂异常患者',
          value:'2',
          isChecked: false,
        },
         {
          label: '未确诊血脂异常',
          value:'3',
          isChecked: false,
        },
      ]
    }
  },
  watch: {
    radio(newValue){
      if(newValue) {
        this.fatParams.dod = newValue
      }
    },
    sliderValue(newValue){
      if(newValue) {
        console.log(newValue.toFixed(2))
      }
    }
  },
  methods: {
    //tc
    handleAddTc(){
      this.fatParams.dodLatelyTcMm+=0.01
      if(this.fatParams.dodLatelyTcMm > 15) {
         this.fatParams.dodLatelyTcMm = 15
      }
    },
    handleSubTc(){
      this.fatParams.dodLatelyTcMm-=0.01
      if(this.fatParams.dodLatelyTcMm < 1) {
         this.fatParams.dodLatelyTcMm = 1
      }
    },
    //LDL-C
    handleAddLdlc(){
      this.fatParams.dodLatelyLdlCMm+=0.01
      if(this.fatParams.dodLatelyLdlCMm > 15) {
         this.fatParams.dodLatelyLdlCMm = 15
      }
    },
    handleSubLdlc(){
      this.fatParams.dodLatelyLdlCMm-=0.01
      if(this.fatParams.dodLatelyLdlCMm < 0) {
         this.fatParams.dodLatelyLdlCMm = 0
      }
    },
    // HDL-C
    handleAddHdl(){
      this.fatParams.dodLatelyHdlCMm+=0.01
      if(this.fatParams.dodLatelyHdlCMm > 2) {
         this.fatParams.dodLatelyHdlCMm = 2
      }
    },
    handleSubHdl(){
      this.fatParams.dodLatelyHdlCMm-=0.01
      if(this.fatParams.dodLatelyHdlCMm < 0.5) {
         this.fatParams.dodLatelyHdlCMm = 0.5
      }
    },
    // HDL-C
    handleAddHdl(){
      this.fatParams.dodLatelyHdlCMm+=0.01
      if(this.fatParams.dodLatelyHdlCMm > 2) {
         this.fatParams.dodLatelyHdlCMm = 2
      }
    },
    handleSubHdl(){
      this.fatParams.dodLatelyHdlCMm-=0.01
      if(this.fatParams.dodLatelyHdlCMm < 0.5) {
         this.fatParams.dodLatelyHdlCMm = 0.5
      }
    },
    //Tg
    handleAddTg(){
       this.fatParams.dodLatelyTgMm+=0.01
      if(this.fatParams.dodLatelyTgMm > 20) {
         this.fatParams.dodLatelyTgMm = 20
      }
    },
    handleSubTg(){
      this.fatParams.dodLatelyTgMm-=0.01
      if(this.fatParams.dodLatelyTgMm < 0) {
         this.fatParams.dodLatelyTgMm = 0
      }
    },
    // 自定义radio
    check(index) {
      // 先取消所有选中项
      this.radios.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radios[index].value;
      // 设置值，以供传递
      this.radios[index].isChecked = true;
    }
  },
  components:{
    RangeSlider
  }
}
</script>

<style lang="scss">
/*高血压*/
.evaBlood-hyper{
  width:95%;
  padding: 40px 0px;
  margin-top:40px;
  background: #C5E6DF;
  border-radius: 30px;
  position: relative;
  border:1px solid #035832;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .evaBlood-hyperTitle{
    height:50px;
    padding: 5px 20px;
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
  /*选择框*/
  .evaBlood-classify{
    width:95%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
      border-radius: 50%;
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
  .evaBlood-recently{
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
  .evaBlood-hyperRange{
    width:95%;
    height:350px;
    border-radius: 30px;
    background: #E9F5F1;
    margin-top:40px;
   /* border:1px solid #0f0;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .evaBlood-sys {
      width:95%;
      height:90px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 25%;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .evaBlood-range {
        flex:1;
      }
      .slider{
        width:100%;
      }
      .evaBlood-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        margin:5px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
    /*----*/
    .evaBlood-dia {
      width:95%;
      height:90px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 25%;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .evaBlood-range {
        flex:1;
      }
      .slider{
        width:100%;
      }
      .evaBlood-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        margin:5px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
     /*----*/
    .evaBlood-heart {
      width:95%;
      height:90px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 25%;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .evaBlood-range {
        flex:1;
      }
      .slider{
        width:100%;
      }
      .evaBlood-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        margin:5px;
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
}
</style>
