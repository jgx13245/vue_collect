<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="market-time__title">超市运营状态分析</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="market-time__focus-picture">
          <div class="market-time__word">
            <span>超市运营状态</span>
            <el-date-picker
              v-model="MarketvalueDayDate"
              type="date"
              placeholder="选择日期"
              @change="trendMarketChange">
            </el-date-picker>
          </div>
          <div class="market-time__show">
            <MarketStatusTrendG2 :id="'MarketTrendG2'" :list="MarketStatusTrendG2Data" class="MarketTrendG2"></MarketStatusTrendG2>
          </div>
        </div>
      </el-col>
    </el-row>
     <el-row>
        <div class="market-time_count">
          <div class="market-time_title">
            <span>运营状态总时长</span>
          </div>
          <el-table
          :data="tableData"
          style="width: 100%"
          >
          <el-table-column
            align="center"
            prop="operationTime"
            label="运营总时间"
            style="33.3%"
           >
          </el-table-column>
          <el-table-column
            align="center"
            prop="storageTime"
            label="上货总时间"
            style="33.3%">
          </el-table-column>
          <el-table-column
            align="center"
            prop="vindicateTime"
            label="维护总时间"
            style="33.3%">
          </el-table-column>
        </el-table>
        </div>
      </el-row>
  </div>
</template>
<script>
import MarketStatusTrendG2 from '../../components/Market/MarketStatus.vue'


import {
  fetchMarketHistogramData,
} from '../../assets/js/api'

export default {
  data() {
    return {
      MarketStatusTrendG2Data: [],
      MarketvalueDayDate: [],
      tableData: [],
    }
  },
  watch: {
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        // const start = this.$moment().subtract('days', 7).format('YYYY-MM-DD')
        // const end = this.$moment().format('YYYY-MM-DD')
        const Day = this.$moment().format('YYYY-MM-DD')
        this.handleGetMarketStatusTrendG2Data(newValue, Day)
        this.MarketvalueDayDate = Day
      }
    },
    immediate: true,
  },
  methods: {
    // 一段时间下单时间改变
    trendMarketChange() {
      // const start = this.$moment(this.valueMarketTrendDate[0]).format('YYYY-MM-DD')
      // const end = this.$moment(this.valueMarketTrendDate[1]).format('YYYY-MM-DD')
      const Day = this.$moment(this.MarketvalueDayDate).format('YYYY-MM-DD')
      const id = localStorage.getItem('marketId')
      this.handleGetMarketStatusTrendG2Data(id, Day)
    },
    // 调取接口
    async handleGetMarketStatusTrendG2Data(marketId, Day) {
      const { data } = await fetchMarketHistogramData({ marketId, Day })
      if (data.data === '暂时没有数据') {
        this.MarketStatusTrendG2Data = []
        this.tableData = []
        this.$message.error('该日期没有数据，选择正确的时间吧')
      } else {
        const { data: { countMarketTime, marketTime } } = data
        const newMarketTime = marketTime.map((item) => {
          const newItem = JSON.parse(JSON.stringify(item))
          newItem.name = `${newItem.name} ${newItem.sTime}--${newItem.eTime}`
          newItem.names = newItem.name
          delete newItem.name
          return newItem
        })
        this.MarketStatusTrendG2Data = newMarketTime
        this.tableData = countMarketTime
      }
    },
  },
  components: {
    MarketStatusTrendG2,
  },
  mounted() {
    const id = localStorage.getItem('marketId')
    // const start = this.$moment().subtract('days', 7).format('YYYY-MM-DD')
    // const end = this.$moment().format('YYYY-MM-DD')
    const Day = this.$moment().format('YYYY-MM-DD')
    this.handleGetMarketStatusTrendG2Data(id, Day)
    this.MarketvalueDayDate = Day
  },
}
</script>

<style lang="scss">

.market-time__focus-picture{
  padding:10px 0  10px 0;
  margin-top:10px;
  border-radius: 10px;
  background: #fff;
  .market-time__word{
    width:100%;
    padding:10px 10px;
    border-bottom:2px solid #F0F2F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.market-time_count{
  padding:10px 0  10px 0;
  margin-top:10px;
  border-radius: 10px;
  background: #fff;
  .market-time_title{
    width:100%;
    padding:10px 10px;
    border-bottom:2px solid #F0F2F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>
