<template>
  <div class="igo-count-down">
    <div class="line"></div>
    <div class="time-container" :style="enable ? 'justify-content: space-between;' : 'justify-content: center'">
      <span>{{label}}</span>
      <span class="time-unit" v-if="enable">{{hours}}</span>
      <span class="time-separator" v-if="enable">:</span>
      <span class="time-unit" v-if="enable">{{minutes}}</span>
      <span class="time-separator" v-if="enable">:</span>
      <span class="time-unit" v-if="enable">{{seconds}}</span>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    timestamp: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      enable: false,
      distance: 0,
      timer: null,
      hours: null,
      minutes: null,
      seconds: null
    }
  },
  computed: {
    label () {
      if (this.enable) {
        return '距离开始还有'
      }
      return '本时段抢购已结束'
    }
  },
  watch: {
    timestamp: {
      handler (newValue) {
        this.isValidator(newValue)
      },
      immediate: true
    }
  },
  methods: {
    isValidator (timestamp) {
      const now = Date.now()
      const distance = Math.floor((timestamp - now) / 1000)
      if (distance <= 0) {
        this.enable = false
      } else {
        this.enable = true
        const { hours, minutes, seconds } = this.formatTimeString(distance)
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.distance = distance - 1
        this.countdown()
      }
    },
    countdown () {
      this.timer = setTimeout(() => {
        if (this.distance === 0) {
          this.enable = false
        }
        const { hours, minutes, seconds } = this.formatTimeString(this.distance)
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.distance--
        this.countdown()
      }, 1000)
    },
    formatTimeString (distance) {
      let hours = Math.floor(distance / 60 / 60)
      hours = ('' + hours).padStart(2, 0)
      let minutes = Math.floor(distance / 60 % 60)
      minutes = ('' + minutes).padStart(2, 0)
      let seconds = Math.floor(distance % 60)
      seconds = ('' + seconds).padStart(2, 0)
      return {
        hours,
        minutes,
        seconds
      }
    }
  }

}
</script>

<style lang="scss">
.igo-count-down {
  background-color: #F5F5F5;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .line {
    flex: 1;
    height: 1px;
    background-color: rgb(213,213,213);
  }
  .time-container {
    flex: 2;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #c1c1c1;
    height: 60px;

    .time-separator {
      color: #000;
      font-weight: bold;
    }
    .time-unit {
      background: #000;
      padding: 10px;
      font-size: 26px;
      font-weight: bold;
      border-radius: 10px;
      color: #FFF;
    }
  }
}
</style>
