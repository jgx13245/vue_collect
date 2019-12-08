<template>
  <div class="flash-sale-wrap">
    <div class="flash-sale-header">
      <igo-tab :list="tabs" :currentTabIndex="currentTabIndex" @change="handleTabIndexChange"/>
    </div>
    <igo-count-down :timestamp="1554108830000"/>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="flash-sale-item" v-for="(item, index) in goodsList" :key="index">
        <div class="goods-image"></div>
        <section class="goods-content">
          <h3>美味蔬菜沙拉美味蔬菜沙拉美味蔬菜沙拉美味蔬菜沙拉美味蔬菜沙拉</h3>
          <p class="price">
            <span>¥</span>
            <span>9.9</span>
            <span>¥28.88</span>
          </p>
          <a class="btn" href="javascript:;">马上抢</a>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import IgoTab from '../components/IgoTab'
import IgoCountDown from '../components/IgoCountDown'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  components: {
    IgoTab,
    IgoCountDown
  },
  directives: {
    infiniteScroll
  },
  data () {
    return {
      currentTabIndex: 0,
      busy: false,
      tabs: [
        {
          label: '00:00',
          status: '已结束'
        },
        {
          label: '05:00',
          status: '已结束'
        },
        {
          label: '10:00',
          status: '正在疯抢'
        },
        {
          label: '14:00',
          status: '即将开始'
        },
        {
          label: '17:00',
          status: '即将开始'
        },
        {
          label: '20:00',
          status: '即将开始'
        }
      ],
      goodsList: []
    }
  },
  methods: {
    handleTabIndexChange (index) {
      this.currentTabIndex = index
      this.goodsList = []
    },
    loadMore () {
      this.busy = true
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.goodsList.push({})
        }
        this.busy = false
      })
    }
  }
}
</script>

<style lang="scss">
.flash-sale-wrap {
  padding-top: 122px;
  min-height: 100vh;
  padding-bottom: 50px;
  background-color: #f5f5f5;
}

.flash-sale-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.flash-sale-item {
  padding: 20px;
  background-color: #FFF;
  overflow: hidden;
  display: flex;
  flex-flow: row nowrap;
  .goods-image {
    width: 200px;
    height: 200px;
    background: red;
  }
  .goods-content {
    position: relative;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-flow: column wrap;
    padding: 0 20px;
    justify-content: space-between;
    > h3 {
      padding: 0;
      margin: 0;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .price {
      display: flex;
      align-items: baseline;
      > span {
        &:first-child {
          color: #e04e39;
          font-size: 20px;
          font-weight: bold;
        }
        &:nth-child(2) {
          color: #e04e39;
          font-size: 46px;
          font-weight: bold;
        }
        &:last-child {
          padding-left: 10px;
          color: #a1a1a1;
          text-decoration: line-through;
          font-size: 24px;
        }
      }
    }

    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      color: #FFF;
      background-color: #e04e39;
      text-decoration: none;
      padding: 20px 40px;
      font-size: 26px;
      font-weight: bold;
      border-radius: 4px;
    }
  }

  & + .flash-sale-item {
    margin-top: 10px;
  }
}
</style>
