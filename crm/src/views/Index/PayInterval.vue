<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="pay-interval__title">消费区间分析</div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
         <div class="pay-interval__cake">
          <div class="pay-interval__cake__title">
            <span>消费区间占比</span>
            <!-- <el-button-group>
              <el-button type="primary" size="mini">全部</el-button>
              <el-button type="primary" size="mini">app</el-button>
              <el-button type="primary" size="mini">小程序</el-button>
              <el-button type="primary" size="mini">触摸屏</el-button>
            </el-button-group> -->
          </div>
          <CakeG2 :id="'cake'" :list="payIntervalCakeData"></CakeG2>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="pay-interval__trend">
          <div class="pay-interval__trend_title">
            <span>消费区间走势</span>
            <el-date-picker
              @change="handlechangeDate"
              size="small"
              v-model="PayIntervalvalue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <TrendG2 class="TrendG2" :id="'trend'" :list="payIntervalTrendData"></TrendG2>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
          <DataTable
            :list="tableData"
            :current-page="1"
            :total="10"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CakeG2 from '../../components/PayInterval/PayIntervalCake.vue'
import TrendG2 from '../../components/PayInterval/PayIntervalTrend.vue'
import DataTable from '../../components/DataTable.vue'
import { fetchPayIntervalData } from '../../assets/js/api'

export default {
  data() {
    return {
      value2: '',
      PayIntervalvalue: [],
      tableData: [],
      payIntervalCakeData: [],
      payIntervalTrendData: [],
    }
  },
  watch: {
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        const start = this.$moment().subtract(1, 'months').format('YYYY-MM-DD')
        const end = this.$moment().format('YYYY-MM-DD')
        this.handleGetALLPayintervalG2Data(newValue, start, end)
        this.PayIntervalvalue = [start, end]
      }
    },
    immediate: true,
  },
  methods: {
    async handleGetALLPayintervalG2Data(marketId, start = null, end = null) {
      const { data: { data: { payIntervalCake, payIntervalTrend } } } = await fetchPayIntervalData({ marketId, start, end })
      // 饼状图数据
      this.payIntervalCakeData = payIntervalCake
      // 折线图数据
      this.payIntervalTrendData = payIntervalTrend
      // 表格数据
      const payIntervalTableData = JSON.parse(JSON.stringify(payIntervalTrend))
      const newData = payIntervalTableData.map(item => (
        {
          日期: item.date,
          订单类型: item.type,
          金额: item.value,
        }))
      this.tableData = newData
    },
    handlechangeDate() {
      const id = localStorage.getItem('marketId')
      const start = this.$moment(this.PayIntervalvalue[0]).format('YYYY-MM-DD')
      const end = this.$moment(this.PayIntervalvalue[1]).format('YYYY-MM-DD')
      this.handleGetALLPayintervalG2Data(id, start, end)
    },
  },
  components: {
    CakeG2,
    TrendG2,
    DataTable,
  },
  mounted() {
    const id = localStorage.getItem('marketId')
    const start = this.$moment().subtract(1, 'months').format('YYYY-MM-DD')
    const end = this.$moment().format('YYYY-MM-DD')
    this.PayIntervalvalue = [start, end]
    this.handleGetALLPayintervalG2Data(id, start, end)
  },
}
</script>

<style lang="scss">
.pay-interval__title {
  font-size: 22px;
}
.pay-interval__cake{
  border-radius: 10px;
  background: #fff;
    .pay-interval__cake__title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 10px;
    border-bottom:2px solid  #F0F2F5;
  }
}
.pay-interval__trend{
  border-radius: 10px;
  background: #fff;
  .pay-interval__trend_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 10px;
    border-bottom:2px solid  #F0F2F5;
  }
}
.pay-interval__focus-picture{
  width:100%;
  padding:10px 0  10px 0px;
  border-radius: 10px;
  background: #fff;
  .pay-interval__word{
    width:100%;
    display: flex;
    padding:10px 10px;
    border-bottom:2px solid #F0F2F5;
  }
  .pay-interval__show{
    width:100%;
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
