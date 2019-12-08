<template>
  <div class="result-wrap">
    <div v-if="ascvdRiskAssessmentLevel === '' && cvdGrade !== ''">
      <div class="result-cvd">
        <div class="cvd-tip" v-if="cvdGrade === '1'">
          <img :src="img1" alt="">
        </div>
        <div class="cvd-tip" v-if="cvdGrade === '2'">
          <img :src="img2" alt="">
        </div>
        <div class="cvd-tip" v-if="cvdGrade === '3'">
          <img :src="img3" alt="">
        </div>
        <div class="cvd-tip" v-if="cvdGrade === '4'">
          <img :src="img4" alt="">
        </div>
         <div class="submitRelay" @click="handleRelay">
          一键转发给患者
        </div>
        <ul>
          <li class="result-rank">
            <span class="rank">CVD十年平均发病风险 {{cvdTenYearsAverageRisk}} </span>
          </li>
          <li class="result-advice">
            <span>治疗建议</span>
            <span>{{afts}} </span>
          </li>
          <li class="result-target">
            <span>血压目标</span>
            <span>{{bloodPressureGoals}} </span>
          </li>
          <li class="result-recommend">
            <span>药物推荐</span>
            <span>{{drugsRecommended}} </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="ascvdRiskAssessmentLevel !== '' && cvdGrade === ''">
      <div class="result-ascvd">
         <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '1'">
          <img :src="img1" alt="">
        </div>
        <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '2'">
          <img :src="img2" alt="">
        </div>
        <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '3'">
          <img :src="img3" alt="">
        </div>
        <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '4'">
          <img :src="img4" alt="">
        </div>
        <div class="asSubmitRelay" @click="handleRelay">
          一键转发给患者
        </div>
        <ul>
          <li class="result-asrank">
            <span class="asrank">ASCVD十年平均发病风险 {{ascvdTenYearsAverageRisk}} </span>
          </li>
          <li class="result-ldl">
            <span>LDL-C目标值</span>
            <span>{{ldlCTarget}} </span>
          </li>
          <li class="result-c">
            <span>LDL-C达标情况</span>
            <div class="xiao">
              <span :class="ldlCStandards === '达标' ? 'bian' : ''"></span>
              <span :class="ldlCStandards === '未达标' ? 'bian' : ''"></span>
            </div>
          </li>
          <li class="result-fat">
            <span>调脂治疗建议</span>
            <span>{{fatManagementRecommendations}} </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="ascvdRiskAssessmentLevel !== '' && cvdGrade !== ''">
      <div class="result-cvd">
        <div class="cvd-tip" v-if="cvdGrade === '1'">
          <img :src="img1" alt="">
        </div>
        <div class="cvd-tip" v-if="cvdGrade === '2'">
          <img :src="img2" alt="">
        </div>
        <div class="cvd-tip" v-if="cvdGrade === '3'">
          <img :src="img3" alt="">
        </div>
        <div class="cvd-tip" v-if="cvdGrade === '4'">
          <img :src="img4" alt="">
        </div>
         <!-- <div class="submitRelay" @click="handleRelay">
          一键转发给患者
        </div> -->
        <ul>
          <li class="result-rank">
            <span class="rank">CVD十年平均发病风险 {{cvdTenYearsAverageRisk}} </span>
          </li>
          <li class="result-advice">
            <span>治疗建议</span>
            <span>{{afts}} </span>
          </li>
          <li class="result-target">
            <span>血压目标</span>
            <span>{{bloodPressureGoals}} </span>
          </li>
          <li class="result-recommend">
            <span>药物推荐</span>
            <span>{{drugsRecommended}} </span>
          </li>
        </ul>
      </div>
      <div class="result-ascvd">
       <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '1'">
          <img :src="img1" alt="">
        </div>
        <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '2'">
          <img :src="img2" alt="">
        </div>
        <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '3'">
          <img :src="img3" alt="">
        </div>
        <div class="ascvd-tip" v-if="ascvdRiskAssessmentLevel === '4'">
          <img :src="img4" alt="">
        </div>
        <div class="asSubmitRelay" @click="handleRelay">
          一键转发给患者
        </div>
        <ul>
          <li class="result-asrank">
            <span class="asrank">ASCVD十年平均发病风险 {{ascvdTenYearsAverageRisk}} </span>
          </li>
          <li class="result-ldl">
            <span>LDL-C目标值</span>
            <span>{{ldlCTarget}} </span>
          </li>
          <li class="result-c">
            <span>LDL-C达标情况</span>
            <div class="xiao">
              <span :class="ldlCStandards === '达标' ? 'bian' : ''"></span>
              <span :class="ldlCStandards === '未达标' ? 'bian' : ''"></span>
            </div>
          </li>
          <li class="result-fat">
            <span>调脂治疗建议</span>
            <span>{{fatManagementRecommendations}} </span>
          </li>
        </ul>
      </div>
    </div>
     <div v-if="ascvdRiskAssessmentLevel === '' && cvdGrade === ''">无数据</div>
  </div>
</template>

