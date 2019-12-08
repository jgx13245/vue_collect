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
        this.drawHistogram(newValue)
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
    drawHistogram(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 400,
        padding: [20, 20, 80, 90],
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
        },
        title: {
          offset: 70,
        },
      })

      this.chart.scale('value', {
        alias: '销售数量',
      })

      this.chart.axis('type', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
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
