<template>
  <div class="sickManage-wrap">
    <div class="sickManage-title"></div>
    <div class="sickManage-t">患者管理</div>
    <div class="sickManage-list">
      <ul class="sickManage-ul">
        <li class="sickManage-item">
          <div class="sickManage-num"  style="background:#2B8455; color:#fff;">序号</div>
          <div class="sickManage-info">
            <span style="width:20%; background:#2B8455; color:#fff; height:100%;">姓名</span>
            <span style="width:20%; background:#2B8455; color:#fff; height:100%;">年龄</span>
            <span style="width:20%; background:#2B8455; color:#fff; height:100%;">性别</span>
            <span style="background:#2B8455; color:#fff; height:100%;">状态</span>
          </div>
           <div class="sickManage-clickDetail">
           
          </div>
        </li>
        <li class="sickManage-item" v-for="(item, index) in list" :key="item.index">
          <div class="sickManage-num">{{index+1}}</div>
          <div class="sickManage-info">
            <span v-if="item.caseName !== null ">{{item.caseName.substr(0,1)+'***'}}</span>
            <span v-if="item.caseName === null ">{{item.caseName}}</span>
            <span >{{item.birthday}}</span>
            <span>{{item.sex}}</span>
            <span>{{item.status}}</span>
          </div>
          <div class="sickManage-clickDetail">
            <span  class="sickManage-detailKong" v-if="item.aid !== null ">评估</span>
            <span  class="sickManage-detail" @click="handleToSickEva(item.caseId)" v-if="item.aid === null" >评估</span>
            <span class="sickManage-detail" @click="handleToSickDetail(item.caseId, item.aid)" v-if="item.aid !== null ">详情</span>
            <span class="sickManage-detailKong" v-if="item.aid === null">详情</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchSickList } from '../assets/js/api'
import { mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      list:[]
    }
  },
  computed:{
    ...mapState(["tranches","doctorId"])
  },
  methods: {
    ...mapMutations({
      updateCaseId: "updateCaseId",
      updateInvesFinish: "updateInvesFinish"
    }),
    handleToSickEva(caseId) {
      // console.log(caseId)
      this.updateCaseId({caseId})
      this.$router.push({path:'./doctorSickEva'})
    },
    handleToSickDetail(caseId, aid) {
      // console.log(aid,'10101010')
      this.updateCaseId({caseId})
      const assessId = aid
      this.updateInvesFinish({ assessId })
      this.$router.push({path:'./doctorSickEvaDetail'})
    },
    async getSickList(doctorId, tranches) {
      const res = await fetchSickList({ doctorId, tranches })
      if(res.data.success === true) {
        for(var i = 0; i<res.data.obj.length; i++) {
          this.list.push(res.data.obj[i])
        } 
      }
    }
  },
  mounted() {
    const doctorId = this.doctorId
    const tranches = this.tranches
    this.getSickList(doctorId, tranches)
  }
}
</script>

<style lang="scss">
.sickManage-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff url("../assets/images/background.png") no-repeat;
  background-size: 100% 100%;
}
.sickManage-title{
  width:100%;
  height: 40%;
  text-align: center;
  line-height: 100px;
  color:#3D3F3E;
  letter-spacing: 5px;
  font-size: 35px;
}
.sickManage-t{
  width:100%;
  height: 5%;
  color:#035732;
  font-size:40px;
  padding-left:20px; 
}
.sickManage-list{
  height: 55%;
  display: flex;
  overflow-y: scroll;
}
.sickManage-ul{
  width: 100%;
  height: 100%;
  // flex:1;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // align-items: center;
}
.sickManage-item{
  width:100%;
  height:120px;
  margin-top:10px;
  display: flex;
  align-items: center;
  padding:0 10px 0 10px;
  .sickManage-num{
    width:10%;
    height:80px;
    // border-radius: 15px;
    background: #F6F6F6;
    text-align: center;
    line-height: 80px;
  }
  .sickManage-info{
    width: 100%;
    flex:1;
    height:80px;
    background: #F6F6F6;
    // border-radius: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    >span:nth-child(1){
      width: 20%;
      height:60px;
      color:#5B5959;
      font-size: 30px;
      padding-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
     >span:nth-child(2){
      width: 20%;
      height:60px;
      color:#5B5959;
      font-size: 30px;
      padding-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
     >span:nth-child(3){
      width: 20%;
      height:60px;
      color:#5B5959;
      font-size: 30px;
      padding-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    >span:nth-child(4){
      width: 40%;
      height:60px;
      padding-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .sickManage-name{
      width:30%;
    }
  }
  /*是否评估*/
  .sickManage-clickDetail{
    width: 30%;
    height:80px;
    padding: 10px 0;
    color:#035732;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .sickManage-detail{
      color:#fff;
      border-radius:4px;
      padding: 15px 10px;
      background: #035732;
  }
  .sickManage-detailKong{
      color:#000;
      border-radius:4px;
      padding: 15px 10px;
      background: #ccc;
  }
}

</style>