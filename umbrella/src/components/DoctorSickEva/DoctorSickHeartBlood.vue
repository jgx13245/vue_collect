<template>
    <div class="evaHeartBlood-hyper">
      <div class="evaHeartBlood-hyperTitle">4.心血管危险因素（可多选）</div>
      <div class="evaHeartBlood-reason">
        <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
          <span class="radio" :class="{'on':item.isChecked}"></span>
          <input v-model="bloodParams.crfs" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
        </div>
      </div>
      <div class="evaHeartBlood-classify" v-if="change == 1">
        <mt-checklist
        v-model="value"
        :options="options">
      </mt-checklist>
      </div>
    </div>
</template>

<script>
export default {
  props:["bloodParams"],
  data() {
    return {
      change:'',
      value:[],
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
          label: '男性>55岁，女性>65岁',
          value: '1'
        },
        {
          label: '吸烟或者被动吸烟（连续活累计6个月以上）',
          value: '2'
        }, 
        {
          label: '糖耐量受损（2h血糖7.8-11.0mmol/L）和空腹血糖异常（6.1-6.9mmol/L）',
          value: '3'
        },
        {
          label: '血脂异常（TC>=5.2mm0l/L或者LDL-c>3.4mmol/L或-c<1.0mmol/L）',
          value: '4'
        }, 
        {
          label: '早发心血管病家族史（一级亲属发病年龄<50岁）',
          value: '5'
        },
        {
          label: '肥胖（BM>=28kg/m2）或腹型肥胖（腰围：男性>=90cm，女性>=85cm）',
          value: '6'
        },
        {
          label: '高同型半胱氨酸血症（>=15nmol/L）',
          value: '7'
        }]
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
    radio(newValue) {
      if(newValue == 2) {
        this.change = 2
        this.value = []
      }else{
        this.change = 1
      }
    }
  }
}
</script>>

<style lang="scss" >
/*高血压*/
.evaHeartBlood-hyper{
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
  .evaHeartBlood-hyperTitle{
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
.evaHeartBlood-classify{
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
.evaHeartBlood-reason{
  width:95%;
  height:80px;
  display: flex;
  margin-top:10px;
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
</style>
