
<template>
  <transition name="fade">
    <div v-show="visible" class="toast-container">
      <span>{{message}}</span> 
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      message: ''
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
    opacity: .5;
  }
}
@keyframes toast-out {
  0% {
    opacity: .5;
  }
  100% {
    opacity: 0;
  }
}
.toast-container {
  // width: 50%;
  padding: 20px 15px;
  border-radius: 10px;
  background: #000;
  opacity: .5;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate3d(-50%,-50%,0);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span{
    color: #FFF;
    opacity: 1;
    font-weight: blod;
  }
}
</style>