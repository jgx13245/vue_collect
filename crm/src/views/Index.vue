<template>
  <el-container>
    <el-aside :width="asideWidth" style="background-color: #041427;">
      <el-header style="background: #fff;" class="aside-header">
        24-igo
      </el-header>
      <el-menu
        default-active="4"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#041427"
        active-text-color="#FFF"
        text-color="#666666"
        router
        >
        <el-menu-item index="/home">
          <i class="el-icon-message"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">订单数据</span>
          </template>
          <el-menu-item index="orderType">订单类型</el-menu-item>
          <el-menu-item index="payInterval">消费区间</el-menu-item>
          <el-menu-item index="orderTime">下单时间</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">商品数据</span>
          </template>
          <el-menu-item index="goods">商品类型</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">超市状态</span>
          </template>
          <el-menu-item index="market">运营状态</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">用户分析</span>
          </template>
          <el-menu-item index="userInfo">用户数据</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="content-wrap">
      <el-header class="igo-header">
        <div  class="igo-header_market">
          <span class="icon icon-menu-collapse" @click="handleCollapseMenu"></span>
           当前超市为:
          <div>
            <el-select v-model="marketId" placeholder="请选择" @change="change" :disabled="selectMarket">
              <el-option
                v-for="item in options"
                :key="item.marketId"
                :label="item.marketName"
                :value="item.marketId"
                >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-header>
      <el-main class="igo-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { fentcHomeMarketList } from '../assets/js/api'

export default {
  data() {
    return {
      isCollapse: false,
      asideWidth: '',
      options: [],
      marketId: '',
      // selectStatus:false
    }
  },
  computed: {
    ...mapState(['selectMarket']),
  },
  watch: {
    isCollapse: {
      handler(newValue) {
        if (newValue) {
          this.asideWidth = '65px'
          return
        }
        this.asideWidth = '160px'
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations({
      updateMarketId: 'updateMarketId',
      updateMarketList: 'updateMarketList',
    }),
    async getMarketList(currentUserId) {
      console.log(this)
      // 获取头部超市的信息
      const { data: { data } } = await fentcHomeMarketList({ currentUserId })
      this.options = data
      this.updateMarketList(data)
      this.marketId = data[0].marketId
      this.updateMarketId(this.marketId)
      this.$router.push({ path: './home' })
    },
    change() {
      this.updateMarketId(this.marketId)
    },
    handleCollapseMenu() {
      if (this.isCollapse) {
        this.isCollapse = false
        return
      }
      this.isCollapse = true
    },
  },
  mounted() {
    const currentUserId = this.$route.query.currentUserId
    // const currentUserId = 1
    this.getMarketList(currentUserId)
  },
}
</script>

<style lang="scss">
.aside-header{
  color:#1890FF;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-bottom: 1px solid #ccc;
}
.content-wrap{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.igo-header {
  background-color: #FFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  border-bottom: 1px solid #ccc;
}
.igo-header_market{
  width:350px;
  height:60px;
  color:#1890FF;
  font-size:20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.igo-header_title{
  width:300px;
  height:50px;
  text-align: center;
  line-height: 50px;
  font-size:20px;
  font-weight: bold;
  color:#1890FF;
}
.igo-main {
  width:100%;
  flex:1;
}
.el-submenu .el-menu-item{
  background: #FFF;
  min-width: 140px;
}
.el-menu{
  border: none;
}
</style>
