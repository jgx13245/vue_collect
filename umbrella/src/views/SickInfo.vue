<template>
  <div class="sickInfo-wrap">
    <div class="sickInfo-list">
      <ul>
        <li class="sickInfoFiled">
          <span>姓名:</span>
          <input
              type="text"
              maxlength="11"
              class="choose_input"
              placeholder=""
              v-model="fileds.caseName"
              v-autoAdjust
            >
        </li>
        <li class="sickInfoFiled">
          <span>性别:</span>
            <!-- <label ><input name="sex" type="radio" value="" /> 男</label>
            <div style="margin-left: 40px"></div>
            <label><input name="sex" type="radio" value="" />女 </label> -->
          <!-- <span>是否接受电话采访:</span> -->
          <div class="radio-box" v-for="(item,index) in radiosex" :key="item.id">
            <span class="radio" :class="{'on':item.isChecked}"></span>
            <input v-model="fileds.sex" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="checksex(index)" type="radio">{{item.label}}
          </div>
        </li>
        <li class="sickInfoFiled">
          <span>出生:</span>
          <input
              type="date"
              maxlength="11"
              placeholder=""
              class="choose_input"
              v-model="fileds.birthYear"   
              v-autoAdjust
            >
        </li>
        <li class="sickInfoFiled">
          <span>身高:</span>
          <input
              type="number"
              maxlength="11"
              placeholder=""
              class="choose_input"
              v-model="fileds.height"
              v-autoAdjust
              :compositionend="bmi()"
            >
          <span style="width:10%;">cm</span>
        </li>
        <li class="sickInfoFiled">
          <span>体重:</span>
          <input
              type="number"
              maxlength="11"
              placeholder=""
              class="choose_input"
              v-model="fileds.weight"
              v-autoAdjust
              :oninput="bmi()"
            >
            <span style="width:10%;">kg</span>
        </li>
        <li class="sickInfoFiled">
          <span>体重指数:</span>
          <input
              type="number"
              maxlength="11"
              placeholder=""
              class="choose_input"
              v-model="fileds.bmi"
              v-autoAdjust
              disabled = true
            >
            <span style="width:10%;">kg/m2</span>
        </li>
        <li class="sickInfoFiled">
          <span>电话号码:</span>
          <input
              type="tel"
              maxlength="11"
              placeholder=""
              class="choose_input"
              v-model="fileds.phone1"
              v-autoAdjust
            >
        </li>
        <li class="sickInfoFiled">
          <span>是否接受电话采访:</span>
          <div class="radio-box" v-for="(item,index) in radios" :key="item.id">
            <span class="radio" :class="{'on':item.isChecked}"></span>
            <input v-model="fileds.whetherFollowUp" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index)" type="radio">{{item.label}}
          </div>
        </li>
        <div style="width:90%; color:#9FA0A0; font-size:10px; padding-top:3px;">仅用于健康管理</div>
        <li class="sicksub" @click="disabled">
         <button @click="handleSubSickInfo" :disabled="disabled" ref="btn">提交</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fixWXInput } from "../assets/js/util.js";
import { checkMobile } from "../assets/js/util.js";
import { fetchSickBaseinfo } from '../assets/js/api'
import { mapState } from 'vuex'

