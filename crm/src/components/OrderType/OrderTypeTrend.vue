 <template>
  <div :id='id'></div>
</template>

<script>
import G2 from '@antv/g2'
// import { DataSet } from '@antv/data-set'

export default {
  props: {
    id: String,
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    list: {
      handler(newValue) {
        this.hanldeMakeTrendDateG2(newValue)
      },
      immediate: false,
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  methods: {
    hanldeMakeTrendDateG2(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 400,
        padding: [100, 40, 30, 45], // 上右下左
      })
      this.chart.source(data)
      this.chart.tooltip({
        follow: false,
        crosshairs: 'y',
        htmlContent: function htmlContent(title, items) {
          const alias = {
            APP: 'app下单',
            小程序: '小程序下单',
            触摸屏: '触摸屏下单',
          }
          let html = '<div class="order-type__tooltip">'
          for (let i = 0; i < items.length; i += 1) {
            const item = items[i]
            const color = item.color
            const name = alias[item.name]
            const value = item.value
            const domHead = `<div class="order-type__tooltip-item" style="border-left-color:${color}">`
            const domName = `<div class="order-type__tooltip-item-name">${name}</div>`
            const domValue = `<div class="order-type__tooltip-item-value">${value}</div>`
            const domTail = '</div>'
            html += domHead + domName + domValue + domTail
          }
          return `${html}</div>`
        },
      })
      this.chart.axis('date', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
        },
      })
      this.chart.axis('value', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
          formatter: function formatter(text) {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
          },
        },
      })
      this.chart.legend(false)
      this.chart.line().position('date*value').color('type')
      this.chart.render()
      this.chart.showTooltip({
        x: 200,
        y: 100,
      })
    },
  },
}
</script>

<style>
.order-type__tooltip {
  width: 100% !important;
  height: 10% !important;
  position: absolute;
  top: 0px;
  left: 0px
}
.order-type__tooltip-item {
  width: 150px;
  height: 50px;
  position: relative;
  float: left;
  margin-left: 20px;
  border-left-style: solid;
  border-left-width: 5px;
}
.order-type__tooltip-item:first-child {
  margin-left: 0;
}
.order-type__tooltip-item-name {
  width: 80%;
  height: 20px;
  position: absolute;
  top: 0px;
  left: 10px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
.order-type__tooltip-item-value {
  width: 80%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  left: 10px;
  color: #262626;
  font-size: 22px;
}
</style>
