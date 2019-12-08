 <template>
  <div :id='id'></div>
</template>

<script>
import G2 from '@antv/g2'
import { DataSet } from '@antv/data-set'

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
        this.drawPie(newValue)
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
    drawPie(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      const dv = new DataSet.DataView()
      dv.source(data).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent',
      })
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 400,
        padding: [20, 20, 20, 20],
      })
      this.chart.source(dv, {
        percent: {
          formatter: function formatter(val) {
            let value = val
            value = `${(value * 100).toFixed(2)}%`
            return value
          },
        },
      })
      this.chart.coord('theta', {
        radius: 0.5,
      })
      this.chart.tooltip({
        showTitle: false,
      })
      this.chart.legend(false)
      this.chart.intervalStack()
        .position('percent')
        .color('type')
        .label('type', {
          offset: -10,
        })
        .tooltip('name*percent', (item, percent) => {
          const p = `${(percent * 100).toFixed(2)}%`
          return {
            name: item,
            value: p,
          }
        })
        .select(false)
        .style({
          lineWidth: 1,
          stroke: '#FFF',
        })

      const outterView = this.chart.view()
      const dv1 = new DataSet.DataView()
      dv1.source(data).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent',
      })
      outterView.source(dv1, {
        percent: {
          formatter: function formatter(val) {
            let value = val
            value = `${(value * 100).toFixed(2)}%`
            return value
          },
        },
      })
      outterView.coord('theta', {
        innerRadius: 0.5 / 0.75,
        radius: 0.75,
      })
      outterView
        .intervalStack()
        .position('percent')
        .color('name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'])
        .label('name')
        .tooltip('name*percent', (item, percent) => {
          const p = `${(percent * 100).toFixed(2)}%`
          return {
            name: item,
            value: p,
          }
        })
        .select(false)
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
