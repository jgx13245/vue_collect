<template>
  <div>
    <el-row style="width:100%;" class="user-info__title">
       <el-col>用户管理</el-col>
    </el-row>
    <el-row style="width:100%;" class="user-info__search">
      <el-col :span="12">用户搜索</el-col>
       <el-col :span="24">
         <el-input v-model="input" type="text"  min="0" placeholder="请输入手机号"></el-input>
       </el-col>
       <el-col :span="12" class="icon-wrap">
         <el-button type="primary" size="small" style="margin-left:20px;" @click="handleSearch" icon="el-icon-search">搜索</el-button>
         <!-- <el-button type="primary" size="middle" @click="handleSearchAll">全部</el-button> -->
         <i class="el-icon-refresh" @click="handleSearchAll" style="margin-left:20px;"></i>
       </el-col>
    </el-row>
    <el-row>
      <div class="user-info__table">
        <DataTable
        @handleOrderUserId="handleOrderUserId"
        @handleGoodsUserId="handleGoodsUserId"
        @handleTimeUserId="handleTimeUserId"
        @pagechange="pagechange"
        :list="userTableData"
        :current-page="currentPage"
        :total="total"
        :showPagination="showPagination"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DataTable from '../../components/UserInfoG2/UserInfoDataTable.vue'
import { fetchUserData } from '../../assets/js/api'
import { checkPhone } from '../../assets/js/utils'

export default {
  data() {
    return {
      userTableData: [],
      total: 0,
      input: '',
      currentPage: 1,
      showPagination: true,
    }
  },
  watch: {
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        const pageSize = 10
        const pageNumber = 1
        this.currentPage = 1
        this.input = ''
        this.handleGetUserData(newValue, pageSize, pageNumber)
      }
    },
    immediate: true,
  },
  components: {
    DataTable,
  },
  computed: {
    ...mapState(['searchPhone', 'pageNumber']),
  },
  methods: {
    ...mapMutations({
      updateSearchPhone: 'updateSearchPhone',
      updatePageNumber: 'updatePageNumber',
    }),
    // 搜索用户
    handleSearch() {
      const id = localStorage.getItem('marketId')
      const pageSize = 10
      const pageNumber = 1
      if (checkPhone(this.input)) {
        const phone = this.input
        this.handleGetUserData(id, pageSize, pageNumber, phone)
        this.updateSearchPhone({ phone })
      } else {
        this.$message.error('请输入正确的手机号')
      }
    },
    // 全部用户
    handleSearchAll() {
      this.input = ''
      const id = localStorage.getItem('marketId')
      const pageSize = 10
      const pageNumber = 1
      this.currentPage = 1
      this.showPagination = false
      this.handleGetUserData(id, pageSize, pageNumber)
      this.$nextTick(() => {
        this.showPagination = true
      })
      const phone = ''
      this.updateSearchPhone({ phone })
    },
    // 更改页码
    pagechange(page) {
      const id = localStorage.getItem('marketId')
      const pageSize = 10
      this.handleGetUserData(id, pageSize, page)
      this.updatePageNumber({ page })
    },
    // 用户数据接口
    async handleGetUserData(marketId, pageSize, pageNumber, phone = null) {
      const userData = await fetchUserData({
        marketId,
        pageSize,
        pageNumber,
        phone,
      })
      const oldData = userData.data.data.list
      const newData = oldData.map(item => (
        {
          手机号: item.phone,
          昵称: item.name,
          性别: item.sex,
          注册时间: item.optime,
          userId: item.userId,
        }))
      this.userTableData = newData
      this.total = userData.data.data.count
    },
    // 跳转页面
    handleOrderUserId(index) {
      this.$router.push({
        name: 'userOrder',
        query: {
          id: index,
        },
      })
    },
    handleGoodsUserId(index) {
      this.$router.push({
        name: 'userGoods',
        query: {
          id: index,
        },
      })
    },
    handleTimeUserId(index) {
      this.$router.push({
        name: 'userTime',
        query: {
          id: index,
        },
      })
    },
  },
  mounted() {
    const id = localStorage.getItem('marketId')
    const pageSize = 10
    // 用户搜索返回还是该用户
    if (this.searchPhone !== '') {
      const pageNumber = 1
      this.currentPage = 1
      this.input = this.searchPhone
      this.handleGetUserData(id, pageSize, pageNumber, this.searchPhone)
    }
    // 用户没有搜索点击了页码
    if (this.pageNumber !== '' && this.searchPhone === '') {
      this.currentPage = Number(this.pageNumber)
      this.handleGetUserData(id, pageSize, this.pageNumber)
    }
    // 用户没有搜索也没有点击页码
    if (this.pageNumber === '' && this.searchPhone === '') {
      const pageNumber = 1
      this.currentPage = 1
      this.handleGetUserData(id, pageSize, pageNumber)
    }
  },
}
</script>

<style lang="scss">
.user-info__title{
  width:100%;
  height:30px;
  padding-left: 20px;
  font-size: 18px;
  line-height: 30px;
  color:#409EFF;
  background: #fff;
  box-shadow: 5px 0 6px 0 rgba(0,0,0,0.13);
}
.user-info__search{
  width:100%;
  height:50px;
  margin-top:20px;
  margin-bottom:0;
  border-bottom: 1px solid #F0F2F5;
  padding-left: 16px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#000;
  background: #fff;
}
.user-info .el-col {
  width: 20%;
  border-right: 2px solid #F0F2F5;
}
.icon-wrap{
  font-size:30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
