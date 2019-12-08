<template>
  <div class="sickNews-wrap">
    <div class="mynews">我的消息</div>
    <div class="sickNews-list">
      <ul class="sickNews-ul">
        <li class="sickNews-item" v-for="(item, index) in list" :key="item.num">
          <div class="sickNews-info">
            <span class="sickNews-num">{{index+1}}</span>
            <span class="sickNews-id">{{item.titleNews}}</span>
            <span class="sickNews-detail" v-if="item.isRead == 0" @click="handleToSickDetail(item.urlAddress)">未读</span>
            <span class="sickNews-detailRead" v-if="item.isRead == 1" >已读</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchSickListData, fetchOpenIdSickLogin } from '../assets/js/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      list:[],
    }
  },
  computed:{
    ...mapState(['caseId'])
  },
  methods: {
    handleToSickDetail(index) {
      if(index === null ){
        return 
      }else{
         window.location.href = index
      }
    },
    async getSickInfo(caseId) {
      const res = await fetchSickListData({ caseId })
      console.log(res,'患者我的消息')
      if(res.data.success === true) {
        this.list = res.data.obj
      }
    },
    async m() {
       const openId = localStorage.getItem('sickOpenId',openId)
       console.log(openId,"232323")
       const res = await fetchOpenIdSickLogin({ openId })
        if(res.data.success === true) {
            const { id, token, tranches, name, } = res.data.obj
            localStorage.setItem('caseId',id)
            localStorage.setItem('caseToken',token)
            const caseId = localStorage.getItem('caseId')
            this.getSickInfo(caseId)
        }
    }
  },
  mounted(){
    this.m()
  }
}
</script>

<style lang="scss">
.sickNews-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size:100% 100%; 
}
.mynews{
  color:#035732;
  font-size: 40px;
  padding: 20px;
}
.sickNews-list{
  height: 52%;
  display: flex;
  overflow-y: auto;
}
.sickNews-ul{
  width: 100%;
  height: 100%;
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
}
.sickNews-item{
  width:95%;
  height:80px;
  margin-top:20px;
  display: flex;
  align-items: center;
  .sickNews-info{
    flex:1;
    height:80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #ccc;
    >span{
      height:80px;
      color:#5B5959;
      font-size: 30px;
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .sickNews-num{
      width:10%;
    }
    .sickNews-id{
      flex:1;
      background-size: 10% 50%;
      padding-left:20px; 
      color:#575656;
    }
    .sickNews-detail{
      width:20%;
      color:#035732;
      text-decoration: underline;
    }
    .sickNews-detailRead {
      width:20%;
      color:#ccc;
      text-decoration: underline;
    }
  }
}

</style>