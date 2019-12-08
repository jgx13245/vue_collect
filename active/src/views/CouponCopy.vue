<template>
  <div class="couponCopy-wrap">
    <!--头部-->
    <div class="couponCopy-classify">
      <ul class="couponCopy-classify__select">
        <li
          class="all-my"
          v-for="(item,index) in tabsParam"
          @click="toggleTabs(index)"
          :key="index"
        >
          <span :class="nowIndex === index? 'classifyWordColor': 'classifyWord'">{{item}}</span>
        </li>
      </ul>
    </div>
    <!--全部优惠券-->
    <div class="couponCopy-all" v-show="nowIndex==0">
      <ul class="couponCopy-all__no" v-if="allcouponList.length == 0">
        <li class="couponCopy-no-bg"></li>
        <li class="couponCopy-no-word">暂时无可用的抵金券</li>
      </ul>
      <ul class="couponCopy-all__show" v-else @click="handleState($event, '.js-pay-button')">
        <li v-for="(item,index) in allcouponList" :key="index" class="couponCopy-all__list">
          <div class="couponCopy-all__money">
            <p class="couponCopy-all__money__voucher">
              <span class="couponCopy-all__money__voucher-name">{{item.name}}</span>
              <span class="couponCopy-all__money__voucher-value">价值{{item.value}}元</span>
            </p>
            <p class="couponCopy-all__money__fee">
              <span>￥</span>
              <span>{{item.fee}}</span>
            </p>
          </div>
          <div class="couponCopy-all__tip">
            <p>{{item.introduction}}</p>
            <a role="button" :data-id="item.couponCopyId" :data-type="item.delivery" class="js-pay-button">购买</a>
          </div>
        </li>
      </ul>
    </div>
    <!--我的优惠券-->
    <div class="couponCopy-my" v-show="nowIndex ==1">
      <ul class="couponCopy-my__no" v-show="mycoupon.length == 0 && isLogin">
        <li class="couponCopy-no-bg"></li>
        <li class="couponCopy-no-word">暂时无可用的抵金券</li>
      </ul>
      <ul class="couponCopy-my__show" v-show="mycoupon.length > 0 && isLogin" @click="handleUsecouponCopy($event, '.js-use-button')">
        <li
          class="couponCopy-my__list"
          v-for="(item,index) in mycoupon"
          :class="item.used ? 'greyBg' : 'orangeCopyBg'"
          :key="index"
        >
          <div class="couponCopy-my__name">
            <p class="couponCopy-my__name__value">
              <span>￥</span>
              <span>{{item.value}}</span> 
            </p>
            <p class="couponCopy-my__name__voucher">代金券</p>
          </div>
          <div class="couponCopy-my__state-type">
            <div class="couponCopy-my__header">
              <span class="replace">{{item.introduction}}</span>
              <a role="button" class="overdue js-use-button" :data-id="item.id" :data-index="index">使用</a>
            </div>
             <div class="couponCopy-my_state">
              {{item.name}}
            </div>
            <!-- <div v-if="item.delivery !== 0" class="couponCopy-my__rule-btn icon icon-couponCopy-rule" @click="ruleShow = true"></div> -->
            <!-- <div class="couponCopy-my__address" :class="item.delivery === -1 ? 'is-complete' : ''" @click="navigatorAddress(item.id)">
              <span v-if="item.delivery !== 0">{{item.delivery === -1 ? '地址已填写' : '请填写收货地址'}}</span>
              <span v-if="item.delivery === 1" class="icon icon-couponCopy-back"></span>
              <span v-if="item.delivery === 0">{{item.optime | transformTimestampToString}}</span>
            </div> -->
          </div>
        </li>
      </ul>
      <ul v-show="!isLogin" class="couponCopy-checkIsLogin">
         <li class="LoginBtn" @click="handleActionAfterJudgeLogin(null)">点击登录</li>
      </ul>
    </div>
    <!-- 规则 -->
    <popup :visible="ruleShow">
      <section slot="content" class="couponCopy-rule-detail">
        <h5 class="couponCopy-rule__title">
          <span>粽情端午</span>
          <br />
          <span>礼盒预约规则</span>
        </h5>
        <ul class="couponCopy-rule__list">
          <li class="item">
            <p class="content">预约时间：4月30日-5月23日；</p>
          </li>
          <li class="item">
            <p class="content">配送时间：5月24日-5月26日；</p>
          </li>
          <li class="item">
            <p class="content">可直接下单预约购买/购买代金券赠送对应礼盒；</p>
          </li>
          <li class="item">
            <p class="content">购买代金券成功后请务必填写配送地址，如在活动结束前未填写，默认您放弃领取礼粽，不退不返现；</p>
          </li>
          <li class="item">
            <p class="content">购买代金券成功后，如暂不充值，再需充值（我的）页面查看；</p>
          </li>
          <li class="item">
            <p class="content">发货时如遇不可抗力（台风、洪水）等影响，将暂缓发货；</p>
          </li>
          <li class="item">
            <p class="content">活动最终解释权归北京物网科技有限公司所有。</p>
          </li>
        </ul>
        <div class="couponCopy-rule-close" @click="ruleShow = false">
          <span class="icon icon-couponCopy-close"></span>
        </div>
      </section>
    </popup>
  </div>
