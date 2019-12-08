<template>
  <div class="representVideo-wrap">
    <div class="videoCopy">
      <span @click="handleCopyVideo" class="representVideo-copy">复制</span>
      <span style="text-decoration: underline;" id="videoCode">{{url}}</span>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      url:"www.baidu.com"
    }
  },
  methods:{
    handleCopyVideo() {
      var Url2 = document.getElementById("videoCode").innerText;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$toast("复制成功");
    }
  }
};

</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.representVideo-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/vid.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.videoCopy{
  width:95%;
  height:200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.representVideo-copy{
  font-size: 30px;
  color:#fff;
  background: #035732;
  padding: 10px;
}
</style>


