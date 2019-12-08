<template>
  <section class="home-sale">
    <header class="home-sale__header">
      <span class="home-sale__title">销售额</span>
      <div class="home-sale__tool">
        <el-button-group>
          <!-- <el-button type="primary" size="mini">今日</el-button>
          <el-button type="primary" size="mini">本周</el-button>
          <el-button type="primary" size="mini">本月</el-button>
          <el-button type="primary" size="mini">全年</el-button> -->
        </el-button-group>
         <!-- <el-date-picker
          size="small"
          v-model="time"
          type="datetimerange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker> -->
      </div>
    </header>
    <div class="home-sale__content">
      <section class="home-sale__chart">
        <h5 class="home-sale__subtitle">销售趋势</h5>
        <div id="js-home-sale"></div>
      </section>
      <section class="home-sale__list">
        <h5 class="home-sale__subtitle">门店销售额排名</h5>
        <ul class="home-sale__rank">
          <li v-for="(item, index) in rank" :key="index" class="home-sale__rankitem">
            <span
              :data-index="index + 1"
              class="home-sale__rankitem-title"
              :class="index < 3 ? 'is-top' : ''">{{item.marketName}}</span>
            <span>{{item.value | formatAmount}}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<script>
import G2 from '@antv/g2'
import Filters from '../../assets/js/filter'

export default {
  mixins: [Filters],
  props: {
    sale: {
      type: Array,
      default() {
        return []
      },
    },
    rank: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      time: [],
      chart: null,
    }
  },
  watch: {
    sale: {
      handler(value) {
        this.$nextTick(() => {
          this.drawChart(value)
        })
      },
      immediate: false,
    },
  },
  methods: {
    drawChart(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: 'js-home-sale',
        forceFit: true,
        height: 400,
        padding: [20, 20, 30, 90],
      })
      this.chart.source(data, {
        value: {
          tickCount: 5,
        },
      })
      this.chart.legend(false)
      this.chart.axis('value', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
          formatter: function formatter(val) {
            return `${val}元`
          },
        },
        title: {
          offset: 100,
        },
      })

      this.chart.scale('value', {
        alias: '销售额',
      })

      this.chart.axis('type', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
          formatter: function formatter(val) {
            return `${val}月`
          },
        },
        position: 'bottom',
        tickLine: {
          alignWithLabel: false,
          length: 0,
        },
      })

      this.chart.tooltip({
        share: true,
      })
      this.chart.interval().position('type*value').opacity(1)
      this.chart.render()
    },
  },
}
</script>

<style>

</style>
