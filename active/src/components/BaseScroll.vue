<template>
  <div class="igo-scroll" ref="scrollWrapper">
    <div class="igo-scroll__content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import BS from 'better-scroll'
const COMPONENT_NAME = 'Scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'
export default {
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      dafault: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: Boolean,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _initScroll () {
      const wrapper = this.$refs.scrollWrapper
      if (!wrapper) {
        return false
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel
      }

      this.scroll = new BS(wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem (e, item) {
      this.$emit('click', item)
    },
    destroy () {
      this.scroll.destroy()
    }
  },
  watch: {
    data () {
      setTimeout(() => this.refresh(), this.refreshDelay)
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  }
}
</script>

<style lang="scss">
  .igo-scroll {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: #FFF;

    .igo-scroll__content {
      position: relative;
      z-index: 1;
    }
  }
</style>