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
        this.hanldeMakeOrderTimeTrendG2(newValue)
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
    hanldeMakeOrderTimeTrendG2(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 300,
        padding: [20, 110, 50, 50],
      })
      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'map',
        callback: function callback(row) {
          const newRow = row
          const times = newRow.time.split(' ')
          newRow.date = times[0]
          newRow.time = times[1]
          return newRow
        },
      })
      this.chart.axis('time', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
        },
      })
      this.chart.axis('count', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
          formatter: function formatter(text) {
            // return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            return `${text}笔`
          },
        },
      })
      this.chart.tooltip({
        crosshairs: false,
      })
      this.chart.legend({
        attachLast: true,
      })
      this.chart.source(dv, {
        time: {
          tickCount: 12,
        },
        date: {
          type: 'cat',
        },
      })
      this.chart.line().position('time*count').color('date', ['#1890ff', '#1890ff'])
      // chart.guide().dataMarker({
      //   position: ['13:00', 0],
      //   lineLength: 30,
      //   content: '服务器宕机\n低值：0',
      //   style: {
      //     text: {
      //       textAlign: 'left',
      //       fontSize: 12,
      //       stroke: 'white',
      //       lineWidth: 2,
      //     },
      //   },
      // })
      // chart.guide().dataMarker({
      //   position: ['14:00', 4180],
      //   lineLength: 20,
      //   content: '宕机导致服务积压，恢复后达峰值\n高值：4108',
      //   style: {
      //     text: {
      //       textAlign: 'left',
      //       fontSize: 12,
      //       stroke: 'white',
      //       lineWidth: 2,
      //     },
      //   },
      // })
      this.chart.render()
      this.chart.repaint()
    },
  },
}
</script>

<style>
</style>
