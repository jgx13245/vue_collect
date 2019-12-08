<template>
  <div class="input-wrap"> 
    <input type="text" v-model="value1" placeholder="时间">
    <input type="text" v-model="value2" placeholder="人物">
    <input type="text" v-model="value3" placeholder="位置">
    <input @click="test" type="submit" class="sum"/>
  </div>
</template>

<script>

export default {
  data() {
    return{
      value1:'',
      value2:'',
      value3:'',
    }
  },
  methods:{
    test() {
      const messageArray = [this.value1, this.value2, this.value3]  // 每个input的字段值
      const message = ['时间不能为空', '选择相关人物','位置不能为空']     // 自己手动这设置的文案
      for (let i = 0, max = messageArray.length; i < max; i++) {  // 循环对比是否为空
        if (messageArray[i] == '') {
          this.$toast(message[i])   // 为空跳出文案
          return false   // 方法中断执行
        }
      }
      this.$toast('*************验证成功**************')
    },
  }
}
</script>

<style lang="scss">
.input-wrap{
  width:100%;
  height:100vh;
  border:1px solid #00f;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  input{
    margin-top:20px;
  }
  .sum{
    width:40%;
    height:60px;
    background: #0f0;
  }
}
</style>