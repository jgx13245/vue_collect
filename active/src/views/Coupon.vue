<template>
  <div class="coupon-wrap">
    <!--头部-->
    <div class="coupon-classify">
      <ul class="coupon-classify__select">
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
    <!--会员优惠券-->
    <div class="coupon-all" v-show="nowIndex==0">
      <div v-if="memberCouponList.length == 0">
        <ul class="coupon-all__no">
        <li class="coupon-no-bg"></li>
        <li class="coupon-no-word">暂时无可用的抵金券</li>
      </ul>
      </div>
      <div v-else>
        <ul class="coupon-all__show"  @click="handleState($event, '.js-pay-button')" v-if="ismember == 1">
        <li v-for="(item,index) in memberCouponList" :key="index" class="coupon-all__list">
          <div class="coupon-all__money">
            <p class="coupon-all__money__voucher">
              <span class="coupon-all__money__voucher-name">{{item.name}}</span>
              <span class="coupon-all__money__voucher-value">价值{{item.desc}}</span>
            </p>
            <p class="coupon-all__money__fee">
              <span>￥</span>
              <span>{{item.fee}}</span>
            </p>
          </div>
          <div class="coupon-all__tip">
            <p>{{item.introduction}}</p>
            <a role="button" :data-id="item.couponId" :data-type="item.delivery" class="js-pay-button">购买</a>
          </div>
        </li>
      </ul>
      <ul class="coupon-all__show" @click="handleStateVip($event, '.js-pay-vip')" v-else>
        <li v-for="(item,index) in memberCouponList" :key="index" class="coupon-all__list">
          <div class="coupon-all__money">
            <p class="coupon-all__money__voucher">
              <span class="coupon-all__money__voucher-name">{{item.name}}</span>
              <span class="coupon-all__money__voucher-value">{{item.desc}}</span>
            </p>
            <p class="coupon-all__money__fee">
              <span>￥</span>
              <span>{{item.fee}}</span>
            </p>
          </div>
          <div class="coupon-all__tip">
            <p>{{item.introduction}}</p>
            <a role="button"  class="js-pay-vip">成为会员</a>
          </div>
        </li>
      </ul>
      </div>
    </div>
    <!--普通优惠券-->
    <div class="coupon-all" v-show="nowIndex==1">
      <ul class="coupon-all__no" v-if="userCouponList.length == 0">
        <li class="coupon-no-bg"></li>
        <li class="coupon-no-word">暂时无可用的抵金券</li>
      </ul>
      <ul class="coupon-all__show" v-else @click="handleState($event, '.js-pay-button')">
        <li v-for="(item,index) in userCouponList" :key="index" class="coupon-all__list">
          <div class="coupon-all__money">
            <p class="coupon-all__money__voucher">
              <span class="coupon-all__money__voucher-name">{{item.name}}</span>
              <span class="coupon-all__money__voucher-value">价值{{item.value}}元</span>
            </p>
            <p class="coupon-all__money__fee">
              <span>￥</span>
              <span>{{item.fee}}</span>
            </p>
          </div>
          <div class="coupon-all__tip">
            <p>{{item.introduction}}</p>
            <a role="button" :data-id="item.couponId" :data-type="item.delivery" class="js-pay-button">购买</a>
          </div>
        </li>
      </ul>
    </div>
    <!--我的优惠券-->
    <div class="coupon-my" v-show="nowIndex ==2">
      <ul class="coupon-my__no" v-show="myCoupon.length == 0 && isLogin">
        <li class="coupon-no-bg"></li>
        <li class="coupon-no-word">暂时无可用的抵金券</li>
      </ul>
      <ul class="coupon-my__show" v-show="myCoupon.length > 0 && isLogin" @click="handleUseCoupon($event, '.js-use-button')">
        <li
          class="coupon-my__list"
          v-for="(item,index) in myCoupon"
          :class="item.used ? 'greyBg' : 'orangeBg'"
          :key="index"
        >
          <div class="coupon-my__name">
            <p class="coupon-my__name__value">
              <span>￥</span>
              <span>{{item.value}}</span> 
            </p>
            <p class="coupon-my__name__voucher">代金券</p>
          </div>
          <div class="coupon-my__state-type">
            <div class="coupon-my__header">
              <span class="replace">{{item.introduction}}</span>
              <a role="button" class="overdue js-use-button" :data-id="item.id" :data-index="index">使用</a>
            </div>
            <div class="coupon-my__vip">
              {{item.name}}
            </div>
            <!-- <div v-if="item.delivery !== 0" class="coupon-my__rule-btn icon icon-coupon-rule" @click="ruleShow = true"></div> -->
            <!-- <div class="coupon-my__address" :class="item.delivery === -1 ? 'is-complete' : ''" @click="navigatorAddress(item.id)">
              <span v-if="item.delivery !== 0">{{item.delivery === -1 ? '地址已填写' : '请填写收货地址'}}</span>
              <span v-if="item.delivery === 1" class="icon icon-coupon-back"></span>
              <span v-if="item.delivery === 0">{{item.optime | transformTimestampToString}}</span>
            </div> -->
          </div>
        </li>
      </ul>
      <ul v-show="!isLogin" class="coupon-checkIsLogin">
         <li class="LoginBtn" @click="handleActionAfterJudgeLogin(null)">点击登录</li>
      </ul>
    </div>
    <!-- 规则 -->
    <popup :visible="ruleShow">
      <section slot="content" class="coupon-rule-detail">
        <h5 class="coupon-rule__title">
          <span>粽情端午</span>
          <br />
          <span>礼盒预约规则</span>
        </h5>
        <ul class="coupon-rule__list">
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
        <div class="coupon-rule-close" @click="ruleShow = false">
          <span class="icon icon-coupon-close"></span>
        </div>
      </section>
    </popup>
  </div>
