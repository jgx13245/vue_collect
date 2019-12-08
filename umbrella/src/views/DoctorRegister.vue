<template>
  <div class="reigister-wrap">
    <div class="messageLogin">
      <ul>
        <li class="register_info">
          注册信息   
        </li>
        <li class="register_name">
            <input
              type="tel"
              maxlength="11"
              placeholder="姓名"
              class="register_name-input"
              v-model="fileds.phone"
              v-autoAdjust>
        </li>
        <li class="register_phone">
            <input
              type="tel"
              maxlength="11"
              placeholder="请输入手机号"
              class="register_phoneNum"
              v-model="fileds.phone"
              v-autoAdjust
            >
        </li>
        <li class="register_certificate">
            <input
              type="tel"
              maxlength="11"
              placeholder="请输入证书编号"
              class="register_certificate-input"
              v-model="fileds.phone"
              v-autoAdjust
            >
        </li>
         <li class="register_photo">
           <span class="up-title">上传手持执业证书或工牌的照片</span>
            <a href="javascript:;" class="upload">
              <input type="file" accept="image/*" class="up-photo">
            </a>
        </li>
        <li @click="handleSubmit" class="submit">提交</li>
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
  methods: {},
  created() {}
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.reigister-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .messageLogin {
    width: 90%;
    height: 670px;
    margin-top:300px;
    background: #fff;
    border-radius: 20px;
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
        border: 1px solid #035732;
        border-radius: 20px;
      }
      // 注册title
      .register_info{
        height: 60px;
        border:none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color:#035732;
        font-weight: bold;
      }
      // 姓名
      .register_name {
        height: 60px;
        display: flex;
        justify-content: center;
        border-radius: 20px;
        align-items: center;
        .register_name-input {
          display: block;
          width: 95%;
          height: 48px;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
      }
       // 手机号
       .register_phone {
        height: 60px;
        display: flex;
        justify-content: center;
        border-radius: 20px;
        align-items: center;
        .register_phoneNum {
          display: block;
          width: 95%;
          height: 48px;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
      }
      // 证书编号
       .register_certificate {
        height: 60px;
        display: flex;
        justify-content: center;
        border-radius: 20px;
        align-items: center;
        .register_certificate-input {
          display: block;
          width: 95%;
          height: 48px;
          border: none;
          outline: none;
          color: #333;
          -webkit-appearance: none;
          //  border:1px solid #0f0;
        }
       }
      //上传图片
      .register_photo {
        height: 200px;
        border-radius: 0;
        border:none;
        display: flex;
        justify-content:space-around;
        align-items: center;
        .up-title{
          width:40%;
          font-size: 18px;
          color:#035732;
          padding: 10px;
        }
        .upload{
          width:30%;
          height: 150px;
          background: #fff url("../assets/images/photo.png") no-repeat center;
          background-size: 50% 50%;
          display: block;
          line-height: 20px;
          position: relative;
          border: 1px solid #999;
          text-decoration: none;
          color: #666;
          border:1px solid #035732;
        }
        .up-photo{
          width:100%;
          height: 150px;
          position: absolute;
          overflow: hidden;
          left: 0;
          top: 0;
          opacity: 0;
          border:1px solid #00f;
        }
      }      
      // 登录按钮
      .submit {
        height: 60px;
        background: #035732;
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


