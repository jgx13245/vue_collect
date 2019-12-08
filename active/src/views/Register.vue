<template>
  <div class="wrap">
    <div class="inviteNow">
      <span class="icon icon-button-modify buttton-modify-prefix"></span>
      <span @click="show= true">立即邀请</span>
      <span class="icon icon-button-modify buttton-modify-suffix"></span>
    </div>
    <popup :visible="show">
      <section slot="content" class="know">
        <div class="point"></div>
        <div class="know-close" @click="show = false"></div>
      </section>
    </popup>
  </div>
</template>

<script>
import ShareMixins from '../assets/js/share.js'
import Popup from "../components/Popup";
export default {
  data() {
    return {
      show: false
    };
  },
  mixins: [ ShareMixins ],
  components: {
    Popup
  }
};
</script>

<style lang="scss">
@import '../assets/css/sprite.scss';
.wrap {
  width: 100%;
  min-height: 100vh;
  background: #ffd342 url("../assets/images/registed.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .inviteNow {
    width: 70%;
    position: absolute;
    top:63%;
    left:50%;
    transform: translate(-50%,-50%);
    display: flex;
  }
  .buttton-modify-prefix, .buttton-modify-suffix {
    position: absolute;
    top: 50%;
    transform: translate3d(0,-50%,0);
  }

  .buttton-modify-prefix {
    left: -70px;
  }

  .buttton-modify-suffix {
    right: -70px;
  }
  span:nth-child(2) {
    display: inline-block;
    padding: 0 50px;
    flex: 1;
    height: 60px;
    margin: 0 auto;
    background: #d90000;
    border-radius: 20px;
    box-shadow: #ccc 0px 0px 7px;
    text-align: center;
    line-height: 60px;
    font-size: 40px;
    color: #fff;
  }
  .know {
    width: 700px;
    height: 1300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .point {
      width: 700px;
      height: 700px;
      background: url("../assets/images/point.png") no-repeat center;
      background-size: 80% 70%;
      background-position: 85% 30%;
    }
    .know-close {
      width: 600px;
      height: 300px;
      background: url("../assets/images/know.png") no-repeat center;
      background-size: 50% 50%;
      background-position: 50% 0%;
    }
  }
}
</style>

