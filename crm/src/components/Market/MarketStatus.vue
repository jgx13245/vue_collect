 <template>
  <div :id='id'></div>
</template>

<script>
import G2 from '@antv/g2'

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
      const values = ['上货', '运营', '维护']
      this.chart && this.chart.destroy()
      /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["obj","val"] }] */
      data.forEach((obj) => {
        obj.range = [obj.sTime, obj.eTime]
        if (obj.station === -1) {
          obj.station = values[2]
        } else {
          obj.station = values[obj.station]
        }
      })
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 550,
        padding: [20, 110, 50, 50],
      })
      this.chart.source(data)
      this.chart.tooltip({
        containerTpl: '<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>',
        itemTpl: '<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}{extra}</td></tr>', // 支持的字段 index,color,name,value
        offset: 350,
        'g2-tooltip': {
          position: 'absolute',
          visibility: 'hidden',
          border: '2px solid #efefef',
          backgroundColor: 'white',
          color: '#000',
          opacity: '0.9',
          padding: '5px 15px',
          transition: 'top 200ms,left 200ms',
        }, // 设置 tooltip 的 css 样式
        'g2-tooltip-list': {
          margin: '10px',
        },
      })
      // 横坐标时间 二级刻度线
      this.chart.axis('range', {
        subTickCount: 5,
        subTickLine: {
          length: 4,
          stroke: '#545454',
          lineWidth: 1,
        },
        tickLine: {
          length: 6,
          lineWidth: 2,
          stroke: '#000',
        },
      })
      // 横坐标 显示格式
      this.chart.scale('range', {
        range: [0, 1],
        // tickCount: 24,
        // type: 'timeCat',
        mask: 'HH:MM',
      })
      // 纵坐标 label文本显示
      this.chart.axis('names', {
        label: {
          formatter: (val) => {
            const newVal = val
            return newVal.split(' ')[0]
          },
          offset: 4,
          textStyle: {
            fill: '#404040', // 文本的颜色
            fontSize: '12', // 文本大小
            fontWeight: 'bold', // 文本粗细
          },
        },
      })
      this.chart.coord().transpose().scale(1, -1)
      // 鼠标提示信息更改
      /* eslint arrow-parens: ["error", "always"] */
      /* eslint-env es6 */
      if (data.length > 2) {
        // 上货------------上货------------上货------------上货------------上货------------上货------------上货-----------
        if (data[0].type === '上货' && data[1].type === '运营') {
          this.chart.interval().position('names*range').color('station', ['#F09826', '#2FC25B', '#F04864']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '上货' && data[1].type === '维护') {
          this.chart.interval().position('names*range').color('station', ['#F09826', '#F04864', '#2FC25B']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '上货' && data[1].type === '上货') {
          const newData = []
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].type !== '上货') {
              newData.push(data[i].type)
            }
          }
          const copyData = []
          for (let i = 0; i < newData.length; i += 1) {
            if (typeof (newData[i]) !== 'undefined') {
              copyData.push(newData[i])
            }
          }
          if (copyData[0] === '运营') {
            this.chart.interval().position('names*range').color('station', ['#F09826', '#2FC25B', '#F04864']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
          if (copyData[0] === '维护') {
            this.chart.interval().position('names*range').color('station', ['#F09826', '#F04864', '#2FC25B']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
          if (copyData[0] === '上货') {
            this.chart.interval().position('names*range').color('station', ['#F09826', '#F04864', '#2FC25B']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
        }
        // 运营-----------运营-----------运营-----------运营-----------运营-----------运营-----------运营-----------运营-----------
        if (data[0].type === '运营' && data[1].type === '上货') {
          this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F09826', '#F04864']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '运营' && data[1].type === '维护') {
          this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F04864', '#F09826']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '运营' && data[1].type === '运营') {
          const newData = []
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].type !== '运营') {
              newData.push(data[i].type)
            }
          }
          const copyData = []
          for (let i = 0; i < newData.length; i += 1) {
            if (typeof (newData[i]) !== 'undefined') {
              copyData.push(newData[i])
            }
          }
          if (copyData[0] === '上货') {
            this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F09826', '#F04864']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
          if (copyData[0] === '维护') {
            this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F04864', '#F09826']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
          if (copyData[0] === '运营') {
            this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F04864', '#F09826']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
        }
        // 维护=---------------维护=---------------维护=---------------维护=---------------维护=---------------维护=---------------
        if (data[0].type === '维护' && data[1].type === '上货') {
          this.chart.interval().position('names*range').color('station', ['#F04864', '#F09826', '#2FC25B']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '维护' && data[1].type === '运营') {
          this.chart.interval().position('names*range').color('station', ['#F04864', '#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '维护' && data[1].type === '维护') {
          const newData = []
          for (let i = 0; i < data.length; i += 1) {
            if (data[i].type !== '维护') {
              newData.push(data[i].type)
            }
          }
          const copyData = []
          for (let i = 0; i < newData.length; i += 1) {
            if (typeof (newData[i]) !== 'undefined') {
              copyData.push(newData[i])
            }
          }
          if (copyData[0] === '上货') {
            this.chart.interval().position('names*range').color('station', ['#F04864', '#F09826', '#2FC25B']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
          if (copyData[0] === '运营') {
            this.chart.interval().position('names*range').color('station', ['#F04864', '#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
          if (copyData[0] === '维护') {
            this.chart.interval().position('names*range').color('station', ['#F04864', '#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
              {
                name: '状态',
                value: type,
              }
            ))
              .style({
                lineWidth: 1,
                stroke: '#fff',
              })
          }
        }
      }
      // /* ---------------数组数据为2的时候-------------- */
      if (data.length === 2) {
        if (data[0].type === '上货' && data[1].type === '运营') {
          this.chart.interval().position('names*range').color('station', ['#F09826', '#2FC25B', '#F04864']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '上货' && data[1].type === '维护') {
          this.chart.interval().position('names*range').color('station', ['#F09826', '#F04864', '#2FC25B']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '上货' && data[1].type === '上货') {
          this.chart.interval().position('names*range').color('station', ['#F09826', '#F04864', '#2FC25B']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '运营' && data[1].type === '上货') {
          this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '运营' && data[1].type === '维护') {
          this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F04864']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '运营' && data[1].type === '运营') {
          this.chart.interval().position('names*range').color('station', ['#2FC25B']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '维护' && data[1].type === '上货') {
          this.chart.interval().position('names*range').color('station', ['#F04864', '#F09826', '#2FC25B']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '维护' && data[1].type === '运营') {
          this.chart.interval().position('names*range').color('station', ['#F04864', '#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '维护' && data[1].type === '维护') {
          this.chart.interval().position('names*range').color('station', ['#F04864', '#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
      }
      // --------------数组数据为1的时候---------------
      if (data.length === 1) {
        if (data[0].type === '运营') {
          this.chart.interval().position('names*range').color('station', ['#2FC25B', '#F09826', '#F04864']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '上货') {
          this.chart.interval().position('names*range').color('station', ['#F09826', '#2FC25B', '#F04864']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
        if (data[0].type === '维护') {
          this.chart.interval().position('names*range').color('station', ['#F04864', '#2FC25B', '#F09826']).tooltip('type*range*names', (type) => (
            {
              name: '状态',
              value: type,
            }
          ))
            .style({
              lineWidth: 1,
              stroke: '#fff',
            })
        }
      }
      this.chart.render()
    },
  },
}
</script>

<style>
</style>
