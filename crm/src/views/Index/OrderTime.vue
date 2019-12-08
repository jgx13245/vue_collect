<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="order-time__title">下单时间分析</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="order-time__focus-picture">
          <div class="order-time__word">
            <span>24小时-支付笔数走势图</span>
            <el-date-picker
              v-model="valueDayDate"
              type="date"
              placeholder="选择日期"
              @change="trendDayChange">
            </el-date-picker>
          </div>
          <div class="order-time__show">
            <OrderTimeTrendG2 :id="'OrderTimeTrendG2'" :list="orderTimeTrendDayData"></OrderTimeTrendG2>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="order-time__cake">
          <div class="order-time__cake__title">
            <span>24小时-下单时间占比</span>
            <!-- <el-button-group>
              <el-button type="primary" size="mini">全部</el-button>
              <el-button type="primary" size="mini">app</el-button>
              <el-button type="primary" size="mini">小程序</el-button>
              <el-button type="primary" size="mini">触摸屏</el-button>
            </el-button-group> -->
          </div>
          <OrderTimeCakeG2 :id="'cake'" :list="orderTimeCakeData" class="cakeG2"></OrderTimeCakeG2>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="order-time__trend">
          <div class="order-time__trend_title">
            <span>下单时间-商品销售</span>
            <el-date-picker
              size="mini"
              v-model="valueTrendDate"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="trendChange">
            </el-date-picker>
          </div>
          <OrderTimeTrendDateG2
            class="trendG2"
            :id="'trend'"
            :list="orderTimeTrendDateData">
          </OrderTimeTrendDateG2>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <DataTable
          :list="tableData"
          :current-page="1"
          :total="10"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import OrderTimeTrendG2 from '../../components/OrderTime/OrderTimeTrend.vue'
import OrderTimeCakeG2 from '../../components/OrderTime/OrderOneDayCake.vue'
import OrderTimeTrendDateG2 from '../../components/OrderTime/OrderTimeTrendDate.vue'
import DataTable from '../../components/DataTable.vue'
import {
  fetchOrderTimeCakeData,
  fetchOrderTimeTrendDayData,
  fetchOrderTimeTrendData,
} from '../../assets/js/api'

export default {
  data() {
    return {
      valueDayDate: '',
      valueTrendDate: [],
      tableData: [],
      orderTimeCakeData: [],
      orderTimeTrendDayData: [],
      orderTimeTrendDateData: [],
    }
  },
  watch: {
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        const Day = this.$moment().format('YYYY-MM-DD')
        this.handleGetOrderTimeCakeG2Data(newValue, Day)
        // 当天时间
        this.handleGetOrderTimeTrendDayG2Data(newValue, Day)
        this.valueDayDate = Day
        // 一段时间
        const start = this.$moment().subtract('days', 7).format('YYYY-MM-DD')
        const end = this.$moment().format('YYYY-MM-DD')
        this.handleGetOrderTimeTrendG2Data(newValue, start, end)
        this.valueTrendDate = [start, end]
      }
    },
    immediate: true,
  },
  methods: {
    // 当天下单时间改变
    trendDayChange() {
      const id = localStorage.getItem('marketId')
      const Day = this.$moment(this.valueDayDate).format('YYYY-MM-DD')
      this.handleGetOrderTimeTrendDayG2Data(id, Day)
      this.handleGetOrderTimeCakeG2Data(id, Day)
    },
    // 一段时间下单时间改变
    trendChange() {
      const start = this.$moment(this.valueTrendDate[0]).format('YYYY-MM-DD')
      const end = this.$moment(this.valueTrendDate[1]).format('YYYY-MM-DD')
      const id = localStorage.getItem('marketId')
      this.handleGetOrderTimeTrendG2Data(id, start, end)
    },
    // 饼状图数据
    async handleGetOrderTimeCakeG2Data(marketId, Day) {
      const { data: { data } } = await fetchOrderTimeCakeData({ marketId, Day })
      this.orderTimeCakeData = data
    },
    // 一天时间曲线走势图
    async handleGetOrderTimeTrendDayG2Data(marketId, Day) {
      const { data: { data } } = await fetchOrderTimeTrendDayData({ marketId, Day })
      this.orderTimeTrendDayData = data
    },
    // 一段时间曲线走势图
    async handleGetOrderTimeTrendG2Data(marketId, start = null, end = null) {
      const { data: { data } } = await fetchOrderTimeTrendData({ marketId, start, end })
      this.orderTimeTrendDateData = data
      // 处理数据把值赋给表格
      const orderTimeTrendDataCopy = JSON.parse(JSON.stringify(data))
      const TableDataTrend = []
      orderTimeTrendDataCopy.map((item) => {
        const itemCopy = item
        delete itemCopy.type
        TableDataTrend.push(itemCopy)
        return TableDataTrend
      })
      // 修改英文名字为汉字
      const newData = TableDataTrend.map(item => (
        {
          日期: item.date,
          货物分类: item.name,
          数量: item.value,
        }))
      this.tableData = newData
    },
  },
  components: {
    OrderTimeTrendG2,
    OrderTimeCakeG2,
    OrderTimeTrendDateG2,
    DataTable,
  },
  mounted() {
    const Day = this.$moment().format('YYYY-MM-DD')
    // 当天饼状图
    const id = localStorage.getItem('marketId')
    this.handleGetOrderTimeCakeG2Data(id, Day)
    // 当天下单时间返显
    this.handleGetOrderTimeTrendDayG2Data(id, Day)
    this.valueDayDate = Day
    // 一段时间下单时间返显
    const start = this.$moment().subtract('days', 7).format('YYYY-MM-DD')
    const end = this.$moment().format('YYYY-MM-DD')
    this.handleGetOrderTimeTrendG2Data(id, start, end)
    this.valueTrendDate = [start, end]
  },
}
</script>

<style lang="scss">
.order-time__cake{
  border-radius: 10px;
  background: #fff;
  .order-time__cake__title{
    display: flex;
    font-size:14px;
    justify-content: space-between;
    align-items: center;
    padding:14px 10px;
    border-bottom:2px solid  #F0F2F5;
  }
  .cakeG2{
    padding: 10px;
  }
}
.order-time__trend{
  border-radius: 10px;
  background: #fff;
  .order-time__trend_title{
    font-size:14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 10px;
    border-bottom:2px solid  #F0F2F5;
  }
  .trendG2{
    padding:10px;
  }
}
.order-time__focus-picture{
  padding:10px 0  10px 0px;
  margin-top:10px;
  border-radius: 10px;
  background: #fff;
  .order-time__word{
    width:100%;
    padding:10px 10px;
    border-bottom:2px solid #F0F2F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  &:first-child {
    margin-bottom: 0;
  }
}
</style>
