<template>
  <div class="reward-progress-page">
    <!-- 切换 -->
    <div class="reward-progress-tabs">
      <div class="tab" :class="tabIndex === 1 ? 'is--active' : ''" @click="tabIndex = 1">
        <span>受邀请人</span>
      </div>
      <div class="tab" :class="tabIndex === 2 ? 'is--active' : ''" @click="tabIndex = 2">
        <span>返利金额</span>
      </div>
    </div>
    <div class="reward-progress-list">
      <div v-show="(tabIndex === 1 && peopleList.length === 0) || (tabIndex === 2 && orderList.length === 0)" class="reward-progress-empty">
        <img src="../assets/images/reward-empty.png" class="placeholder-image" alt="占位图">
        <span class="placeholder-text">您暂时还没有{{peopleList.length === 0 && tabIndex === 1 ? '受邀人' : ''}}{{orderList.length === 0 && tabIndex === 2 ? '返利金额' : ''}}</span>
      </div>
      <div v-show="tabIndex === 1">
        <section class="people-info-item" v-for="item in peopleList" :key="item.id">
          <p class="phone">{{item.phone | protectPhone}}</p>
          <div class="time-unit">
            <p class="time">受邀时间</p>
            <p class="time">{{item.optime | timeFormat}}</p>
          </div>
        </section>
      </div>
      <div v-show="tabIndex === 2">
        <section class="order-info-item" v-for="(item, index) in orderList" :key="index">
          <div>
            <p class="phone">{{item.phone | protectPhone}}</p>
            <p class="time">{{item.optime | timeFormat}}</p>
          </div>
          <div>
            <p class="price">支付：{{item.orderFee | priceFormat}}¥</p>
            <p class="price">
              <span>返利</span>
              <span>+{{item.fee | priceFormat}}¥</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchRecommendSummaryAndDetail } from '../assets/js/api.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabIndex: 1,
      peopleList: [],
      orderList: []
    }
  },
  filters: {
    protectPhone (value) {
      return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    timeFormat (value) {
      const time = new Date(value)
      const year = time.getFullYear()
      const month = ('' + (time.getMonth() + 1)).padStart(2, '0')
      const day = ('' + time.getDate()).padStart(2, '0')
      const hours = ('' + time.getHours()).padStart(2, '0')
      const minutes = ('' + time.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },
    priceFormat (value) {
      return parseFloat(value).toFixed(2)
    }
  },
  computed: {
    ...mapGetters({
      getUserId: 'getUserId'
    })
  },
  watch: {
    tabIndex: {
      handler (type) {
        this._fetchList(type)
      },
      immediate: true
    }
  },
  methods: {
    _fetchList (type) {
      const userId = this.getUserId
      fetchRecommendSummaryAndDetail({
        userId,
        type
      }).then(res => {
        const list = res.data || []
        if (type === 1) {
          this.peopleList = list
        } else {
          this.orderList = list
        }
      })
    }
  }
}
</script>

<style lang="scss">
.reward-progress-page {
  background:#FFF linear-gradient(180deg,rgba(255,75,31,1),rgba(255,255,255,1)) no-repeat;
  background-size: 100% 535px;
  min-height: 100vh;
  padding: 120px 0 20px 0;
}

.reward-progress-tabs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background:#FFF linear-gradient(180deg,rgba(255,75,31,1),rgba(255,255,255,1)) no-repeat;
  background-size: 100% 535px;
  margin: 0 auto;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  overflow: hidden;
  .tab {
    width: 214px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:2px solid rgb(222,224,230);

    &:first-child {
      border-radius: 10px 0 0 10px;
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }

    &.is--active {
      background-color: #F93939;
      border-color: #F93939;
    }
  }
}

.reward-progress-empty {
  width: 690x;
  height: calc(100vh - 120px);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  .placeholder-image {
    width: 276px;
    height: 322px;
  }
  .placeholder-text {
    font-size: 30px;
    color: rgb(129,129,129);
    padding: 30px 0;
  }
}

.reward-progress-list {
  .people-info-item, .order-info-item {
    width: 690px;
    height: 160px;
    background: #FFF;
    border-radius: 20px;
    margin: 30px auto 0 auto;
    padding: 30px;
    box-shadow:0px 30px 60px 0px rgba(19,104,158,0.1), 0px 30px 60px 0px rgba(19,104,158,0.1);
    font-size: 30px;
  }
  .people-info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .time-unit {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      justify-content: space-around;
      height: 100%;
    }
  }

  .phone {
    letter-spacing: 1px;
    color: #555;
  }

  .time {
    font-size: 20px;
    color: #AAA;
  }

  .order-info-item {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price {
        font-size: 30px;
        font-weight: bold;
        > span {
          &:last-child {
            padding-left: 20px;
            color: red;
          }
        }
      }
    }
  }
}
</style>