<script>
import { fetchPush } from '../assets/js/api'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      tranches:'', // 确定是血压还是血脂
      cvdGrade:'',  // cvd评估等级
      cvdTenYearsAverageRisk: '',// CVD十年发病平均风险
      afts:'', //治疗建议
      bloodPressureGoals:'', // 血压目标
      drugsRecommended:'', //药物推荐
      assessId:'',

      ascvdRiskAssessmentLevel:'', //ASCVD风险评估等级
      ascvdTenYearsAverageRisk:'', //ASCVD十年发病平均风险
      ldlCTarget:'',// LDL-C目标值
      ldlCStandards:'', //LDL-C达标情况
      fatManagementRecommendations: '',//调脂治疗建议
      img1:require('../assets/images/low.png'),
      img2:require('../assets/images/mid.png'),
      img3:require('../assets/images/hight.png'),
      img4:require('../assets/images/veryHigh.png'),
    }
  },
  computed:{
    ...mapState(["evaResult"])
  },
  methods:{
    handleRelay() {
      console.log(this.assessId,'能不能获取到assessId')
      this.pushEva(this.assessId)
    },
    async pushEva(assessId){
      const res = await fetchPush({ assessId })
      if(res.data.success === true) {
        this.$toast('转发成功')
        this.$router.push({path:'./doctorSickManage'})
      }
    }
  },
  mounted() {
    this.tranches = this.evaResult.tranches
    this.cvdGrade = this.evaResult.cvdGrade
    this.assessId = this.evaResult.assessId
    this.cvdTenYearsAverageRisk = this.evaResult.cvdTenYearsAverageRisk
    this.afts = this.evaResult.afts
    this.bloodPressureGoals = this.evaResult.bloodPressureGoals
    this.drugsRecommended = this.evaResult.drugsRecommended
    this.ascvdRiskAssessmentLevel = this.evaResult.ascvdRiskAssessmentLevel
    this.ascvdTenYearsAverageRisk = this.evaResult.ascvdTenYearsAverageRisk
    this.ldlCTarget = this.evaResult.ldlCTarget
    this.ldlCStandards = this.evaResult.ldlCStandards
    this.fatManagementRecommendations = this.evaResult.fatManagementRecommendations
  }
}
</script>

<style lang="scss">
.result-wrap{
  width:100%;
  height:100%;
  background: #D7ECE5;
  >div{
    width:100%;
    height:100%;
  }
  .result-cvd{
    width:100%;
    height:100%;
    background: #D7ECE5 url("../assets/images/cvd.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .submitRelay{
      position: absolute;
      bottom: 140px;
      right: 80px;
      background: #035732;
      color:#fff;
      border-radius: 20px;
      padding: 10px;
    }
    .cvd-tip{
      width:130px;
      height:130px;
      position: absolute;
      right: 40px;
      top:12%;
      img{
        width: 100%;
      }
    }
    ul{
      width: 100%;
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li{
        width:90%;
        height: 220px;
        border:1px solid #22A359;
        border-radius: 10px;
        margin-top:30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        >span:nth-child(1){
          display: block;
          width: 80%;
          color:#307C54;
          font-size:40px;
          padding: 10px;
        }
        >span:nth-child(2){
          display: block;
          margin-top:10px;
          width: 80%;
          color:#307C54;
          font-size:16px;
          padding: 10px;
        }
      }
      .result-rank{
        height:110px;
        margin-top:30px;
        display: flex;
        justify-content:flex-end;
        align-items: center;
        border:none;
        .rank{
           width: 100%;
           font-size:30px;
           padding: 0;
        }
      }
      .result-advice{
        background:  url('../assets/images/advice.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
       }
      .result-target{
        background:  url('../assets/images/target.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
      }
      .result-recommend{
        background:  url('../assets/images/yao.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
      }
    }
  }
  /*ascvd模块*/
  .result-ascvd{
    width:100%;
    height:100%;
    background: #fff url("../assets/images/ascvd.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .asSubmitRelay{
      position: absolute;
      bottom: 140px;
      right: 80px;
      background: #035732;
      color:#fff;
      border-radius: 20px;
      padding: 10px;
    }
    .ascvd-tip{
      width:130px;
      height:130px;
      position: absolute;
      right: 40px;
      top:12%;
      img{
        width: 100%;
      }
    }
     ul{
      width: 100%;
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li{
        width:90%;
        height: 220px;
        border:1px solid #22A359;
        border-radius: 10px;
        margin-top:10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        >span:nth-child(1){
          display: block;
          width: 80%;
          color:#307C54;
          font-size:40px;
          padding: 10px;
        }
        >span:nth-child(2){
          display: block;
          margin-top:10px;
          width: 80%;
          color:#307C54;
          font-size:16px;
          padding: 10px;
        }
      }
      .result-asrank{
        height:40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border:none;
        .asrank{
           width: 100%;
           font-size:30px;
           padding: 0;
        }
      }
      .result-ldl{
        background:  url('../assets/images/down.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
       }
      .result-c{
        background:  url('../assets/images/target.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
        .xiao {
          width: 100%;
          height: 60%;
          display: flex;
          justify-content:space-around;
          align-items: center;
          span{
            width:40%;
            height:100%;
          }
          span:nth-child(1){
             background:  url('../assets/images/xiao.png') no-repeat center;
             background-size: 50% 100%;
          }
          span:nth-child(2){
             background:  url('../assets/images/ku.png') no-repeat center;
             background-size: 50% 100%;
          }
          .bian{
            opacity: 0.1;
          }
        }
      }
      .result-fat{
        background:  url('../assets/images/advice.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
      }
    }
  }
}
</style>