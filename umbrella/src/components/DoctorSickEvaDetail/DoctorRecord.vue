<template>
  <div class="sickQuestion-wrap">
    <div class="jian">健康管理记录</div>
    <div class="sickQuestion-list">
      <ul class="sickQuestion-ul">
        <li class="sickQuestion-item" v-for="(item,index) in list" :key="item.num" @click="handleQues">
          <div class="sickQuestion-info">
            <span class="sickQuestion-num">{{index+1}}</span>
            <span class="sickQuestion-id">{{item.requestName}}</span>
            <span class="sickQuestion-detail" v-if="item.status == 0" @click="handleToSickDetail(item.status, item.requestId)">填写</span>
            <span class="sickQuestion-detailRead" v-if="item.status == 1"  @click="handleToSickDetail(item.status, item.requestId)">已填</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      list:[],
    }
  },
  methods: {
    ...mapMutations({
      updateSuiStatus:"updateSuiStatus"
    }),
    handleToSickDetail(suiStatus, id) {
      localStorage.setItem('suiId',id)
      localStorage.setItem('suiStatus',suiStatus)
      this.$router.push({path:'./sickSuiFang'})
    },
    async m(caseId) {
      const res = await fetchSickSuiFangList({caseId})
      console.log(res)
      if(res) {
        if(res.data.success === true && res.data.obj.length !== 0) {
        this.list = res.data.obj
        }else{
          this.$toast('暂时没有数据')
        }
      }else{
        this.$toast('暂时没有数据')
      }
    },
    // 如果路由拦截失败
    async n() {
      const openId = localStorage.getItem('sickOpenId',openId)
       console.log(openId,"232323")
       const res = await fetchOpenIdSickLogin({ openId })
        if(res.data.success === true) {
            const { id, token, tranches, name, } = res.data.obj
            localStorage.setItem('caseId',id)
            localStorage.setItem('caseToken',token)
            const caseId = localStorage.getItem('caseId')
            this.m(caseId)
        }
    },
    handleQues() {
      this.$router.push({path:'./sickSuiFang'})
    }
  },
  computed:{
    ...mapState(["caseId"])
  },
  mounted() {
    // this.n()
  }
}
</script>

<style lang="scss">
.sickQuestion-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-size: 100% 100%;
}
.jian{
  color:#035732;
  font-size: 40px;
  padding: 20px;
}
.sickQuestion-list{
  height: 52%;
  display: flex;
  overflow-y: auto;
}
.sickQuestion-ul{
  width: 100%;
  height: 100%;
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
}
.sickQuestion-item{
  width:95%;
  height:80px;
  margin-top:20px;
  display: flex;
  align-items: center;
  .sickQuestion-info{
    flex:1;
    height:80px;
    display: flex;
    background: #F6F6F6;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    >span{
      height:80px;
      color:#5B5959;
      font-size: 30px;
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .sickQuestion-num{
      width:10%;
    }
    .sickQuestion-id{
      flex:1;
      background-size: 10% 50%;
      padding-left:20px; 
      color:#575656;
    }
    .sickQuestion-detail{
      width:20%;
      color:#035732;
      text-decoration: underline;
    }
    .sickQuestion-detailRead {
      width:20%;
      color:#ccc;
      text-decoration: underline;
    }
  }
}

</style>