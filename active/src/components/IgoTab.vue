<template>
  <div class="igo-tab" ref="tab">
    <igo-scroll ref="scroll" direction="horizontal">
      <ul class="igo-tab__list" ref="tabList" @click="selectItem($event)">
        <li class="item" v-for="(item, index) in list" :key="index" :class="currentTabIndex === index ? 'is-active' : ''" :data-index="index">
          <p class="time">{{item.label}}</p>
          <p class="status">{{item.status}}</p>
        </li>
      </ul>
    </igo-scroll>
  </div>
</template>

<script>
import IgoScroll from './BaseScroll'
const COMPONENT_NAME = 'IgoTab'
const EVENT_CHANGE = 'change'
export default {
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: {
    IgoScroll
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    currentTabIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    currentTabIndex: {
      handler (newValue) {
        this.$nextTick(() => {
          this._adjust(newValue)
        })
      },
      immediate: true
    }
  },
  methods: {
    selectItem (e) {
      let target = e.target
      const tagName = target.tagName.toLowerCase()
      if (tagName === 'ul') {
        return
      } else {
        while (target.tagName.toLowerCase() !== 'li') {
          target = target.parentNode
        }
        const index = parseInt(target.dataset.index)
        this.$emit(EVENT_CHANGE, index)
      }
    },
    _initTabWidth () {
      const tabList = this.$refs.tabList
      const items = tabList.children
      let width = 0
      for (let i = 0, max = items.length; i < max; i++) {
        width += items[i].clientWidth
      }
      // BUG: 框架计算错误导致高度溢出
      tabList.style.width = `${width + 10}px`
    },
    _adjust (type) {
      /* eslint-disable */
      const tabWidth = this.$refs.tab.clientWidth
      const tabListWidth = this.$refs.tabList.clientWidth
      const minTranslate = Math.min(0, tabWidth - tabListWidth)
      const middle = tabWidth / 2
      const items = this.$refs.tabList.children
      let width = 0
      this.list.every((item, index) => {
        if (index === type) {
          return false
        }
        width += items[index].clientWidth
        return true
      })
      let translate = middle - width
      translate = Math.max(minTranslate, Math.min(0, translate))
      this.$refs.scroll.scrollTo(translate, 0, 300)
    }
  },
  mounted () {
    this._initTabWidth()
  }
}
</script>

<style lang="scss">
.igo-tab {
  .igo-scroll {
    background: none;
    .igo-scroll__content {
      display: inline-block;
      .igo-tab__list {
        display: flex;
        align-items: center;
        background-color: #e24f31;
        color: #FFF;
        .item {
          flex: 1;
          min-width: 140px;
          display: flex;
          flex-flow: column wrap;
          align-items: center;
          padding: 15px 0;
        }
      }
    }
  }
}


.time {
  width: 80%;
  text-align: center;
  font-size: 30px;
  padding: 10px 0;
  border-radius: 25px;
}
.status {
  font-size: 16px;
  padding: 5px 0;
}

.is-active {
  .time {
    background-color: #fae9b5;
    color: #e24f31;
    font-size: 34px;
    font-weight: 600;
  }
  .status {
    color: #fae9b5;
  }
}

</style>


