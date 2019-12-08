<template>
  <div class="Loginwrap">
    <div class="messageLogin">
      <ul>
        <li>
          <div class="phone">
            <input
              type="tel"
              maxlength="11"
              placeholder="手机号"
              class="phoneNum"
              v-model="fileds.mobilePhone"
              v-autoAdjust
            >
          </div>
        </li>
        <li>
          <div class="phoneValidate">
            <div class="inputMessage">
              <input
                type="tel"
                maxlength="6"
                placeholder="验证码"
                class="message"
                v-model="fileds.validCode"
                v-autoAdjust
              >
            </div>
            <div class="code">
              <span v-if="getState ===0" @click="handleGetMess">获取验证码</span>
              <span v-if="getState ===1">{{countDown}}秒后重新发送</span>
            </div>
          </div>
        </li>
        <li @click="handleSubmit">登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { checkMobile,fixWXInput } from "../assets/js/util.js";
import { fetchDoctorValid, fetchDoctorLogin } from "../assets/js/api.js";
import { mapState,mapMutations } from 'vuex'

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
      getState: 0, //获取状态切换
      countDown: 60, // 倒计时60秒
      fileds: {
        mobilePhone: "",
        validCode: "", //手机验证码
        openId: "",
      },
    };
  },
   computed: {
    ...mapState(['code']),
  },
  methods: {
    ...mapMutations({
      updateTranches: 'updateTranches',
      updateDoctorId: 'updateDoctorId',
      updateGndc:"updateGndc",
      updateZqty:"updateZqty"
    }),
    // 调用短信验证码接口
    async handleGetMess() {
      const { mobilePhone, validCode } = this.fileds;
      if (!mobilePhone) {
        this.$toast("手机号不得为空");
        return;
      }
      if (!checkMobile(mobilePhone)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      this.getState = 1;
      const res  = await fetchDoctorValid({ mobilePhone });
      if(!res.data.success){
        this.$toast(res.data.msg)
        this.getState = 0;
        return false
      }
      // 倒计时
      const countDown60 = setInterval(() => {
        this.countDown--;
        if (this.countDown == 1) {
          this.getState = 0;
        }
        if (this.countDown == 0) {
          this.countDown = 60;
          clearInterval(countDown60);
        }
      }, 1000);
    },
    // 登录接口
    async handleSubmit() {
      const { mobilePhone, validCode, openId }  = this.fileds
      if (!validCode) {
        this.$toast("验证码不得为空");
        return;
      }
      const res = await fetchDoctorLogin({ mobilePhone, validCode, openId })
      // console.log(res)
      if(res.data.success === true) {
        console.log(res)
        const {doctorId, token, tranches, gndc, zqty } = res.data.obj
        console.log('0000', doctorId, token, tranches)
        // 存储分组 
        this.updateTranches({ tranches })
        // 存储医生id
        this.updateDoctorId({ doctorId })
        this.updateGndc({ gndc: gndc })
        // 存储知情同意
        this.updateZqty({ zqty: zqty })
        // 存储医生的token
        localStorage.setItem('docToken',token)
        // 存储医生的token
        localStorage.setItem('docToken',token)
        this.$router.push({path:'./doctorClassify'})
      }else{
        this.$toast(res.data.msg)
      }
    }
  },
  created() {
    const openId = localStorage.getItem('openId', openId)
    // const openId = "ojeDuwj-t9-CXyJyVXs3xiWYUEvY"
    this.fileds.openId = openId
  }
};
</script>

<style lang="scss">
// @import "../assets/css/sprite.scss";
.Loginwrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/docLoginBackground.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-top:700px; 
  .messageLogin {
    width: 100%;
    height: 570px;
    // margin-top: ;
    background: #fff;
    // border-radius: 2.667vw;
    /*box-shadow: #ccc 0px 0px 7px;*/
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      /*手机号*/
      li {
        width: 80%;
        height: 80px;
        margin-top:10px;
        border: 1px solid #035732;
        border-radius: 20px;
        border-color: #34bfcd;
        .phone {
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: center;
          border-radius: 20px;
          align-items: center;
          .phoneNum {
            display: block;
            width: 95%;
            height: 52px;
            border: none;
            outline: none;
            color: #111;
            -webkit-appearance: none;
            //  border:1px solid #0f0;
          }
        }
      }
      /*短信验证码*/
      li:nth-child(2) {
        .phoneValidate {
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .inputMessage{
            // border:1px solid #0f0;
            height: 52px;
            margin-left:10px;
            display: flex;
            justify-content: center;
            align-items: center;
            .message {
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
              margin-top:2px;
              border-radius: 4px;
              color: #111;
              -webkit-appearance: none;
            }
          }
          .code {
            height: 60px;
            padding: 5px;
            border-radius: 15px;
            font-size: 16px;
            text-align: center;
            line-height: 60px;
            color:#fff;
            background: #34bfcd;
          }
        }
      }
      // 登录按钮
      li:nth-child(3) {
        width: 80%;
        height: 60px;
        background: #34bfcd;
        border-radius: 30px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #b6b3b3;
    font-size: 30px;
  }
}
</style>

