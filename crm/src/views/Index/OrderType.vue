<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="order-type__header">
          <div class="order-type__title">订单类型分析</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="order-type__picture">
          <div class="order-type__picture-select">
            <div class="order-type__picture-title">订单类型-方式分析</div>
            <div class="order-type__picture-type">
              <!-- <el-button-group @click.native="handleSelectOrderType($event,'.js-all','.js-self','.js-send')">
                <el-button type="primary" size="mini" class="js-all">全部</el-button>
                <el-button type="primary" size="mini" class="js-self">自取</el-button>
                <el-button type="primary" size="mini" class="js-send">配送</el-button>
              </el-button-group> -->
              <el-date-picker
                class="el-date-picker"
                v-model="value2"
                type="daterange"
                size="small"
                align="right"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="change"
               >
              </el-date-picker>
            </div>
          </div>
          <div class="order-type__picture-g2">
            <orderTypeHistogramG2 :id="'c1'" :list="orderTypeDataG2"></orderTypeHistogramG2>
          </div>
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
import orderTypeHistogramG2 from '../../components/OrderType/OrderTypeTrend.vue'
import { fetchOrderTypeData } from '../../assets/js/api'
import { closest } from '../../assets/js/utils'
import DataTable from '../../components/DataTable.vue'

export default {
  data() {
    return {
      value2: [],
      value: '',
      orderTypeDataG2: [],
      orderTypeDataG2Copy: [],
      tableData: [],
      tableDataCopy: [],
    }
  },
  watch: {
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        const start = this.$moment().subtract(1, 'months').format('YYYY-MM-DD')
        const end = this.$moment().format('YYYY-MM-DD')
        this.handleGetOrderTypeData(newValue, start, end)
        this.value2 = [start, end]
      }
    },
    immediate: true,
  },
  methods: {
    change() {
      const start = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const end = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const id = localStorage.getItem('marketId')
      this.handleGetOrderTypeData(id, start, end)
    },
    async handleGetOrderTypeData(marketId, start, end) {
      const { data: { data } } = await fetchOrderTypeData({ marketId, start, end })
      this.orderTypeDataG2 = data
      console.log(data)
      this.orderTypeDataG2Copy = data
      const newData = data.map(item => (
        {
          日期: item.date,
          购买方式: item.type,
          // 取货类型: item.getType,
          数量: item.value,
        }))
      this.tableData = newData
      this.tableDataCopy = newData
    },
    handleSelectOrderType(e, selectorAll, selectorSelf, selectorSend) {
      const target = e.target
      const currentTargetAll = closest(target, selectorAll)
      const currentTargetSelf = closest(target, selectorSelf)
      const currentTargetSend = closest(target, selectorSend)
      if (currentTargetAll) {
        this.tableData = this.tableDataCopy
        this.orderTypeDataG2 = this.orderTypeDataG2Copy
      } else if (currentTargetSelf) {
        this.tableData = this.tableDataCopy.filter(item => (item.取货类型 === '自取'))
        this.orderTypeDataG2 = this.orderTypeDataG2Copy.filter(item => (item.getType === '自取'))
      } else if (currentTargetSend) {
        this.tableData = this.tableDataCopy.filter(item => (item.取货类型 === '配送'))
        this.orderTypeDataG2 = this.orderTypeDataG2Copy.filter(item => (item.getType === '配送'))
      }
    },
    formatter(row) {
      return row.address
    },
    // 这周的第一天到现在
    getNowWeekDays() {
      const date = []
      const weekOfday = parseInt(this.$moment().format('d'), 10) // 计算今天是这周第几天 周日为一周中的第一天
      const start = this.$moment().subtract(weekOfday, 'days').format('YYYY-MM-DD') // 周一日期
      const end = this.$moment().format('YYYY-MM-DD')
      date.push(start)
      date.push(end)
    },
  },
  components: {
    orderTypeHistogramG2,
    DataTable,
  },
  mounted() {
    const id = localStorage.getItem('marketId')
    const start = this.$moment().subtract(1, 'months').format('YYYY-MM-DD')
    const end = this.$moment().format('YYYY-MM-DD')
    this.handleGetOrderTypeData(id, start, end)
    this.value2 = [start, end]
    // this.getNowWeekDays()
  },
}
</script>

<style lang="scss">
.order-type__title {
  width: 100%;
  height: 24px;
  background: #F0F2F5;
  font-size: 22px;
}
.order-type__picture{
  background: #fff;
  padding: 10px 0 10px 0;
  margin-top:10px;
  border-radius: 10px;
  .order-type__picture-select {
    width: 100%;
    height: 50px;
    border-bottom:2px solid #F0F2F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .order-type__picture-title{
      padding: 0 0 0 10px;
    }
    .order-type__picture-type{
      padding: 10px;
      .el-date-picker {
        margin-left:20px;
      }
    }
  }
  .order-type__picture-g2{
    margin-top:10px;
    padding: 0 10px;
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
