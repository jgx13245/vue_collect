<template>
  <div class="representUrl-wrap">
    <div class="representUrl-url">
      <span style="text-decoration: underline;" id="inviteCode" @click="handleToUrl">{{url}}</span>
      <span @click="handleCopy">复制</span>
    </div>
    <div class="representUrl-video" @click="handleToVideo">
      查看录制视频软件安装视频及方法
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return{
      url:''
    }
  },
  methods: {
    handleToUrl() {
      window.open(this.url)
    },
    handleToVideo() {
      this.$router.push({path:'./representVideo'})
    },
    handleCopy() {
      var Url2 = document.getElementById("inviteCode").innerText;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$toast("复制成功");
    },
  },
  mounted() {
    this.url = this.$route.params.url
  }
};
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.representUrl-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/urlBack.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.representUrl-url{
  width:90%;
  height:200px;
  margin-top:500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  >span:nth-child(1){
    font-size: 30px;
    color:#035732;
  }
   >span:nth-child(2){
    background: #035732;
    padding:10px 15px;
    border-radius: 10px;
    font-size: 30px;
    color:#fff;
  }
}
.representUrl-video{
  width:90%;
  height:200px;
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-decoration: underline;
}
</style>