</template>

<script>
import Popup from '../components/Popup'
import { allCoupon, myCoupon, couponRecharge,couponUse } from '../assets/js/api.js';
import { invokeNativeSign, invokeNativeCouponPay, invokeNativeSignAndroid, invokeNativeCouponPayAndroid } from '../assets/js/native'
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
        '会员专享券',
        '普通优惠券',
        '我的优惠券'
      ],
      nowIndex: 0, //默认第一个tab为激活状态
      memberCouponList: [],
      userCouponList: [],
      myCoupon: [],
      ismember: 0,
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
        // 会员
        if (newValue === 0) {
          this.fetchCoupon(0, {userId: this.userId, memberType:1, marketId: this.marketId })
          return
        }
        // 普通
        if (newValue === 1) {
          this.fetchCoupon(1, {userId: this.userId, memberType:0, marketId: this.marketId })
          return
        }
        // 我的
        if (newValue === 2 && this.isLogin) {
          this.fetchCoupon(2, { userId: this.userId })
        }
      },
      immediate: true
    },
    '$store.state.isLogin' (newValue) {
      if (newValue && this.nowIndex === 2) {
        this.fetchCoupon(2, { userId: this.userId })
      }
    },
    // 登录之后需要重新请求页面数据，判断是不是会员，是会员就显示 “购买” 页面，不是会员就显示 “成为会员” 按钮
    '$store.state.userId': {
      handler (newValue) {
        if(newValue) {
          this.fetchCoupon(0, {userId: this.userId, memberType:1, marketId: this.marketId })
        }
      },
      immediate: true
    }
  },
  filters: {
    transformTimestampToString (timestamp) {
      return transformTimestampToString(timestamp)
    },
  },
  /* 判断监听登录状态是否改变 */
  computed: {
    ...mapState(["marketId","userId","isLogin"])
  },
  methods: {
    // 原生调取js的方法
    callJsCouponPayAfterAndroid(data) {
      if(data.member === 'coupon') {
        this.nowIndex = 2
      }
    },
    ...mapMutations({
      updateCouponId: 'updateCouponId'
    }),
    toggleTabs (index) {
      this.nowIndex = index
    },
    // 成为会员判断是否登录，判断是否登录，如果登录，就直接执行回调函数，如果没有执行，就先登录，回到老页面之后，再次点击执行
    handleStateVip (...args) {
      this.handleActionAfterJudgeLogin(this.handleToMemberView, ...args)
    },
    handleToMemberView() {
      this.$router.push({path:'./member'})
    },
    /* 获取优惠券页面数据 */
    async fetchCoupon (type, options) {
      // 获取列表 type = 0->会员优惠券  type = 1->普通优惠券  type = 2->我的优惠券
      if (type === 0) {
        const { data:{ couponList, isMember } } = await allCoupon(options)
        // 返回一个是否是会员的标志
        this.ismember = isMember 
        this.memberCouponList = couponList
        return
      }
      if (type === 1) {
        const { data:{ couponList } } = await allCoupon(options)
        this.userCouponList = couponList
        return
      }
      if (type === 2) {
        const { data } = await myCoupon(options)
        this.myCoupon = data
      }
    },
    /* 购买优惠券的时候判断是否登录 */
    handleState (...args) {
      this.handleActionAfterJudgeLogin(this.handlePay, ...args)
    },
    handlePay (e, selector) {
      const target = e.target
      const currentTarget = closest(target, selector)
      if (currentTarget) {
        const couponId  = currentTarget.dataset.id
        const type = currentTarget.dataset.type
        this.handlePayAction({ couponId, type })
      }
    },
    /* 调取支付接口 */
    async handlePayAction ({ couponId, type }) {
      this.$loading.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      // ---------------------------------老桥---------------------------------
      if(isApp()){
        const { sign, timestamp, userId } = await invokeNativeSign()
        const { data } = await couponRecharge({
          couponId,
          userId,
          sign,
          timestamp,
          ip: '10.1.1.248'
        })
        if(data.code == -2) {
          this.$toast(data.message)
          this.$loading.close()
          return
        }
        this.$loading.close()
        data.type = ['wx', 'zfb']
        const { code } = await invokeNativeCouponPay(data)
        if (code === 1) {
          // 支付成功
          if (type == 1) {
            this.nowIndex = 2
          } 
        }
      }
      // ---------------------------------如果是安卓的调用安卓的两个桥方法---------------------------------
      if(!isApp() && isMobileAndroid()) {
        console.log('新桥')
        const { sign, timestamp, userId } = await invokeNativeSignAndroid()
        const { data } = await couponRecharge({
          couponId,
          userId,
          sign,
          timestamp,
          ip: '10.1.1.248'
        })
        if(data.code == -2) {
          this.$toast(data.message)
          this.$loading.close()
          return
        }
        this.$loading.close()
        data.type = ['wx', 'zfb']
        data.member='coupon'
        await invokeNativeCouponPayAndroid(JSON.stringify(data))
      }
    },
    /* 使用优惠券 */
    async handleUseCoupon (e, selector) {
      const target = e.target
      const currentTarget = closest(target, selector)
      if (currentTarget) {
        this.$loading.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        const id  = currentTarget.dataset.id
        const index = currentTarget.dataset.index
        // ---------------------------------老桥---------------------------------
        if(isApp()){
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
    // 跳转地址选择界面 (端午节已过，废弃)
    // navigatorAddress (couponId) {
    //   // TODO 跳转到选择地址界面
    //   this.updateCouponId({couponId})
    //   this.$router.push({
    //     path: '/delivery-info'
    //   })
    // },
  }
};
</script>

<style lang="scss">
@import '../assets/css/sprite.scss';
.coupon-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/*头部切换*/
.coupon-classify {
  width: 100%;
  height: 88px;
  border-top: 1px solid #e5e5e5;
}
.coupon-classify__select{
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
.coupon-all {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: auto;
 }
.coupon-all__no,
.coupon-all__show{
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.coupon-all__list {
    width: 95%;
    height: 250px;
    background: url("../assets/images/allcoupon-bg@3x.png") no-repeat center;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
.coupon-all__money {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .coupon-all__money__voucher {
    height: 100%;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .coupon-all__money__voucher-name {
      color: #fff;
      font-size: 32px;
    }
    .coupon-all__money__voucher-value {
      color: #fff;
      font-size: 24px;
      margin-top: 10px;
    }
  }
  .coupon-all__money__fee {
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
.coupon-all__tip {
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
    width: 160px;
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
.coupon-my {
  width: 100%;
  min-height: 100vh;
  flex: 1;
  overflow: auto;
}
.coupon-my__no,
.coupon-my__show{
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.coupon-my__list {
  display: flex;
  margin-top: 20px;
  width: 95%;
  height: 200px;
  box-shadow: #ccc 0px 0px 7px;
  border-radius: 19px;
  overflow: hidden;
}
.coupon-my__name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 32%;
  height: 200px;
  .coupon-my__name__value {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    > span:nth-child(2) {
      display: inline-block;
      width: 155px;
      font-size: 60px;
    }
  }
  .coupon-my__name__voucher {
    margin-top: 10px;
    font-size: 40px;
    padding-right: 10px;
    color: #fff;
    margin-right: 40px;
  }
}
.coupon-my__state-type {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  .coupon-my__rule-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .coupon-my__header {
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
  .coupon-my__vip {
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
.orangeBg {
  background: url("../assets/images/coupon1-bg@3x_0.png") no-repeat center;
  background-size: cover;
  border-radius: 19px;
}
.greyBg {
  background: url("../assets/images/coupon0-bg@3x.png") no-repeat center;
  background-size: cover;
  border-radius: 19px;
}
.coupon-my__no,
.coupon-all__no {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #fff;
  list-style: none;
  .coupon-no-bg {
    position: absolute;
    left:50%;
    top:20%;
    transform:translate(-50%,0);
    width: 310px;
    height: 372px;
    background: url("../assets/images/no-coupon3x.png") no-repeat center;
    background-size: contain;
  }
  .coupon-no-word {
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
.coupon-checkIsLogin{
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

.coupon-rule-detail {
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

  .coupon-rule-close {
    position: absolute;
    top: -80px;
    right: 0;
  }
}

.coupon-rule__title {
  text-align: center;
  font-size: 30px;
  padding: 0 0 40px 0;
  margin: 0;
  font-weight: 500;
}

.coupon-rule__list {
  list-style: decimal;
  padding-left: 20px;
}
</style>