</template>

<script>
import Popup from '../components/Popup'
import { allCoupon, myCoupon, couponRecharge,couponUse } from '../assets/js/api.js';
import { invokeNativeSign, invokeNativeCouponPay, invokeNativeSignAndroid, invokeNativeCouponPayAndroid  } from '../assets/js/native'
import { closest, transformTimestampToString, isMobileAndroid, isApp } from '../assets/js/util.js'
import { mapState, mapMutations } from "vuex";
import Login from '../assets/js/login.js';
export default {
  mixins: [ Login ],
  components: {
    Popup
  },
  data() {
    return {
      show: false,
      ruleShow: false,
      tabsParam: [
        '全部',
        '我的'
      ],
      nowIndex: 0, //默认第一个tab为激活状态
      allcouponList:[],
      mycoupon:[]
    };
  },
  created() {
    if (this.$route.query && this.$route.query.index) {
      this.nowIndex = this.$route.query.index
    }
  },
  watch: {
    nowIndex: {
      handler (newValue) {
        if (newValue === 0) {
          this.fetchcouponCopy(0, { userId: this.userId, memberType:0, marketId: this.marketId  })
          return
        }
        if (this.isLogin) {
          this.fetchcouponCopy(1, { userId: this.userId })
        }
      },
      immediate: true
    },
    '$store.state.isLogin' (newValue) {
      if (newValue && this.nowIndex === 1) {
        this.fetchcouponCopy(1, { userId: this.userId })
      }
    }
  },
  filters: {
    transformTimestampToString (timestamp) {
      return transformTimestampToString(timestamp)
    },
  },
  // 判断监听登录状态是否改变
  computed: {
    ...mapState(["marketId","userId","isLogin"])
  },
  methods: {
    callJsCouponPayAfterAndroid(data) {
      if(data.member === 'couponCopy') {
        this.nowIndex = 1
      }
    },
    ...mapMutations({
      updatecouponId: 'updatecouponId'
    }),
    async handlePayAction ({ couponCopyId, type }) {
      this.$loading.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // ---------------------------------老桥---------------------------------
      if(isApp()){
        const { sign, timestamp, userId } = await invokeNativeSign()
        const { data } = await couponRecharge({
          couponCopyId,
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
          if (type == 1) {
            // 当前提示用户填写配送地址
            this.nowIndex = 1
          } 
        }
      }
      // ---------------------------------如果是安卓调用安卓的两个桥方法---------------------------------
      if(!isApp() && isMobileAndroid()) {
        const { sign, timestamp, userId } = await invokeNativeSignAndroid()
        const { data } = await couponRecharge({
          couponCopyId,
          userId,
          sign,
          timestamp,
          ip: '10.1.1.248'
        })
        this.$loading.close()
        data.type = ['wx', 'zfb']
        data.member = 'couponCopy'
        await invokeNativeCouponPayAndroid(JSON.stringify(data))
      }
    },
    toggleTabs (index) {
      this.nowIndex = index
    },
    handleState (...args) {
      this.handleActionAfterJudgeLogin(this.handlePay, ...args)
    },
    handlePay (e, selector) {
      const target = e.target
      const currentTarget = closest(target, selector)
      if (currentTarget) {
        const couponCopyId  = currentTarget.dataset.id
        const type = currentTarget.dataset.type
        this.handlePayAction({ couponCopyId, type })
      }
    },
    async handleUsecouponCopy (e, selector) {
      const target = e.target
      const currentTarget = closest(target, selector)
      if (currentTarget) {
        this.$loading.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        const id  = currentTarget.dataset.id
        const index = currentTarget.dataset.index
      // ---------------------------------老桥--------------------------------
      if(isApp()) {
        const { sign, timestamp, userId } = await invokeNativeSign()
        const { data } = await couponUse({
          id,
          sign, 
          timestamp,
          userId
        })
        const { code, message } = data
        this.$loading.close()
        this.$nextTick(() => {
          this.$toast(message)
          if (code === 200) {
            this.myCoupon.splice(index, 1)
          }
        })
      } 
      // ---------------------------------如果是安卓的调用安卓的桥方法---------------------------------
      if(!isApp() && isMobileAndroid()) {
        const { sign, timestamp, userId } = await invokeNativeSignAndroid()
        const { data } = await couponUse({
          id,
          sign, 
          timestamp,
          userId
        })
        const { code, message } = data
        this.$loading.close()
        this.$nextTick(() => {
          this.$toast(message)
          if (code === 200) {
            this.myCoupon.splice(index, 1)
          }
        })
      }
    }
    },
    async fetchcouponCopy (type, options) {
      // 获取列表 0 全部  1 我的
      if (type === 0) {
        const { data:{ couponList } } = await allCoupon(options)
        this.allcouponList = couponList
        return
      }
      const { data } = await myCoupon(options)
      this.mycoupon = data
    },
    // navigatorAddress (couponCopyId) {
    //   // TODO 跳转到选择地址界面
    //   this.updatecouponId({couponCopyId})
    //   this.$router.push({
    //     path: '/delivery-info'
    //   })
    // },
  }
};
</script>

<style lang="scss">
@import '../assets/css/sprite.scss';
.couponCopy-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/*头部切换*/
.couponCopy-classify {
  width: 100%;
  height: 88px;
  border-top: 1px solid #e5e5e5;
}
.couponCopy-classify__select{
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  .all-my {
    width: 50%;
    height: 88px;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    .classifyWord {
      line-height: 88px;
      color: #414040;
      font-size: 36px;
    }
    .classifyWordColor {
      border-bottom: 1px solid #ff6b06;
      line-height: 88px;
      color: #ff6b06;
      font-size: 36px;
    }
  }
}
/*全部优惠券样式*/
.couponCopy-all {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
 }
.couponCopy-all__no,
.couponCopy-all__show{
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.couponCopy-all__list {
    width: 95%;
    height: 250px;
    background: url("../assets/images/allcoupon-bg@3x.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
.couponCopy-all__money {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .couponCopy-all__money__voucher {
    height: 100%;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .couponCopy-all__money__voucher-name {
      color: #fff;
      font-size: 32px;
    }
    .couponCopy-all__money__voucher-value {
      color: #fff;
      font-size: 24px;
      margin-top: 10px;
    }
  }
  .couponCopy-all__money__fee {
    width: 165px;
    height: 100%;
    padding-right: 20px;
    display: inline-block;
    text-align: right;
    line-height: 144px;
    color: #fff;
    font-size: 58px;
    > span:first-child {
      font-size: 20px;
    }
  }
}
.couponCopy-all__tip {
  width: 100%;
  height: 50px;
  padding: 10px 20px 0 20px;
  flex:1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > p {
    flex: 1;
    padding: 3px;
    line-height: 1.5;
    color: #ccc;
    font-size: 26px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  > a {
    width: 120px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #c09d53;
    border-radius: 5px;
    cursor: pointer;
    color: #c09d53;
    font-size: 30px;
    line-height: normal;
  }
}

/*我的优惠券样式*/
.couponCopy-my {
  width: 100%;
  min-height: 100vh;
  flex: 1;
  overflow: auto;
}
.couponCopy-my__no,
.couponCopy-my__show{
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.couponCopy-my__list {
  display: flex;
  margin-top: 20px;
  width: 95%;
  height: 200px;
  box-shadow: #ccc 0px 0px 7px;
  border-radius: 19px;
  overflow: hidden;
}
.couponCopy-my__name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
  height: 200px;
  .couponCopy-my__name__value {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    > span:nth-child(2) {
      display: inline-block;
      width: 155px;
      font-size: 60px;
    }
  }
  .couponCopy-my__name__voucher {
    margin-top: 10px;
    font-size: 40px;
    padding-right: 10px;
    color: #fff;
    margin-right: 40px;
  }
}
.couponCopy-my__state-type {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  .couponCopy-my__rule-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .couponCopy-my__header {
    width: 90%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed #e4e4e4;
    .replace {
      display: block;
      width:290px;
      height:80px;
      color: #999;
      font-size: 30px;
      display:flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .overdue {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 50px;
      border: 1px solid #c09d53;
      border-radius: 10px;
      font-size: 30px;
      color: #c09d53;
    }
  }
  .couponCopy-my_state {
    width: 100%;
    height: 60px;
    font-size: 30px;
    display: flex;
    align-items: center;
    color: #C09D53;
    justify-content: flex-end;
    padding: 0 20px;
    > span:first-child {
      padding: 0 10px;
    }

    &.is-complete {
      color: #66d662;
    }
  }
}

/*切换部分*/
.orangeCopyBg {
  background: url("../assets/images/coupon1-bg@3x_0.png") no-repeat center;
  background-size: cover;
  border-radius: 19px;
}
.greyBg {
  background: url("../assets/images/coupon0-bg@3x.png") no-repeat center;
  background-size: cover;
  border-radius: 19px;
}
.couponCopy-my__no,
.couponCopy-all__no {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  list-style: none;
  .couponCopy-no-bg {
    position: absolute;
    left:50%;
    top:20%;
    transform:translate(-50%,0);
    width: 310px;
    height: 372px;
    background: url("../assets/images/no-coupon3x.png") no-repeat center;
    background-size: contain;
  }
  .couponCopy-no-word {
    position: absolute;
    top:50%;
    left: 0;
    width: 100%;
    height: 84px;
    background: none;
    color: #818181;
    font-size: 40px;
    text-align: center;
    line-height: 114px;
  }
}
.couponCopy-checkIsLogin{
  width: 100%;
  height: 100vh;
  position: relative;
  background: #fff url("../assets/images/noLogin.png") no-repeat center;
  background-size:40% 27%; 
  background-position:center 30%;
  .LoginBtn{
    width:45%;
    height:75px;
    position: absolute;
    left: 50%;
    top:58%;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid #FF760D;
    transform: translate(-50%,0);
    color:#FF760D;
    font-weight: blod;
    font-size:40px;
    border-radius: 40px;
  }
}

.couponCopy-rule-detail {
  position: relative;
  width: 640px;
  background: #FFF;
  border-radius: 10px;
  padding: 40px;
  font-size: 24px;
  line-height: 1.5;
  color: #333;
  .item + .item {
    margin-top: 20px;
  }

  .couponCopy-rule-close {
    position: absolute;
    top: -80px;
    right: 0;
  }
}

.couponCopy-rule__title {
  text-align: center;
  font-size: 30px;
  padding: 0 0 40px 0;
  margin: 0;
  font-weight: 500;
}

.couponCopy-rule__list {
  list-style: decimal;
  padding-left: 20px;
}
</style>