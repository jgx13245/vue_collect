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
        this.handleMakeHistogramG2(newValue)
      },
      immediate: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleMakeHistogramG2(data) {
      const ds = new DataSet()
      const dv = ds.createView().source(data)
      dv.transform({
        type: 'bin.histogram',
        field: 'depth',
        binWidth: 1,
        groupBy: ['cut'],
        as: ['depth', 'count'],
      })
      const chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: window.innerHeight,
      })
      chart.source(dv)
      chart.axis('depth', {
        label: {
          formatter: function formatter(val) {
            return `${val}元`
          },
        },
      })
      chart.tooltip({
        crosshairs: false,
        position: 'top',
      })
      chart.intervalStack().position('depth*count').color('cut')
      chart.render()
    },
  },
}
</script>

<style>
</style>
