<template>
  <div class="igo-popup" v-show="isVisible">
    <div class="igo-popup-mask" v-show="mask">
    </div>
    <div class="igo-popup-container igo-popup-center">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import VisibilityMixins from './mixins/visibility.js'
export default {
  mixins: [ VisibilityMixins ],
  props: {
    mask: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style class="scss">
.igo-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.igo-popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #25262d;
  opacity: .7;
}
.igo-popup-container {
  position: absolute;
}
.igo-popup-center {
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
}
</style>

