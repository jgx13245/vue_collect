<template>
  <div @click="handleClick" class="toast">点击弹框</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods:{
    handleClick() {
      this.$toast('网络连接不正常')
    },
  }
}
</script>

<style scoped>
.toast{
  /* width:300px; */
  /* height:60px; */
  padding: 20px;
  background: #0f0;
  border-radius: 10px;
  border:1px solid #0f0;
  box-shadow: 0 0 10px 0 rgba(200, 200, 200, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,0%,0);
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>