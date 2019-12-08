<template>
  <div>
    <!-- 数据总览 -->
    <el-row :gutter="30">
      <el-col :span="6">
        <summary-card
          title="总销售总额"
          prefix="¥"
          :info="saleData.saleInfo"
          tipPrefix="单日销售额"
          :tip="saleData.saleTip">
        </summary-card>
      </el-col>
      <el-col :span="6">
        <summary-card
          title="总注册量"
          :info="saleData.visitInfo"
          tipPrefix="单日注册量"
          :tip="saleData.visitTip">
        </summary-card>
      </el-col>
      <el-col :span="6">
        <summary-card
          title="总支付笔数"
          :info="saleData.payInfo"
          tipPrefix="单日支付笔数"
          :tip="saleData.payTip">
        </summary-card>
      </el-col>
      <el-col :span="6">
        <summary-card
          title="总商品销售数量"
          :info="saleData.goodsInfo"
          tipPrefix="单日商品销售数量"
          :tip="saleData.goodsTip">
        </summary-card>
      </el-col>
    </el-row>
    <!-- 销售数据 -->
    <el-row :gutter="30">
      <el-col :span="24">
        <home-sale
          :rank="MarketList"
          :sale="saleTrend"></home-sale>
      </el-col>
    </el-row>
    <!-- 占比数据 -->
    <el-row :gutter="30">
      <el-col :span="12">
        <home-category :list="saleClassify"></home-category>
      </el-col>
      <el-col :span="12">
        <home-order :list="customerPay"></home-order>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SummaryCard from '../../components/Home/SummaryCard.vue'
import HomeSale from '../../components/Home/HomeSale.vue'
import HomeCategory from '../../components/Home/HomeCategory.vue'
import HomeOrder from '../../components/Home/HomeOrder.vue'
import {
  fentcHomeSaleInfo,
} from '../../assets/js/api'

export default {
  data() {
    return {
      saleTrend: [],
      saleData: [],
      saleClassify: [],
      customerPay: [],
    }
  },
  components: {
    'summary-card': SummaryCard,
    'home-sale': HomeSale,
    'home-category': HomeCategory,
    'home-order': HomeOrder,
  },
  mounted() {
    const id = localStorage.getItem('marketId')
    this.handleGetHomeSale(id)
  },
  computed: {
    ...mapState(['MarketList', 'MarketId']),
  },
  methods: {
    async handleGetHomeSale(marketId) {
      const { data: saleData } = await fentcHomeSaleInfo({ marketId })
      this.saleTrend = saleData.data.saleTrend
      this.saleData = saleData.data.saleDate
      this.saleClassify = saleData.data.saleClassify
      this.customerPay = saleData.data.customerPay
    },
  },
  watch: {
    '$store.state.MarketId'(newValue) {
      if (newValue) {
        this.handleGetHomeSale(newValue)
      }
    },
    immediate: true,
  },
}
</script>

<style lang="scss">
</style>
