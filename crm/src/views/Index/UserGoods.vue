<template>
  <div>
    <el-row style="width:100%;margin-bottom:20px;" class="user-goods__title">
      <i class="el-icon-back" @click="handleBack"></i>
       <el-col style="margin-left:10px;">用户购买商品</el-col>
    </el-row>
     <el-row>
      <div class="user-goods__table">
        <div class="user-order__select">
          <el-date-picker
            v-model="valueDayGoodsDate"
            type="date"
            placeholder="选择日期"
            @change="trendDayGoodsChange">
          </el-date-picker>
        </div>
        <DataTable
        :list="userTableData"
        :current-page="1"
        :total="10"/>
      </div>
    </el-row>
     <el-row>
      <div  class="user-order__title">用户购买商品</div>
      <div class="goods-kind__container">
          <GoodsHistogram :id="'goodsHistogram'" :list="goodsHistogram"></GoodsHistogram>
      </div>
    </el-row>
  </div>
</template>

<script>
import DataTable from '../../components/UserInfoG2/UserGoodsDataTable.vue'
import { fetchUserGoodsData } from '../../assets/js/api'
import GoodsHistogram from '../../components/UserInfoG2/UserGoodsCake.vue'

export default {
  data() {
    return {
      value1: '',
      input: '',
      selectShow: false,
      userTableData: [],
      goodsHistogram: [],
      valueDayGoodsDate: '',
    }
  },
  // watch: {
  //   '$store.state.MarketId'(newValue) {
  //     if (newValue) {
  //       const userId = this.$route.query.id
  //       this.handleGetUserGoodsData(newValue, userId)
  //     }
  //   },
  //   immediate: true,
  // },
  components: {
    DataTable,
    GoodsHistogram,
  },
  methods: {
    trendDayGoodsChange() {
      const userId = this.$route.query.id
      const Day = this.$moment(this.valueDayGoodsDate).format('YYYY-MM-DD')
      this.handleGetUserGoodsData(userId, Day)
    },
    async handleGetUserGoodsData(userId, Day) {
      const { data } = await fetchUserGoodsData({ userId, Day })
      const { data: { goodsList, histogramList } } = data
      if (goodsList.length === 0) {
        this.goodsList = []
        this.$message.error('该用户没有商品数据')
      }
      const oldData = goodsList
      const newData = oldData.map(item => (
        {
          商品订单: item.orderId,
          超市名称: item.marketName,
          商品进价: item.cost,
          商品名称: item.name,
          商品数量: item.number,
          商品单价: item.price,
        }))
      this.userTableData = newData
      this.goodsHistogram = histogramList
    },
    handleBack() {
      this.$router.push({ path: './userInfo' })
    },
  },
  mounted() {
    const userId = this.$route.query.id
    const Day = this.$moment().format('YYYY-MM-DD')
    this.valueDayGoodsDate = Day
    // const userId = '1008348'
    this.handleGetUserGoodsData(userId, Day)
  },
}
</script>

<style lang="scss">
.user-goods__title{
  width:100%;
  height:30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  color:#409EFF;
  background: #fff;
  box-shadow: 5px 0 6px 0 rgba(0,0,0,0.13);
}
.el-icon-back:hover{
  cursor: pointer;
}
.user-goods__table{
  background: #fff;
  margin-top:20px;
}
.user-order__select{
  width:100%;
  height:50px;
  border-bottom:1px solid #F0F2F5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding:10px 20px;
}
.user-goods .el-col {
  width: 20%;
  border-right: 2px solid #F0F2F5;
}
</style>
