<template>
  <div>
    <el-row style="width:100%;" class="user-order__title">
      <i class="el-icon-back" @click="handleBack"></i>
       <el-col style="margin-left:10px;">用户订单</el-col>
    </el-row>
    <el-row>
      <div class="user-order__table">
        <div class="user-order__select">
          <el-date-picker
            v-model="valueDayDate"
            type="date"
            placeholder="选择日期"
            @change="trendDayChange">
          </el-date-picker>
        </div>
        <DataTable
        :list="userTableData"
        :current-page="1"
        :total="10"/>
      </div>
    </el-row>
    <el-row>
      <div class="user-order__title">24小时-用户下单数量</div>
      <div class="user-order__cake">
       <OrderTimeCakeG2 :id="'cake'" :list="orderTimeCakeData" class="cakeG2"></OrderTimeCakeG2>
      </div>
    </el-row>
  </div>
</template>

<script>
import DataTable from '../../components/UserInfoG2/UserOrderDataTable.vue'
import { fetchUserOrderData } from '../../assets/js/api'
import OrderTimeCakeG2 from '../../components/UserInfoG2/UserOrderCake.vue'

export default {
  data() {
    return {
      userTableData: [],
      orderTimeCakeData: [],
      valueDayDate: '',
    }
  },
  // watch: {
  //   '$store.state.MarketId'(newValue) {
  //     if (newValue) {
  //       const userId = this.$route.query.id
  //       this.handleGetUserOrderData(newValue, userId)
  //     }
  //   },
  //   immediate: true,
  // },
  components: {
    DataTable,
    OrderTimeCakeG2,
  },
  methods: {
    trendDayChange() {
      const userId = this.$route.query.id
      const Day = this.$moment(this.valueDayDate).format('YYYY-MM-DD')
      this.handleGetUserOrderData(userId, Day)
    },
    async handleGetUserOrderData(userId, Day) {
      const { data } = await fetchUserOrderData({ userId, Day })
      const { data: { orderList, cakeList } } = data
      if (orderList.length === 0) {
        this.$message.error('该用户没有下单')
      }
      const oldData = orderList
      const newData = oldData.map(item => (
        {
          订单Id: item.orderId,
          超市名称: item.marketName,
          订单总金额: item.fee,
          订单支付金额: item.pay,
          订单状态: item.station,
          交易累型: item.tradeType,
          订单类型: item.type,
          下单时间: item.optime,
        }))
      this.userTableData = newData
      this.orderTimeCakeData = cakeList
    },
    handleBack() {
      this.$router.push({ path: './userInfo' })
    },
  },
  mounted() {
    const userId = this.$route.query.id
    const Day = this.$moment().format('YYYY-MM-DD')
    this.valueDayDate = Day
    // const userId = '1008348'
    this.handleGetUserOrderData(userId, Day)
  },
}
</script>

<style lang="scss">
.user-order__title{
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
.user-order__table{
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
.user-order__cake{
  background: #fff;
  margin-top:20px;
}
.user-order .el-col {
  width: 20%;
  border-right: 2px solid #F0F2F5;
}
</style>
