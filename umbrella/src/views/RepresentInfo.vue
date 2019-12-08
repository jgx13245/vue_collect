<template>
  <div class="representInfo-wrap">
    <div class="representInfo-cotent">
      <ul class="representInfo-ul">
        <li>
          <div>医生姓名</div>
          <div><input type="text" placeholder="请填写" v-model="filed.name"></div>
        </li>
        <li>
          <div>医生手机号</div>
          <div><input type="text" placeholder="请填写" v-model="filed.phone"></div>
        </li>
        <li>
          <div>讲课题目</div>
          <div><input type="text" placeholder="请填写" v-model="filed.task"></div>
        </li>
        <li @click="handleTimePicker">
          <div>录制时间</div>
          <div><input type="text" placeholder="请填写" v-model="filed.recordDate"></div>
        </li>
        <mt-datetime-picker
          v-model="pickerVisible"
          ref="picker"
          type="date"
          @confirm="changeTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日">
        </mt-datetime-picker>
        <!-- <li class="representInfo-photo">
          <div class="representInfo-title">上传照片</div>
          <a href="javascript:;" class="representInfo-upload">上传照片
            <input type="file" accept="image/*" class="up-photo">
          </a>
        </li> -->
        <li @click="handleTimeTumPopup">
          <div>时间段</div>
          <div><input type="text" placeholder="请填写" v-model="filed.timer"></div>
        </li>
        <mt-popup v-model="timeTumPopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
            <div class="selectTime">
              <span class="beautiful" @click="TimeTumCanclePopup">取消</span><span class="beautiful">请选择时间段</span><span class="beautiful" @click="TimeTumAddValue">确定</span>
            </div>
            <mt-picker :slots="TimeTumSlots" @change="TimeTumChange"></mt-picker>
        </mt-popup>
        <li>
          <div>申请人姓名</div>
          <div><input type="text" placeholder="请填写" v-model="filed.applicantName"></div>
        </li>
        <li class="representInfo-email">
          <div>申请人邮箱</div>
          <div><input type="text" placeholder="请填写" v-model="filed.applicantEmail"></div>
          <!-- <div class="tip">(协会将会在5个工作日之内发送海报到你的邮箱内)</div> -->
        </li>
        <li>
          <div>申请人手机号</div>
          <div><input type="text" placeholder="请填写" v-model="filed.applicantPhone"></div>
        </li>
        <li class="representInfo-submit"><span class="representInfo-btn" @click="handleSubmitInfo">提交</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { checkMobile,fixWXInput } from "../assets/js/util.js"
import { fetchVideo, fetchTimeQuantum } from "../assets/js/apiRepresent.js"

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
      filed:{
        name: '',
        phone: '',
        task: '',
        timer: '',
        recordDate: '',
        applicantName: '',
        applicantEmail: '',
        applicantPhone: '',
      },
      pickerVisible:'',
      TimeTumSlots: [
        {
          values: []
        }
      ],
      timeTumPopupVisible: false
    }
  },
  methods:{
    changeTime() {
      this.filed.recordDate =this.$moment(this.pickerVisible).format('YYYY-MM-DD')
    },
    // 时间选择弹出按钮
    handleTimePicker() {
      this.$refs.picker.open();
    },
    // 时间选择
    handleTimeTumPopup() {
      this.timeTumPopupVisible = true
    },
    TimeTumCanclePopup(){
      this.timeTumPopupVisible = false
    },
    TimeTumAddValue() {
      this.timeTumPopupVisible = false;
    },
    TimeTumChange(picker, values) {
      this.filed.timer = values[0]
    },
    // 提交
    handleSubmitInfo() {
      // 验证不能为空
      const messageArray = [this.filed.docName, this.filed.docPhone, this.filed.Class, this.filed.videoTime, this.filed.timer, this.filed.applyName, this.filed.applyEmail, this.filed.applyPhone]  // 每个input的字段值
      const message = ['医生姓名不能为空', '医生手机号不能为空', '讲课题目不能为空' , '录制时间不能为空', '录制时间段不能为空', '申请人姓名不能为空', '申请人邮箱不能为空', '申请人手机号不能为空']     // 自己手动这设置的文案
      for (let i = 0, max = messageArray.length; i < max; i++) {  // 循环对比是否为空
        if (messageArray[i] == '') {
          this.$toast(message[i])   // 为空跳出文案
          return false   // 方法中断执行
        }
      }
      // 验证手机号格式
      if (!checkMobile(this.filed.phone)) {
        this.$toast("医生手机号不正确");
        return false;
      }
      if (!checkMobile(this.filed.applicantPhone)) {
        this.$toast("申请人手机号不正确");
        return false;
      }
      const fileds = this.filed
      this.getRepresentInfo(fileds.name, fileds.phone, fileds.task, fileds.recordDate, fileds.timer, fileds.applicantName, fileds.applicantEmail, fileds.applicantPhone)
    },
    async getRepresentInfo(name, phone, task, recordDate, timer, applicantName, applicantEmail, applicantPhone) {
      const res = await fetchVideo({name, phone, task, recordDate, timer, applicantName, applicantEmail, applicantPhone})
      if(res.data.code === -1) {
        this.$toast(res.data.message)
        return
      }else{
        this.$router.push({
        name: `representGetUrl`,
        params: {
          url:res.data
        }
      })
      }
    },
    //获取时间段
    async getTimeQuanTum() {
      const res = await fetchTimeQuantum()
      this.TimeTumSlots[0].values = res.data
    }
  },
  mounted() {
    this.getTimeQuanTum()
  }
}

</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.representInfo-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.representInfo-cotent {
  width: 95%;
  height: 800px;
  margin-top:350px;
  background: #fff;
  border-radius: 20px;
}
.representInfo-ul{
  width: 100%;
  height:800px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  >li {
    width: 90%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    >div:nth-child(1) {
      width: 35%;
    }
    >div:nth-child(2) {
      height: 70px;
      flex:1;
      padding:0 10px;
      border-bottom: 1px solid #ccc;
      // border:1px solid #0f0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input{
      outline: none;
      border: none;
    }
  }
  // 上传照片
  .representInfo-photo {
        border-radius: 0;
        border:none;
        display: flex;
        justify-content:space-between;
        align-items: center;
        .representInfo-upload{
          width:20%;
          height: 50px;
          border-radius: 20px;
          font-size:18px;
          display: block;
          position: relative;
          text-decoration: none;
          color: #fff;
          background:#035732;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .up-photo{
          width:100%;
          height: 70px;
          position: absolute;
          overflow: hidden;
          left: 0;
          top: 0;
          opacity: 0;
          border:1px solid #00f;
        }
      }  
  // 邮箱
  .representInfo-email{
    height: 140px;
    position: relative;
    .tip{
      font-size: 6px;
      color: #ccc;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  // 提交
  .representInfo-submit{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .representInfo-btn{
      background: #035732;
      color:#fff;
      border-radius: 10px;
      padding: 10px 30px;
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
.selectTime{
  width:100%;
  height:80px;
  border:1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


