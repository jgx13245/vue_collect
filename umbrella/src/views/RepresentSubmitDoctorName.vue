<template>
  <div class="subDoc-wrap">
    <div class="subDoc-message">
      <ul>
        <li class="subDoc_name" @click="handleToName">
          提交医生名单
        </li>
        <li class="subDoc_phone" @click="handleSearch">
           查询项目进展
        </li>
        <li class="subDoc_certificate" @click="handleVideo">
          申请录制患教视频
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  methods: {
    handleToName() {
      this.$router.push({path:'./representChoose'})
    },
    handleSearch() {
      this.$toast('此功能将于12月15日开通，敬请期待！')
    },
    handleVideo() {
      this.$toast('此功能将于12月15日开通，敬请期待！')
    }

  },
  created() {}
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.subDoc-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .subDoc-message {
    width: 90%;
    height: 600px;
    margin-top:300px;
    background: #fff;
    border-radius: 20px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      li {
        width: 90%;
        height: 80px;
        color:#fff;
        border-radius: 10px;
        background: #035732;
        display: flex;
        justify-content: center;
        border-radius: 10px;
        align-items: center;
      }
    }
  }
}
</style>


