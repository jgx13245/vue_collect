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
        this.hanldeMakeCakeG2(newValue)
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
    hanldeMakeCakeG2(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 350,
      })
      this.chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            let newVal = val
            newVal = `${Math.round(val * 100)}%`
            return newVal
          },
        },
      })
      this.chart.coord('theta', {
        radius: 0.75,
      })
      this.chart
        .tooltip({
          showTitle: false,
          itemTpl: '<li><span style="background-color:{color}" class="g2-tooltip-marker"></span>{name}: {value}</li>',
        })
      this.chart.intervalStack().position('percent').color('item').label('percent', {
        formatter: function formatter(val, item) {
          return `${item.point.item}:${val}`
        },
      })
        .tooltip('item*percent', (item, percent) => {
          let newPercent = percent
          newPercent = `${Math.round(percent * 100)}%`
          return {
            name: item,
            value: newPercent,
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff',
        })
      this.chart.render()
    },
  },
}
</script>

<style>
</style>