export default {
  directives: {
    autoAdjust: {
      bind(el) {
        el.addEventListener("blur", fixWXInput, false);
      },
      unbind(el) {
        el.removeEventListener("blur", fixWXInput, false);
      }
    }
  },
  data() {
    return { 
	  disabled:true,
      fileds:{
        caseName: '',
        sex: '',
        birthYear: '',
        height: null,
        weight: null,
        bmi: null,
        phone1: '',
        whetherFollowUp: '',
      },
      radios:[
        {
          label: '是',
          value:'1',
          isChecked: false,
        },
        {
          label: '否',
          value:'2',
          isChecked: false,
        }],
      radiosex:[
        {
          label: '男',
          value:'1',
          isChecked: false,
        },
        {
          label: '女',
          value:'2',
          isChecked: false,
        }]
    }
  },
  mounted() {
	this.fetchSickBaseInfo();
  },
  computed:{
    ...mapState(["caseId"])
  },
  methods: {
      bmi(){
          if(this.fileds.weight==null||this.fileds.height==null||this.fileds.weight==""||this.fileds.height==""){
              // console.log("无法计算bmi");
              this.fileds.bmi = null;
          }else {
              // console.log("bmi = "+(this.fileds.weight/Math.pow(this.fileds.height/100,2)).toFixed(2));
              this.fileds.bmi = (this.fileds.weight/Math.pow(this.fileds.height/100,2)).toFixed(2);
          }
      },
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
    checksex(index) {
      // 先取消所有选中项
      this.radiosex.forEach((item) => {
        item.isChecked = false;
      });
      //再设置当前点击项选中
      this.radio = this.radiosex[index].value;
      // 设置值，以供传递
      this.radiosex[index].isChecked = true;
    },
    // 提交患者信息
    handleSubSickInfo(){
      const { caseName, sex, birthYear, phone1,height,weight}  = this.fileds
      if(!caseName) {
        this.$toast('请填写姓名')
        return 
      }
      if(!sex) {
        this.$toast('请填写性别')
        return 
      }
      if(!birthYear) {
        this.$toast('请填写出生日期')
        return 
      }
	  if(!height||height==='0') {
	    this.$toast('请填写身高')
	    return 
	  }
	  if(!weight||weight==='0') {
	    this.$toast('请填写体重')
	    return 
	  }
  //     if(!checkMobile(phone1)) {
  //       this.$toast('请填写正确手机号')
		// return 
  //     }
      const openId = localStorage.getItem('sickOpenId')
      const params = this.fileds
      this.getSickInfo( this.caseId, openId, params.caseName, params.sex, params.birthYear.slice(0,4),params.weight, params.height, params.bmi, params.phone1, params.whetherFollowUp)
    },
    async getSickInfo(id, openId, caseName, sex, birthYear,weight, height, bmi, phone1, whetherFollowUp){
      // const res = await fetchSickInfoSave({id, openId, caseName, sex, birthYear,weight, height, bmi, phone1, whetherFollowUp})
      // console.log(res)
      // if(res.data.success === true) {
      //   this.$router.push({name: 'sickAgree', params: { fields: this.fileds }})
      // }
	   this.$router.push({name: 'sickAgree', params: { fields: this.fileds }})
    },
	async fetchSickBaseInfo(){
		const res = await fetchSickBaseinfo({})
		if(res.data.success==true){
			// this.$toast("患者个人信息获取成功");

			this.disabled =false;
			// if(res.data.obj.caseName!=undefined){
			// 	this.disabled = true;
			// 	this.$refs.btn.style.background = 'gray'
			// }else{	
			// 	this.disabled = false;
			// }
			
			console.log(res.data);
			this.fileds = res.data.obj;
		
			// 先取消所有选中项
			this.radiosex.forEach((item) => {
			  item.isChecked = false;
			});
			//再设置当前点击项选中
			this.radio = this.radiosex[res.data.obj.sex-1].value;
			// 设置值，以供传递
			this.radiosex[res.data.obj.sex-1].isChecked = true;
			
			
			// 先取消所有选中项
			this.radios.forEach((item) => {
			  item.isChecked = false;
			});
			//再设置当前点击项选中
			this.radio = this.radios[res.data.obj.whetherFollowUp-1].value;
			// 设置值，以供传递
			this.radios[res.data.obj.whetherFollowUp-1].isChecked = true;
			
		}
		
	}
  }
}
</script>

<style lang="scss">
.sickInfo-wrap{
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 300px;
}
.sickInfo-list{
  width:100%;
  height:50%;
  /*margin-bottom: 10%;*/
    margin-top: 50px;
  ul{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    li{
      width: 90%;
      height: 50px;
      background: #E7F5F0;
      margin-top:30px;
      padding-right: 20px;
      border-radius: 10px;
    }
    .sicksub{
      display: flex;
      background: none;
      justify-content: flex-end;
      align-items: center;
      border:none;
      margin-bottom:15px;
      >button{
        width:30%;
        height: 50px;
        background: #035732;
        color:#fff;
        text-align: center;
        border-radius: 20px;
		border: none;
      }
    }
  }
}
.sickInfoFiled {
  height: 60px;
  display: flex;
  background: #E7F5F0;
  justify-content: flex-start;
  border-radius: 10px;
  align-items: center;
  >span{
    width: 35%;
    color:#035732;
    font-size:20px;
    text-align:left;
    padding-left:10px;
  }
  .choose_input {
    background: #E7F5F0;
    display: block;
    flex:1;
    height: 45px;
    border: none;
    outline: none;
    color: #333;
    -webkit-appearance: none;
    //  border:1px solid #0f0;
  }
  .radio-box{
    width: 100%;
    flex:1;
    position: relative;
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