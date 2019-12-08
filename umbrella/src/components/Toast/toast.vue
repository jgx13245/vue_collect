<template>
  <transition name="toast-fade">
    <div v-show="visible" class="toast-container">
      <span class="toast-text">{{message}}</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss">
.toast-container {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 80%;
  border-radius: 5px;
  transform: translate3d(-50%,-50%,0);
  background-color: rgba(0,0,0,0.7);
  color: #FFF;
  box-sizing: border-box;
  text-align: center;
  z-index: 100;
  padding: 20px 30px;
  transition: opacity .3s linear;
  font-size: 30px;
}

.toast-fade-enter, .toast-fade-leave-to {
  opacity: 0;
}
</style>
