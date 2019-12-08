<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="pay-interval__title">商品销售类型分析</div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="goods-kind__container">
          <div class="goods-kind__header">
            <div>一级分类</div>
            <div><el-input
              v-model="inputNumber"
              type="number"
              min="1"
              max="10"
              size="small"
              placeholder="1~10"
              onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              ></el-input></div>
            <el-date-picker
              size="small"
              v-model="timeCake"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeCake">
            </el-date-picker>
          </div>
           <GoodsCake :id="'goodsCake'" :list="goodsCake"></GoodsCake>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="goods-kind__container">
          <div class="goods-kind__header">
           <div>一级商品分类销售占比</div>
            <el-date-picker
              size="small"
              v-model="timeHistogram"
              align="right"
              unlink-panels
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeHistogram">
            </el-date-picker>
          </div>
          <GoodsHistogram :id="'goodsHistogram'" :list="goodsHistogram"></GoodsHistogram>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <data-table
          :current-page="1"
          :total="100"
          :list="tableDate"
          :listDate="listDate"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchGoodsCakeData, fetchGoodsHistogramData } from '../../assets/js/api'
import DataTable from '../../components/DataTable.vue'
import GoodsCake from '../../components/Goods/GoodsCake.vue'
import GoodsHistogram from '../../components/Goods/GoodsHistogram.vue'

export default {
  data() {
    return {
      timeCake: [],
      timeHistogram: [],
      tableDate: [],
      chart1: null,
      chart2: null,
      goodsCake: [],
      goodsHistogram: [],
      listDate: [],
      inputNumber: 3,
    }
  },
  watch: {
    inputNumber: {
      handler(newValue) {
        let newValueCopy = newValue
        if (newValueCopy) {
          if (newValueCopy < 0) {
            this.inputNumber = 1
            newValueCopy = 1
          }
          if (newValueCopy > 10) {
            this.inputNumber = 10
            newValueCopy = 10
          }
          const id = localStorage.getItem('marketId')
          const start = this.$moment(this.timeCake[0]).format('YYYY-MM-DD')
          const end = this.$moment(this.timeCake[1]).format('YYYY-MM-DD')
          this.handleGetCakeData(id, start, end, newValueCopy)
        }
      },
    },
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        const start = this.$moment().subtract('days', 7).format('YYYY-MM-DD')
        const end = this.$moment().format('YYYY-MM-DD')
        this.handleGetCakeData(newValue, start, end, this.inputNumber)
        this.handleGetHistogramData(newValue, start, end)
        this.timeCake = [start, end]
        this.timeHistogram = [start, end]
      }
    },
    immediate: true,
  },
  methods: {
    changeCake() {
      const start = this.$moment(this.timeCake[0]).format('YYYY-MM-DD')
      const end = this.$moment(this.timeCake[1]).format('YYYY-MM-DD')
      const id = localStorage.getItem('marketId')
      this.handleGetCakeData(id, start, end, this.inputNumber)
    },
    changeHistogram() {
      const start = this.$moment(this.timeHistogram[0]).format('YYYY-MM-DD')
      const end = this.$moment(this.timeHistogram[1]).format('YYYY-MM-DD')
      const id = localStorage.getItem('marketId')
      this.handleGetHistogramData(id, start, end)
      const newTime = []
      this.timeHistogram.map((item) => {
        const itemCopy = item
        const timeItem = this.$moment(itemCopy).format('YYYY-MM-DD')
        newTime.push(timeItem)
        return newTime
      })
      this.listDate = newTime
    },
    // 获取商品饼状图数据
    async handleGetCakeData(marketId, start, end, number) {
      const { data: { data } } = await fetchGoodsCakeData({
        marketId,
        start,
        end,
        number,
      })
      this.goodsCake = data
    },
    async handleGetHistogramData(marketId, start, end) {
      const { data: { data } } = await fetchGoodsHistogramData({ marketId, start, end })
      this.goodsHistogram = data
      const newData = data.map(item => (
        {
          商品类型: item.type,
          数量: item.value,
        }))
      this.tableDate = newData
    },
  },
  components: {
    GoodsCake,
    GoodsHistogram,
    DataTable,
  },
  mounted() {
    const start = this.$moment().subtract('days', 7).format('YYYY-MM-DD')
    const end = this.$moment().format('YYYY-MM-DD')
    const id = localStorage.getItem('marketId')
    this.handleGetCakeData(id, start, end, this.inputNumber)
    this.handleGetHistogramData(id, start, end)
    this.timeCake = [start, end]
    this.timeHistogram = [start, end]
  },
}
</script>

<style lang="scss">
.pay-interval__title {
  margin-bottom:10px;
}
.goods-kind__container {
  background: #FFF;
  border-radius: 6px;
}
.goods-kind__header {
  font-size:12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid rgba(213,213,213,.5);
  .el-input--small .el-input__inner {
    width:80px;
  }
}
</style>
