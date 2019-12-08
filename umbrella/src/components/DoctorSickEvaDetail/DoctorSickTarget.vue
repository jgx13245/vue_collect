<template>
    <div class="evaTarget-hyper">
      <div class="evaTarget-hyperTitle">5.靶器官损坏（可多选）</div>
      <div class="evaTarget-reason">
        <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="targetParams.tod" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div>
      <div class="evaTarget-classify">
        <mt-checklist
        v-model="targetParams.todIf"
        :options="options">
      </mt-checklist>
      </div>
      <!-- <div class="evaTarget-reason">
        靶器官损坏
        <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="targetParams.tod" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div> -->
    </div>
</template>

<script>
export default {
  props:["targetParams"],
  data() {
    return {
      radio: '',
      radios:[
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
      options:[
        {
          label: '左心室肥厚（心电图：Sokolaw-Lyon电压>308Mv或Conmell乘积>224mv-ms;超声心电图，VML;男>=115g/m2,女>=95g/m2）',
          value: '1'
        },
        {
          label: '颈动脉超声异常（颈动脉超声IMT>=0.9mm或动脉粥样斑块）',
          value: '2'
        }, 
        {
          label: '颈-股动脉脉搏速度异常（>=12m/s）',
          value: '3'
        },
        {
          label: '踝/肱血压指数异常（<0.9）',
          value: '4'
        }, 
        {
          label: 'eGFR降低（30-59ml/min 1.73 m2）',
          value: '5'
        },
        {
          label: '血清肌酐轻度升高（男性 115-133mmpol/L或1.3-1.5mg/dl,女性 107-124mmpol/L或1.2-1.4mg/dl）',
          value: '6'
        },
        {
          label: '微量血蛋白尿（30-300mg/24h或白蛋白/肌酐比>=30mg/g(3.5mg/mmol)）',
          value: '7'
        }],
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
    }
  },
  watch:{
    targetParams:{
      handler(val) {
        if(val.tod == 1) {
          this.radios[0].isChecked  = true
        }
        if(val.tod == 2) {
          this.radios[1].isChecked  = true
        }
      },
    immediate: true,
    deep:true
    }
  }
}
</script>>

<style lang="scss">
/*高血压*/
.evaTarget-hyper{
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
  .evaTarget-hyperTitle{
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
}
/*多选*/
.evaTarget-classify{
  width: 95%;
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
/*因素*/ 
.evaTarget-reason{
  width:95%;
  height:80px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  font-size:24px;
  .radio-box{
    display: inline-block;
    position: relative;
    height: 25px;
    line-height: 25px;
    margin-left:40px;
  }
  .radio {
    display: inline-block;
    width: 30px;
    height: 30px;
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
</style>
