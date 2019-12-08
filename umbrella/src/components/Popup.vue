<template>
  <div class="igo-popup" v-show="isVisible">
    <transition name="fade">
      <div class="igo-popup-mask" v-show="isVisible"></div>
    </transition>
    <div class="igo-popup-container igo-popup-center">
        <slot name="content">
          <div class="default">
            <div class="label">确定执行此操作</div>
            <div class="btn">
              <span @click="hide">取消</span>
              <span @click="hide">确定</span>
            </div>
          </div>
        </slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show () {
      this.isVisible = true
    },
    hide () {
      this.$emit('changeClose', false)
    }
  }
}
</script>

<style lang="scss">
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
  width:100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
  display: flex;
  justify-content: center;
  align-items: center;
}
.default{
  width:80%;
  height:300px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  .label{
    width:100%;
    height:200px;
    border-bottom:1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn{
    width:100%;
    flex:1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span:nth-child(1){
      border-right:1px solid #ccc;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

