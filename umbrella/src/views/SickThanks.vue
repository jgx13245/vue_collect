<template>
  <div class="thanSick-wrap">
   
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchSickAgreeData } from '../assets/js/api'
export default {
  data() {
    return {
     infconst: '',
    }
  },
  computed: {
    ...mapState(["caseId","caseTranches","caseName"])
  },
  methods: {
    async handleToNoAgree() {
      this.infconst = '0'
      this.FetchNoAgree(this.caseId, this.caseTranches, this.infconst)
    },
    handleToAgree() {
      this.infconst = '1'
      this.FetchAgree(this.caseId, this.caseTranches, this.infconst, this.caseName)
    },
    // //不同意
    // async FetchNoAgree(doctorId, tranches, infconst) {
    //   const res = await fetchSickAgreeData({ doctorId, tranches, infconst })
    //   console.log(res)
    // },
    //同意
    async FetchAgree(caseId, tranches, infconst, name) {
      console.log(caseId, tranches, infconst, name)
      const res = await fetchSickAgreeData({ caseId, tranches, infconst, name })
      if(res.data.success === true) {
        this.$toast('保存成功')
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/sprite.scss";
.thanSick-wrap {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff url("../assets/images/than.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>


