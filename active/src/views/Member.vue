<template>
  <div class="member-wrap">
    <div class="member-content">
      <ul class="member-conten_wrap">
        <li>如何成为会员？</li>
        <li>办理爱购会员，需缴纳50元，有效期为整自然月，可续费</li>
        <li>成为会员有什么特权?</li>
        <li>充值/购买电子代金券可享受更多优惠，如下：</li>
        <li>
          <span>电子代金券惠享购</span>
          <span>购买价值50元电子代金券返6元<i>(每月可购8次)</i></span>
          <span>购买价值100元电子代金券返20元<i>(每月可购4次)</i></span>
          <span>购买价值200元电子代金券返50元<i>(每月可购3次)</i></span>
          <span>购买价值300元电子代金券返80元<i>(每月可购2次)</i></span>
        </li>
        <li>敬请关注更多福利......</li>
      </ul>
    </div>
    <div class="member-pay">
      <div class="member-pay_select" @click="handlePopup">
        <div class="inputPayment">{{month}}</div>
        <span></span>
      </div>
      <div class="member-pay_btn" @click="handlePayment">
        <span>￥{{payment}}</span>
        <span>立即支付</span>
      </div>
    </div>
    <mt-popup v-model="paymentPopupVisible" position="bottom" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="select-month">
        <span class="beautiful" @click="paymentCanclePopup">取消</span><span class="beautiful">请选择购买月份</span><span class="beautiful" @click="paymentAddValue">确定</span>
      </div>
      <mt-picker :slots="paymentSlots" @change="paymentChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { vipPayment } from '../assets/js/api.js';
import { invokeNativeSign, invokeNativeCouponPay, invokeNativeSignAndroid, invokeNativeCouponPayAndroid } from '../assets/js/native'
import { mapState } from "vuex";
import { isMobileAndroid, isApp } from '../assets/js/util.js'
import Login from '../assets/js/login.js';

export default {
  mixins: [ Login ],
  data() {
    return {
      payment:50,
      month:'1个月爱购会员',
      monthCount:1,
      paymentPopupVisible: false,
      paymentSlots: [
        {
          values: ['1个月爱购会员','3个月爱购会员','6个月爱购会员','12个月爱购会员']
        }
      ],
    }
  },
  computed: {
    ...mapState(["marketId","userId","isLogin"])
  },
  watch:{
    month: {
      handler(newValue) {
        if(newValue === '1个月爱购会员') {
          this.payment = 50
          this.monthCount = 1
        }
        if(newValue === '3个月爱购会员') {
          this.payment = 150
          this.monthCount = 3
        }
        if(newValue === '6个月爱购会员') {
          this.payment = 300
          this.monthCount = 6
        }
        if(newValue === '12个月爱购会员') {
          this.payment = 600
          this.monthCount = 12
        }
      },
      immediate:true
    },
  },
  methods:{
    callJsCouponPayAfterAndroid(data) {
      if(data.member === 'member') {
        this.$router.push({path:'./coupon'})
      }
    },
    handlePopup() {
      this.paymentPopupVisible = true
    },
    paymentChange(picker, values) {
      this.month = values[0]
    },
    paymentCanclePopup(){
      this.paymentPopupVisible = false
    },
    paymentAddValue() {
      this.paymentPopupVisible = false;
      if (this.payment === "") {
        this.payment = 50;
      }
    },
    // 支付按钮
    handlePayment() {
      const mon = this.monthCount
      const marketId = this.marketId
      this.handlePayAction({mon, marketId})
    },
     // 调取支付接口
    async handlePayAction({mon, marketId}) {
      this.$loading.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // ---------------------------------老桥---------------------------------
      if(isApp()) {
        const { sign, timestamp, userId } = await invokeNativeSign()
        const { data } = await vipPayment({
          mon,
          marketId,
          userId,
          sign,
          timestamp,
          ip: '10.1.1.248'
        })
        this.$loading.close()
        data.type = ['wx', 'zfb']
        const { code } = await invokeNativeCouponPay(data)
        if (code === 1) {
          // 支付成功
          this.$router.push({path:'./coupon'})
        }
      }
      // ---------------------------------如果是安卓的调用安卓的两个桥方法---------------------------------
      if(!isApp() && isMobileAndroid()) {
        const { sign, timestamp, userId } = await invokeNativeSignAndroid()
        const { data } = await vipPayment({
          mon,
          marketId,
          userId,
          sign,
          timestamp,
          ip: '10.1.1.248'
        })
        this.$loading.close()
        data.type = ['wx', 'zfb']
        data.member = 'member'
        await invokeNativeCouponPayAndroid(JSON.stringify(data))
        // if (code === 1) {
        //   // 支付成功
        //   this.$router.push({path:'./coupon'})
        // }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/sprite.scss';
.member-wrap{
  width:100%;
  height:100vh;
  position: fixed;
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.member-content{
  width:100%;
  flex:1;
}
.member-conten_wrap{
  width:100%;
  height:100%;
  border:1px solid #0f00;
  padding:10px 20px;
  li:nth-child(1),li:nth-child(3) {
    color:#FF8C00	;
    text-decoration : underline;
    margin-bottom:40px;
  }
  li:nth-child(2),li:nth-child(4) {
    color:#868686;
    margin-bottom:40px;
  }
  li:nth-child(5) {
    width:100%;
    height:300px;
    background: #fff;
    border-radius: 20px;
    margin:0 auto;
    padding: 20px;
    box-shadow: #ccc 0px 0px 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    span {
      font-size:30px;
      color:#c9a75d;
      i{
        color:#FF8C00;
        font-style: normal;
        margin-left:20px;
      }
    }
    span:nth-child(1){
      font-size:40px;
      color:#c9a75d;
    }
  }
  li:nth-child(6){
    width:100%;
    margin: 0 auto;
    color:#868686;
    text-align: center;
    margin-top:40px;
    font-size:40px;
  }
}
.member-pay{
  width:100%;
  height:8vh;
  border-top:1px solid #e8e8e8;
  background: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
  .member-pay_select{
    display: flex;
    flex:1;
    justify-content: space-around;
    align-items: center;
    .inputPayment{
      width:70%;
      height:100%;
      font-size:40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      padding-left:20px;
      color: #FF6d05;
    }
    >span{
      width:50px;
      height:50px;
      display: block;
      margin-right:100px;
      background: url("../assets/images/up.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
  .member-pay_btn{
    width:30%;
    color:#fff;
    background: #FF6d05;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    span:nth-child(1) {
       font-size: 40px;
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
  color: #ffa11b;
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
.mint-popup-bottom {
    width: 100%;
}
</style>
