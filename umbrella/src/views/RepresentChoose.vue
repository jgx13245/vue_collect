<template>
<!--代表选择组别医院-->
  <div class="choose-wrap">
    <div class="choose-message">
      <ul>
        <li class="qing">请填写您的个人信息</li>
        <!--选择组别-->
        <li class="choose_group" @click="handleGroupPopup">
          <span>组别:</span>
          <span>{{groupSure1}}</span>
          <span></span>
        </li>
        <mt-popup v-model="groupPopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="select-month">
              <span class="beautiful" @click="groupCanclePopup">取消</span><span class="beautiful">请选择组别</span><span class="beautiful" @click="groupAddValue">确定</span>
            </div>
            <mt-picker :slots="groupSlots" @change="groupChange"></mt-picker>
        </mt-popup>
         <!--选择省份-->
        <li class="choose_province" @click="handleProvincePopup">
          <span>省份:</span>
          <span>{{province}}</span>
          <span></span>
        </li>
        <mt-popup v-model="provincePopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="select-month">
              <span class="beautiful" @click="provinceCanclePopup">取消</span><span class="beautiful">请选择省份</span><span class="beautiful" @click="provinceAddValue">确定</span>
            </div>
            <mt-picker :slots="provinceSlots" @change="provinceChange"></mt-picker>
        </mt-popup>
        <!--选择城市-->
        <li class="choose_city" @click="handleCityPopup">
          <span>城市:</span>
          <span>{{city}}</span>
          <span></span>
        </li>
         <mt-popup v-model="cityPopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="select-month">
              <span class="beautiful" @click="cityCanclePopup">取消</span><span class="beautiful">请选择城市</span><span class="beautiful" @click="cityAddValue">确定</span>
            </div>
            <mt-picker :slots="citySlots" @change="cityChange"></mt-picker>
        </mt-popup>
        <!--医院-->
        <li class="choose_hos" @click="handleHosPopup">
          <span>医院:</span>
          <span>{{hos}}</span>
          <span></span>
        </li>
        <mt-popup v-model="hosPopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="select-month">
              <span class="beautiful" @click="hosCanclePopup">取消</span><span class="beautiful">请选择医院</span><span class="beautiful" @click="hosAddValue">确定</span>
            </div>
            <mt-picker :slots="hosSlots" @change="hosChange"></mt-picker>
        </mt-popup>
        <!--姓名-->
        <li class="choose_name">
          <span>姓名:</span>
          <input
              type="tel"
              maxlength="11"
              class="choose_input"
              v-model="name"
              v-autoAdjust
            >
        </li>
        <!--科室-->
        <li class="choose_office" @click="handleOfficePopup">
          <span>科室:</span>
          <span>{{office}}</span>
          <span></span>
        </li>
        <mt-popup v-model="officePopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="select-month">
              <span class="beautiful" @click="officeCanclePopup">取消</span><span class="beautiful">请选择科室</span><span class="beautiful" @click="officeAddValue">确定</span>
            </div>
            <mt-picker :slots="officeSlots" @change="officeChange"></mt-picker>
        </mt-popup>
        <!--职称-->
        <li class="choose_titles" @click="handleTitlePopup">
          <span>职称:</span>
          <span>{{title}}</span>
          <span></span>
        </li>
        <mt-popup v-model="titlePopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="select-month">
              <span class="beautiful" @click="titleCanclePopup">取消</span><span class="beautiful">请选择职称</span><span class="beautiful" @click="titleAddValue">确定</span>
            </div>
            <mt-picker :slots="titleSlots" @change="titleChange"></mt-picker>
        </mt-popup>
        <!--医生手机号-->
        <li class="choose_phone">
          <span>手机号:</span>
          <input
              type="tel"
              maxlength="11"
              class="choose_phoneNum"
              placeholder="请务必填写正确"
              v-model="phone"
              v-autoAdjust
            >
        </li>
        <li class="btn" @click="handleSubChoose">
          提交
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fixWXInput } from "../assets/js/util.js";
import { fetchProvince, fetchCity, fetchHos, fetchDept, fetchSubmitDoctor, fetchTitles } from "../assets/js/apiRepresent.js";

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
      name:'',
      phone:'',
      // 组别
      group:'',
      groupSure:'',
      groupSure1:'',
      groupPopupVisible: false,
      groupSlots: [
        {
          values: []
        }
      ],
       // 省份
      province:'',
      provinceSure:'',
      provincePopupVisible: false,
      provinceSlots: [
        {
          values: []
        }
      ],
      // 城市
      city:'',
      citySure:'',
      cityPopupVisible: false,
      citySlots: [
        {
          values: []
        }
      ],
      // 医院
      hos:'',
      hosSure:'',
      hosPopupVisible: false,
      hosSlots: [
        {
          values: []
        }
      ],
      // 科室
      office:'',
      officeSure:'',
      officePopupVisible: false,
      officeSlots: [
        {
          values: []
        }
      ],
      // 职称
      title:'',
      titleSure:'',
      titlePopupVisible: false,
      titleSlots: [
        {
          values: []
        }
      ],
    };
  },
  methods: {
    // 选择组别
    handleGroupPopup() {
      this.groupPopupVisible = true
      this.groupSlots[0].values =  ['血脂','血压','血脂加血压']
    },
    groupCanclePopup(){
      this.groupPopupVisible = false
    },
    groupAddValue() {
      if(this.groupSure == '血压'){
        this.group = '1'
        this.groupSure1 = this.groupSure
      }
      if(this.groupSure == '血脂'){
        this.group = '2'
        this.groupSure1 = this.groupSure
      }
      if(this.groupSure == '血脂加血压'){
        this.group = '1，2'
        this.groupSure1 = this.groupSure
      }
      this.groupPopupVisible = false;
    },
    groupChange(picker, values) {
      this.groupSure = values[0]
    },
    //选择省份
    handleProvincePopup() {
      this.provincePopupVisible = true
      this.getProvince()  
    },
    provinceCanclePopup(){
      this.provincePopupVisible = false
    },
    provinceAddValue() {
      this.province = this.provinceSure
      //调用城市接口
      this.getCity(this.province)
      this.provincePopupVisible = false;
    },
    provinceChange(picker, values) {
      this.provinceSure = values[0]
    },
    //选择城市
    handleCityPopup() {
      if(this.province === '') {
        this.$toast('请先选择省份')
        return false
      }else{
        this.cityPopupVisible = true 
      }
    },
    cityCanclePopup(){
      this.cityPopupVisible = false
    },
    cityAddValue() {
      this.city = this.citySure
       //调用医院接口
      this.getHospital(this.province, this.city)
      this.cityPopupVisible = false;
    },
    cityChange(picker, values) {
      this.citySure = values[0]
    },
     //选择医院
    handleHosPopup() {
       if(this.province === '') {
        this.$toast('请先选择省份')
        return false
      }else if(this.city === ''){
        this.$toast('请先选择城市')
        return false
      }else{
        this.hosPopupVisible = true
      }
    },
    hosCanclePopup(){
      this.hosPopupVisible = false
    },
    hosAddValue() {
      this.hos = this.hosSure
      this.hosPopupVisible = false;
    },
    hosChange(picker, values) {
      this.hosSure = values[0]
    },
    //选择科室
    handleOfficePopup() {
      this.officePopupVisible = true
      this.getDept()
    },
    officeCanclePopup(){
      this.officePopupVisible = false
    },
    officeAddValue() {
      this.office = this.officeSure 
      this.officePopupVisible = false;
    },
    officeChange(picker, values) {
      this.officeSure = values[0]
    },
    //选择职称
    handleTitlePopup() {
      this.titlePopupVisible = true
      this.getTitle()
    },
    titleCanclePopup(){
      this.titlePopupVisible = false
    },
    titleAddValue() {
      this.title = this.titleSure
      this.titlePopupVisible = false;
    },
    titleChange(picker, values) {
      this.titleSure = values[0]
    },
    // 提交
    handleSubChoose() {
      const messageArray = [this.group, this.province, this.city, this.hos, this.name, this.office, this.title, this.phone,]  // 每个input的字段值
      const message = ['组别不能为空', '省份不能为空', '城市不能为空' , '医院能为空', '姓名不能为空', '科室不能为空', '职称不能为空', '手机号不能为空']     // 自己手动这设置的文案
      for (let i = 0, max = messageArray.length; i < max; i++) {  // 循环对比是否为空
        if (messageArray[i] == '') {
          this.$toast(message[i])   // 为空跳出文案
          return false   // 方法中断执行
        }
      }
      const params = {
        name: this.name,
        province: this.province,
        city: this.city,
        hospital: this.hos,
        groups: this.group,
        dept: this.office,
        titles: this.title,
        phone: this.phone,
      }
      this.submitChoose(params.name, params.province, params.city, params.hospital, params.groups, params.dept, params.titles, params.phone)
    },
    // 获取省份接口
    async getProvince() {
      const res = await fetchProvince()
      console.log(res)
      this.provinceSlots[0].values = res.data
    },
    // 获取城市接口
    async getCity(province) {
      const res = await fetchCity({province})
      this.citySlots[0].values = res.data
    },
    // 获取医院接口
    async getHospital(province, city) {
      const res = await fetchHos({province, city})
      this.hosSlots[0].values = res.data
    },
    // 获取科室
    async getDept() {
      const res = await fetchDept()
      this.officeSlots[0].values = res.data
    },
    // 获取职称
    async getTitle() {
      const res = await fetchTitles()
      this.titleSlots[0].values = res.data
    },
    // 提交
    async submitChoose(name, province, city, hospital, groups, dept, phone) {
      console.log(name, province, city, hospital, groups, dept, phone)
      const res =  await fetchSubmitDoctor({ name, province, city, hospital, groups, dept, phone })
      console.log(res)
      if(res.data.code == 200) {
        this.$toast('提交成功')
        this.$router.push({path:'./representSubDocName'})
      }
    }
  },
  mounted() {
    // this.getProvince()  
    // this.getDept()
    // this.getTitle()
  }
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.choose-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  padding-top:350px; 
  // padding-bottom:50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .choose-message {
    width: 90%;
    height:60%;
    border-radius: 20px;
    margin-bottom:7%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      li {
        width: 90%;
        height: 60px;
        padding-right: 20px;
        margin-top:10px;
        border: 1px solid #035732;
        border-radius: 10px;
         >span:nth-child(1){
          width: 30%;
          color:#035732;
          text-align:left;
          padding-left: 10px;
        }
        >span:nth-child(2){
          flex: 1;
        }
        >span:nth-child(3){
          display: block;
          width: 10%;
          height: 40px;
          background: url("../assets/images/right.png") no-repeat;
          background-size: 30% 80%;
          background-position: 50% 50%;
          text-align:center;
          -moz-transform:rotate(90deg); 
          -webkit-transform:rotate(90deg);
          transform:rotate(90deg);
          filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);
        }
      }
      // 组别。。。。。。
      .choose_group, .choose_province,.choose_city, .choose_hos, .choose_office, .choose_titles {
        height: 60px;
        display: flex;
        background: #EDF2EE;
        justify-content: space-around;
        border-radius: 10px;
        align-items: center;
        >span:nth-child(1){
          width: 30%;
          text-align: left;
          color:#035732;
          padding-left: 10px;
        }
        >span:nth-child(2){
          flex: 1;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        >span:nth-child(3){
          display: block;
          width: 10%;
          height: 40px;
          background: url("../assets/images/right.png") no-repeat;
          background-size: 30% 80%;
          background-position: 50% 50%;
          text-align:center;
          -moz-transform:rotate(90deg); 
          -webkit-transform:rotate(90deg);
          transform:rotate(90deg);
          filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1)
        }
      }
      .qing{
        height: 60px;
        border:none;
        color:#326F51;
        display: flex;
        justify-content: space-around;
        border-radius: 10px;
        align-items: center;
      }
      // name
       .choose_name, .choose_phone {
        height: 60px;
        display: flex;
        background:#EDF2EE;
        justify-content: flex-start;
        border-radius: 10px;
        align-items: center;
        >span{
          width: 30%;
          color:#035732;
          padding-left: 10px;
          text-align:left;
        }
        .choose_input, .choose_phoneNum {
          background:#EDF2EE;
          display: block;
          flex:1;
          height: 100%;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
      }
      // 提交
      .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;
        background: #035732;
      }
    }
  }
}
.beautiful {
  width: 33.33%;
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
  font-weight: bold;
  color: #035732;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-month{
  width:100%;
  height:80px;
  border:1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


