<template>
    <div class="wrap">
      <ul class="item-wrap">
        <li v-for="item in comList" @click="handleto(item.route)" :key="item.route" class="comItem">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      comList:[
        {name:'弹框确定取消组件',route:'./popup'},
        {name:'提示弹出框',route:'./toast'},
        {name:'复用表格',route:'./table'},
        {name:'简单表格为空校验',route:'./if'},
      ],
    }
  },
  methods:{
    handleto(ToRouter) {
      this.$router.push({path:ToRouter})
    },
  }
}
</script>

<style scoped lang="scss">
.wrap{
  width:100%;
  height:100vh;
}
.item-wrap{
  width:100%;
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .comItem{
    width:80%;
    height:50px;
    border:1px solid #ccc;
    background: #D9D9D9;
    margin-top:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color:#000;
    box-shadow: 0 0 3px 0 rgba(200, 200, 200, 0.11);
  }
}

</style>