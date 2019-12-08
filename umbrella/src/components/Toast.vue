<template>
  <transition name="fade">
    <popup
      :mask="false"
      v-show="isVisible">
      <div
        slot="content"
        class="toast-container">
        <span>{{message}}</span>
      </div>
    </popup>
  </transition>
</template>

<script>
import Popup from './Popup'
import VisibilityMixins from './mixins/visibility.js'
export default {
  mixins: [ VisibilityMixins ],
  components: {
    Popup
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  methods: {
    clearTimer () {
      clearTimeout(this.timer)
      this.timer = null
    },
    show () {
      this.isVisible = true
      this.clearTimer()
      this.$nextTick(() => {
        this.timer = setTimeout(() => {
          this.hide()
        }, this.duration)
      })
    },
    hide () {
      this.isVisible = false
      this.clearTimer()
    }
  }
}
</script>

<style lang="scss">

.fade-enter-active {
  animation: toast-in 1s;
}

.fade-leave-active {
  animation: toast-out 1s;
}

@keyframes toast-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes toast-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.toast-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 400px;
  padding: 20px 15px;
  border-radius: 4px;
  background-color: #25262d;
  color: #FFF;
}
</style>
