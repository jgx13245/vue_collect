<template>
  <div class="wrap">
    <button @click="handleOpen" class="btnPopup">点击按钮</button>
    <popup :isVisible="show" @changeClose="changeClose">
      <div class="box" slot="content">
        <div class="label">确定执行此操作</div>
        <div class="btn">
          <span @click="handleclose">取消</span>
          <span @click="handleclose">确定</span>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import popup from '../components/Popup'
export default {
  data() {
    return {
      show:false
    };
  },
  methods: {
    handleOpen() {
      this.show = true
    },
    handleclose() {
      this.show = false
    },
    // 子组件传过来的
    changeClose() {
     this.show = false
    },
  },
  components:{
    popup
  }
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.wrap {
  .btnPopup{
    width:300px;
    height:60px;
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
  .box{
    width:80%;
    height:300px;
    background: #fff;
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
        background: #FFA500;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      span:nth-child(1){
        border-right:1px solid #ccc;
        background: #FFf;
        
      }
    }
  }
}
</style>


