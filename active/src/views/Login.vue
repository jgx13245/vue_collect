<template>
  <div class="wrap">
    <div class="messageLogin">
      <ul>
        <li>
          <div class="phone">
            <span class="icon icon-phone"></span>
            <input
              type="tel"
              maxlength="11"
              placeholder="请输入手机号"
              class="phoneNum"
              v-model="fileds.phone"
              v-autoAdjust
            >
          </div>
        </li>
        <li>
          <div class="picValidate">
            <span class="icon icon-graphic-code"></span>
            <span>
              <input
                type="tel"
                maxlength="4"
                placeholder="请输入图中文字"
                class="picWord"
                v-model="fileds.captcha"
                v-autoAdjust
              >
            </span>
            <span @click="handleRefreshCaptcha">
              <img :src="images" alt>
            </span>
          </div>
        </li>
        <li>
          <div class="phoneValidate">
            <span class="icon icon-sms-code"></span>
            <span>
              <input
                type="tel"
                maxlength="6"
                placeholder="请输入验证码"
                class="message"
                v-model="fileds.code"
                v-autoAdjust
              >
            </span>
            <span>
              <i v-show="getState ===0" @click="handleGetMess">获取验证码</i>
              <i v-show="getState ===1" class="getAgain">{{countDown}}秒后重新发送</i>
            </span>
          </div>
        </li>
        <li @click="handleSubmit">注册</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { encodeQuery,checkMobile,fixWXInput } from "../assets/js/util.js";
import { getMessageValidate } from "../assets/js/api.js";
import { registerBind } from "../assets/js/api.js";
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
        recommendToken: "",
        phone: "",
        code: "", //手机验证码
        openId: "",
        captcha: "" //图像验证码
      },
      images: "",
    };
  },
  methods: {
     // 调用图片验证码接口
    async handleRefreshCaptcha() {
      await this.handleGetPic({ time: Date.now(), openId: this.fileds.openId });
    },
    // 调用短信验证码接口
    async handleGetMess() {
      const { phone, openId } = this.fileds;
      if (!phone) {
        this.$toast("手机号不得为空");
        return;
      }
      if (!checkMobile(phone)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      this.getState = 1;
      await this.handleMessage({ phone, openId });
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
    // 调用注册绑定接口
    async handleSubmit() {
      const { phone, captcha, code, recommendToken, openId } = this.fileds;
      if (!phone) {
        this.$toast("手机号不得为空");
      } else if (!checkMobile(phone)) {
        this.$toast("请输入正确的手机号");
      } else if (!captcha) {
        this.$toast("图片验证码不能为空");
      } else if (!code) {
        this.$toast("请输入短信验证码");
      } else {
        const { code, message } = await this.handleRegisterBind({phone,captcha,code,recommendToken,openId});
        if (code === 200) {
            this.$router.replace({
              name: "register-success"
            });
          } else {
            this.$toast(message);
          }
      }
    },
    // 图片验证码接口 
    handleGetPic({ time, openId }) {
      this.images = `https://m.24igo.com/page/recommed/captcha?${encodeQuery({time,openId})}`;
    },
    // 短信验证码接口
    handleMessage(options) {
      return new Promise(resolve => {
        getMessageValidate(options).then((res) => {
          resolve(res);
        });
      });
    },
    
    // 注册绑定接口
    handleRegisterBind(options) {
      return new Promise(resolve => {
        registerBind(options).then(res => {
          resolve(res.data)
        });
      });
    },
    // 获取认证token和openId
    initTokenAndOpenid() {
      const { token } = this.$route.query;
      const openId = localStorage.getItem("openId");
      this.fileds.recommendToken = token;
      this.fileds.openId = openId;
    }
  },
  created() {
    this.initTokenAndOpenid();
    this.handleGetPic({ time: Date.now(), openId: this.fileds.openId });
  }
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #ffd342 url("../assets/images/inviteFriend.png") no-repeat;
  background-size: 100% 710px;
  padding-top: 730px;
  padding-bottom: 50px;
  border:1px solid #0f0;
  .messageLogin {
    width: 90%;
    height: 570px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: #ccc 0px 0px 7px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      /*手机号*/
      li {
        width: 80%;
        height: 100px;
        border-bottom: 1px solid #dcdcdc;
        .phone {
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          .phoneNum {
            flex: 1;
            width: 100%;
            height: 80px;
            padding-left: 20px;
            border: none;
            border-radius: 4px;
            color: #333;
            -webkit-appearance: none;
          }
        }
      }
      /*图片验证码*/
      li:nth-child(2) {
        .picValidate {
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          span:nth-child(2) {
            width: 260px;
            height: 80px;
            .picWord {
              width: 100%;
              height: 98%;
              left: 0;
              padding-left: 20px;
              border: none;
              border-radius: 4px;
              color: #333;
              -webkit-appearance: none;
            }
          }
          span:nth-child(3) {
            flex: 1;
            height: 80px;
            text-align: center;
            line-height: 80px;
          }
        }
      }
      /*短信验证码*/
      li:nth-child(3) {
        .phoneValidate {
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          span:nth-child(2) {
            width: 260px;
            height: 80px;
            .message {
              width: 100%;
              height: 98%;
              left: 0;
              padding-left: 20px;
              border: none;
              border-radius: 4px;
              color: #333;
              -webkit-appearance: none;
            }
          }
          span:nth-child(3) {
            flex: 1;
            height: 80px;
            text-align: center;
            line-height: 80px;
            position: relative;
            i {
              font-style: normal;
              font-size: 18px;
              position: absolute;
              display: block;
              width: 90%;
              height: 50px;
              text-align: center;
              line-height: 50px;
              color: #fffefe;
              border-radius: 20px;
              background: #f46921;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              opacity: 0.8;
            }
            .getAgain {
              font-style: normal;
              font-size: 18px;
              position: absolute;
              display: block;
              width: 90%;
              height: 50px;
              text-align: center;
              line-height: 50px;
              color: #fffefe;
              border-radius: 20px;
              background: #ababab;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              opacity: 0.8;
            }
          }
        }
      }
      li:nth-child(4) {
        width: 80%;
        height: 80px;
        background: #f37921;
        border-radius: 30px;
        text-align: center;
        line-height: 80px;
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


