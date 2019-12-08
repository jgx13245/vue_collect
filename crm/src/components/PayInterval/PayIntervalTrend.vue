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
        this.hanldeMakeTrendG2(newValue)
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
    hanldeMakeTrendG2(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 350,
        padding: [20, 50, 80, 60],
      })
      this.chart.source(data, {
        date: {
          range: [0, 1],
        },
      })
      this.chart.tooltip({
        crosshairs: {
          type: 'line',
        },
      })
      this.chart.axis('value', {
        label: {
          formatter: function formatter(val) {
            return `${val}元`
          },
        },
      })
      this.chart.line().position('date*value').color('type')
      this.chart.point().position('date*value').color('type').size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1,
        })
      this.chart.render()
    },
  },
}
</script>

<style>
</style>
