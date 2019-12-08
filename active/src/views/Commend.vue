<template>
  <div class="commend-page">
    <div class="commend-rule icon icon-rule-bg" @click="show = true">活动规则</div>
    <!-- 邀请按钮 -->
    <div class="commend-button-wrap">
      <span class="icon icon-button-modify buttton-modify-prefix"></span>
      <button class="button" @click="handleInvite">立即邀请</button>
      <span class="icon icon-button-modify buttton-modify-suffix"></span>
    </div>
    <!-- 返利列表 -->
    <section class="commend-section">
      <header class="commend-header">
        <h2>奖励进度</h2>
        <div class="commend-detail" @click="handleNavigator">
          <span>奖励明细</span>
          <span class="icon icon-right-arrow"></span>
        </div>
      </header>
      <ul class="commend-list">
        <li>
          <h2>
            <span>{{recommendUser}}</span>
            <span>人</span>
          </h2>
          <span>邀请总人数</span>
        </li>
        <li>
          <h2>
            <span>{{recommendFee}}</span>
            <span>元</span>
          </h2>
          <span>邀请返利金额</span>
        </li>
      </ul>
    </section>
    <!-- 底部标识 -->
    <footer class="commend-footer">
      <p>24爱购</p>
    </footer>
    <!-- 规则明细 -->
    <popup :visible="show">
      <section slot="content" class="commend-rule-detail">
        <h4 class="title">规则</h4>
        <ul>
          <li class="item">
            <div class="index">1</div>
            <p class="content">老用户邀请好友注册成为了24爱购用户好友可获得从注册日开始后的三个月内自己下单实付金额的返利5%至余额；</p>
          </li>
          <li class="item">
            <div class="index">2</div>
            <p class="content">老用户第一个月内获得好友下单实付金额的10%，第二和第三个月可获得好友下单实付金额的5%；</p>
          </li>
          <li class="item">
            <div class="index">3</div>
            <p class="content">余额可直接购买24爱购商店中的商品，不可提现；</p>
          </li>
          <li class="item">
            <div class="index">4</div>
            <p class="content">用户邀请的好友必须满足24爱购新用户的条件；</p>
          </li>
          <li class="item">
            <div class="index">5</div>
            <p class="content">24爱购新用户是指使用手机设备、手机号均未在24爱购上注册和下过单的用户；</p>
          </li>
          <li class="item">
            <div class="index">6</div>
            <p class="content">用户获得返利周期为3个月，三个月后不再享受活动返利奖励；</p>
          </li>
          <li class="item">
            <div class="index">7</div>
            <p class="content">用户享受所有被邀请的有效新用户订单实际支付金额的奖励；</p>
          </li>
          <li class="item">
            <div class="index">8</div>
            <p class="content">新用户注册成功后也可以继续邀请好友；</p>
          </li>
          <li class="item">
            <div class="index">9</div>
            <p class="content">如有疑问请咨询24爱购客服；</p>
          </li>
          <li class="item">
            <div class="index">10</div>
            <p class="content">最终解释权归24爱购拥有。</p>
          </li>
        </ul>
        <div class="commend-rule-close" @click="show = false">
          <span class="icon icon-commend-close"></span>
        </div>
      </section>
    </popup>
  </div>
</template>

