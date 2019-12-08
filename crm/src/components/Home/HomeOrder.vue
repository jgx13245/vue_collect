<template>
  <section class="home-order">
    <header class="home-order__header">
      <span>注册人数与支付笔数关系</span>
    </header>
    <div id="js-home-order"></div>
  </section>
</template>

<script>
import G2 from '@antv/g2'

export default {
  props: {
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
        this.drawLine(newValue)
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
    drawLine(data) {
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: 'js-home-order',
        forceFit: true,
        height: 400,
        padding: [50, 20, 20, 50],
      })

      this.chart.axis('date', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
        },
      })
      this.chart.axis('blockchain', {
        label: {
          textStyle: {
            fill: '#aaaaaa',
          },
        },
      })
      this.chart.axis('nlp', false)
      this.chart.tooltip({
        crosshairs: false,
      })
      this.chart.legend({
        position: 'top-center',
      })

      this.chart.source(data, {
        nlp: {
          min: 0,
          max: 300,
          alias: '支付笔数',
        },
        blockchain: {
          min: 0,
          max: 300,
          alias: '注册人数',
        },
      })
      this.chart.line().position('date*blockchain').color('#1890ff')
      this.chart.line().position('date*nlp').color('#2fc25b')
      this.chart.render()
    },
  },
}
</script>

<style>

</style>
