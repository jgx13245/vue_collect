<template>
  <div>
    <el-row style="width:100%;" class="user-time__title">
      <i class="el-icon-back" @click="handleBack"></i>
       <el-col style="margin-left:10px;">用户登录时间</el-col>
    </el-row>
    <el-row>
      <div class="user-time__table">
        <div class="user-order__select">
          <el-date-picker
            v-model="valueDayTimeDate"
            type="date"
            placeholder="选择日期"
            @change="trendDayTimeChange">
          </el-date-picker>
        </div>
        <DataTable
        :list="userTableData"
        :current-page="1"
        :total="10"/>
      </div>
    </el-row>
  </div>
</template>

<script>
import DataTable from '../../components/UserInfoG2/UserTimeDataTable.vue'
import { fetchUserTimesData } from '../../assets/js/api'

export default {
  data() {
    return {
      userTableData: [],
      valueDayTimeDate: '',
    }
  },
  // watch: {
  //   '$store.state.MarketId'(newValue) {
  //     if (newValue) {
  //       const userId = this.$route.query.id
  //       this.handleGetUserTimeData(newValue, userId)
  //     }
  //   },
  //   immediate: true,
  // },
  components: {
    DataTable,
  },
  methods: {
    trendDayTimeChange() {
      const userId = this.$route.query.id
      const Day = this.$moment(this.valueDayTimeDate).format('YYYY-MM-DD')
      this.handleGetUserTimeData(userId, Day)
    },
    async handleGetUserTimeData(userId, Day) {
      const { data } = await fetchUserTimesData({ userId, Day })
      if (data.data.length === 0) {
        this.oldData = []
        this.$message.error('该用户没有登录过')
      }
      const oldData = data.data
      const newData = oldData.map(item => (
        {
          用户Id: item.userId,
          登录时间: item.loginTime,
        }))
      this.userTableData = newData
    },
    handleBack() {
      this.$router.push({ path: './userInfo' })
    },
  },
  mounted() {
    const userId = this.$route.query.id
    const Day = this.$moment().format('YYYY-MM-DD')
    this.valueDayTimeDate = Day
    // const userId = '1008348'
    this.handleGetUserTimeData(userId, Day)
  },
}
</script>

<style lang="scss">
.user-time__title{
  width:100%;
  height:30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  font-size: 18px;
  color:#409EFF;
  background: #fff;
  box-shadow: 5px 0 6px 0 rgba(0,0,0,0.13);
}
.el-icon-back:hover{
  cursor: pointer;
}
.user-time__table{
  background: #fff;
  margin-top:20px;
}
.user-time .el-col {
  width: 20%;
  border-right: 2px solid #F0F2F5;
}
</style>
