<template>
  <section class="home-category">
    <div id="js-home-category"></div>
  </section>
</template>

<script>
import G2 from '@antv/g2'
import Filters from '../../assets/js/filter'

export default {
  mixins: [Filters],
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
      const sum = data.map(item => item.value).reduce((x, y) => x + y, 0)
      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.01

      // 自定义 other 的图形，增加两条线
      G2.Shape.registerShape('interval', 'sliceShape', {
        draw: function draw(cfg, container) {
          const { points } = cfg
          let path = []
          path.push(['M', points[0].x, points[0].y])
          path.push(['L', points[1].x, points[1].y - sliceNumber])
          path.push(['L', points[2].x, points[2].y - sliceNumber])
          path.push(['L', points[3].x, points[3].y])
          path.push('Z')
          path = this.parsePath(path)
          return container.addShape('path', {
            attrs: {
              fill: cfg.color,
              path,
            },
          })
        },
      })
      /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
      this.chart && this.chart.destroy()
      this.chart = new G2.Chart({
        container: 'js-home-category',
        forceFit: true,
        height: 400,
        padding: [20, 250, 20, 20],
      })

      this.chart.source(data)
      this.chart.coord('theta', {
        innerRadius: 0.75,
      })
      this.chart.tooltip({
        showTitle: false,
      })

      this.chart.legend({
        useHtml: true,
        position: 'right-center',
        legendStyle: {
          MARKER_CLASS: {
          },
        },
        /**
         * 一定要设置 g2-legend-marker
         */
        itemTpl(value, color, checked, index) {
          const item = data[index]
          const isChecked = checked ? 'checked' : 'unChecked'
          return `
            <li class="g2-legend-list-item item-${index} ${isChecked}" data-index="${index}" data-value="${value}" data-color="${color}" style="cursor: pointer;font-size: 14px;display: flex;">
              <span class="g2-legend-marker" style="background-color: ${color};"></span>
              <span style="display: inline-block;min-width: 60px;">${item.type}</span>
              <span style="padding: 0 4px; color: #909090;display: inline-block;min-width: 60px;text-align: right;">${(item.value / sum * 100).toFixed(2)}%</span>
            </li>
          `
        },
      })

      this.chart.guide().html({
        position: ['50%', '50%'],
        html: `
          <div class="g2-guide-html">
            <p>商品数量</p>
            <p>
              <span class="prefix"></span>
              <span class="content">${sum.toLocaleString()}</span>
            </p>
          </div>`,
      })

      this.chart.intervalStack().position('value').color('type').shape('sliceShape')

      this.chart.render()
    },
  },
}
</script>

<style lang="scss">
.g2-guide-html {
  text-align: center;
  line-height: 1.5;
  .prefix {
    font-size: 14px;
  }
  .content {
    font-weight: bold;
    font-size: 20px;
  }
}

.g2-legend-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