<script>
import Popup from '../components/Popup'
import { fetchRecommendSummaryAndDetail, fetchRecommendTokenInApp } from '../assets/js/api.js'
import { invokeNativeSign, invokeNativeShare } from '../assets/js/native'
import { encodeQuery } from '../assets/js/util.js'
import { mapGetters } from 'vuex'
import Login from '../assets/js/login.js'
export default {
  mixins: [ Login ],
  components: {
    Popup
  },
  data () {
    return {
      show: false,
      recommendFee: 0,
      recommendUser: 0
    }
  },
  watch: {
    '$store.state.isLogin': {
      handler (newValue) {
        if (newValue) {
          this._fetchSummary()
        } else {
          this.handleActionAfterJudgeLogin()
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters({
      getUserId: 'getUserId'
    })
  },
  methods: {
    _fetchSummary () {
      const userId = this.getUserId
      fetchRecommendSummaryAndDetail({
        userId,
        type: 0
      }).then((res) => {
        const { recommendFee, recommendUser } = res.data || {}
        this.recommendUser = recommendUser
        this.recommendFee = recommendFee
      })
    },
    handleNavigator () {
      this.handleActionAfterJudgeLogin(this.navigatorRewardProgress)
    },
    navigatorRewardProgress () {
      this.$router.push({ name: 'reward-progress'})
    },
    handleInvite () {
      this.handleActionAfterJudgeLogin(this.invite)
    },
    async invite () {
      const { sign, timestamp, userId } = await invokeNativeSign()
      const [ token, err ] = await this._fetchToken({ sign, timestamp, userId })
      if (err) {
        return
      }
      await invokeNativeShare({
        type: ['WechatSession', 'WechatTimeLine'],
        url: `https://test.web.com/?${encodeQuery({ token })}`,
        title: '分享标题',
        description: '分享内容',
        imageLink: 'https://test.web.com/commend-share.png'
      })
    },
    _fetchToken (options) {
      // 获取推荐 TOKEN
      return new Promise((resolve) => {
        fetchRecommendTokenInApp(options).then(data => {
          const token = data.data.message
          resolve([token])
        }).catch(err => resolve([{}, err]))
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/sprite.scss';
$commend-bg: #ef835e; // 页面背景颜色
$price-color: #FF5339; // 金额字体颜色

.commend-page {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  overflow: hidden;
  padding: 730px 0 120px 0;
  width: 100vw;
  min-height: 100vh;
  background: $commend-bg url(../assets/images/commend-bg.png) no-repeat;
  background-size: 100% auto;
}
.commend-rule {
  position: absolute;
  top: 100px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px;
  color: #FFF;
  font-size: 28px;
}

.commend-button-wrap {
  position: relative;
  .button {
    width: 382px;
    height: 78px;
    border-radius: 25px;  
    font-size: 40px;
    outline: none;
    background:rgba(217,0,0,1);
    box-shadow:3px 4px 5px 0px rgba(102,14,136,0.44), 0px 3px 6px 0px rgba(103, 137, 14, 0.35);
    color: #FFF;
  }

  .buttton-modify-prefix, .buttton-modify-suffix {
    position: absolute;
    top: 50%;
    transform: translate3d(0,-50%,0);
  }

  .buttton-modify-prefix {
    left: -90px;
  }

  .buttton-modify-suffix {
    right: -90px;
  }
}

.commend-section {
  margin-top: 50px;
  width: 660px;
  border-radius: 12px;
  background-color: #FFF;
  overflow: hidden;
}
.commend-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 72px;
  background: #FF6136;
  font-size: 24px;
  color: #E5E1E1;
  > h2 {
    font-size: 28px;
    font-weight: 700;
    color: #FFF;
  }
  .commend-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 130px;
  }
}

.commend-list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 50px 0;
  > li {
    list-style: none;
    flex: 1;
    flex-direction: column;
    display: flex;
    align-items: center;
    > h2 {
      display: flex;
      align-items: baseline;
      color: $price-color;
      font-weight: 700;
      font-size: 20px;
      > span:first-child {
        font-size: 36px;
        margin-right: 6px;
      }
    }
    > span {
      margin-top: 47px;
      font-size: 24px;
      font-weight: 500;
    }
  }
}

.commend-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #FFF;
  > p {
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      right: 100px;
      width: 80px;
      height: 1px;
      background-color: #FFF;
      transform: translate3d(0, -50%, 0);
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 100px;
      width: 80px;
      height: 1px;
      background-color: #FFF;
      transform: translate3d(0, -50%, 0);
    }
  }
}

.commend-rule-detail {
  position: relative;
  width: 640px;
  background: #F3E7CB;
  border-radius: 10px;
  padding: 0 40px 40px 40px;

  .title {
    text-align: center;
    line-height: 70px;
    font-weight: bold;
  }

  .item {
    display: flex;
    font-size: 24px;
    color: #333;

    .index {
      width: 32px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      background-color: #FF4C22;
      border-radius: 50%;
      color: #FFF;
      margin-top: 4px;
      font-size: 20px;
    }
    .content {
      flex: 1;
      padding-left: 10px;
      line-height: 1.75;
    }

    & + .item {
      margin-top: 20px;
    }
  }

  .commend-rule-close {
    position: absolute;
    top: -42px;
    right: -42px;
    padding: 20px;
  }
}
</style>
