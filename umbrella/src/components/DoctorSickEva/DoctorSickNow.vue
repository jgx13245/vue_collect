<template>
    <div class="evaNow">
      <div class="evaNowTitle">7.目前可治疗方案（可多选）</div>
      <div class="evaHeartNow-classify">
        <div style="background:#fff; border-radius:10px;padding:5px;">降压治疗方案</div>
        <mt-checklist
        v-model="nowParams.antiHnt"
        :options="optionsDown">
      </mt-checklist>
       <div  style="background:#fff; border-radius:10px;padding:5px;">他汀调脂治疗方案</div>
        <mt-checklist
        v-model="nowParams.lla"
        :options="optionsHim">
      </mt-checklist>
      </div>
    </div>
</template>

<script>
export default {
  props:["nowParams"],
  data() {
    return {
      optionsDown:[
        {
          label: 'ACEI类药物',
          value: '1'
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
          value: '4'
        }, 
        {
          label: 'β阻滞剂类药物',
          value: '5'
        },
        {
          label: '其他类药物',
          value: '6'
        }],
        optionsHim: [
        {
          label: '阿托伐他汀40-80mg',
          value: '1'
        },
        {
          label: '瑞舒伐他汀20mg',
          value: '2'
        }, 
        {
          label: '阿托伐他汀10-20mg',
          value: '3'
        },
        {
          label: '瑞舒伐他汀5-10mg',
          value: '4'
        }, 
        {
          label: '氯伐他汀80mg',
          value: '5'
        },
        {
          label: '洛伐他汀40mg',
          value: '6'
        },
        {
          label: '匹伐他汀2-4mg',
          value: '7'
        }, 
        {
          label: '普伐他汀40mg',
          value: '8'
        },
        {
          label: '辛伐他汀20-40mg',
          value: '9'
        }, 
        {
          label: '血脂康1.2g',
          value: '10'
        },
        {
          label: '其他',
          value: '11'
        }],
    }
  },
  methods: {
    
  }
}
</script>>

<style lang="scss">
/*高血压*/
.evaNow{
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
  .evaNowTitle{
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
.evaHeartNow-classify{
  width: 95%;
  margin-top:40px;
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
.evaHeartNow-reason{
  width:95%;
  height:100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size:24px;
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
