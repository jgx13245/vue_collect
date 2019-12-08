<template>
  <div class="Dresult-wrap">
    <div  v-if="ascvdRiskAssessmentLevel === '' && cvdGrade !== ''">
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
          <!-- <li class="result-recommend">
            <span>药物推荐</span>
            <span>{{drugsRecommended}} </span>
          </li> -->
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
          <!-- <li class="result-recommend">
            <span>药物推荐</span>
            <span>{{drugsRecommended}} </span>
          </li> -->
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:["resParams"],
  data() {
    return {
      tranches:'1', // 确定是血压还是血脂
      cvdGrade:'1',  // cvd评估等级
      cvdTenYearsAverageRisk: '21',// CVD十年发病平均风险
      afts:'21', //治疗建议
      bloodPressureGoals:'21', // 血压目标
      drugsRecommended:'21', //药物推荐

      ascvdRiskAssessmentLevel:'1', //ASCVD风险评估等级
      ascvdTenYearsAverageRisk:'', //ASCVD十年发病平均风险
      ldlCTarget:'',// LDL-C目标值
      ldlCStandards:'', //LDL-C达标情况
      fatManagementRecommendations: '',//调脂治疗建议
      img1:require('../../assets/images/low.png'),
      img2:require('../../assets/images/mid.png'),
      img3:require('../../assets/images/hight.png'),
      img4:require('../../assets/images/veryHigh.png'),
    }
  },
  methods:{
    handleRelay() {
      console.log('转发给患者')
    }
  },
  mounted() {
    console.log(this.resParams,'90909090')
    this.tranches = this.resParams.tranches
    this.cvdGrade = this.resParams.cvdGrade
    this.cvdTenYearsAverageRisk = this.resParams.cvdTenYearsAverageRisk
    this.afts = this.resParams.afts
    this.bloodPressureGoals = this.resParams.bloodPressureGoals
    this.drugsRecommended = this.resParams.drugsRecommended
    this.ascvdRiskAssessmentLevel = this.resParams.ascvdRiskAssessmentLevel
    this.ascvdTenYearsAverageRisk = this.resParams.ascvdTenYearsAverageRisk
    this.ldlCTarget = this.resParams.ldlCTarget
    this.ldlCStandards = this.resParams.ldlCStandards
    this.fatManagementRecommendations = this.resParams.fatManagementRecommendations
  }
}
</script>

<style lang="scss" scoped>
.Dresult-wrap{
  width:95%;
  // height:1300px;
  >div{
    width:100%;
    height:100%;
  }
  .result-cvd{
    width:100%;
    // height:100%;
    border-radius: 30px;
    background: #fff url("../../assets/images/cvd.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    border:1px solid #035732;
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
      height:1300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li{
        width:90%;
        height: 260px;
        border:1px solid #22A359;
        border-radius: 10px;
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
        height:40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border:none;
        .rank{
           width: 100%;
           font-size:30px;
           padding: 0;
        }
      }
      .result-advice{
        background:  url('../../assets/images/advice.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
       }
      .result-target{
        background:  url('../../assets/images/target.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
      }
      .result-recommend{
        background:  url('../../assets/images/yao.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
      }
    }
  }
  /*ascvd模块*/
  .result-ascvd{
    width:100%;
    // height:100%;
    background: #fff url("../../assets/images/ascvd.png") no-repeat;
    border-radius: 30px;
    border:1px solid #035732;
    background-size: 100% 100%;
    position: relative;
    margin-top:20px;
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
     >ul{
      width: 100%;
      height:1300px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      li{
        width:90%;
        height: 240px;
        border:1px solid #22A359;
        border-radius: 10px;
        margin-top:10px;
        margin-bottom: 40px;
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
        background:  url('../../assets/images/down.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
       }
      .result-c{
        background:  url('../../assets/images/target.png') no-repeat;
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
             background:  url('../../assets/images/xiao.png') no-repeat center;
             background-size: 50% 100%;
          }
          span:nth-child(2){
             background:  url('../../assets/images/ku.png') no-repeat center;
             background-size: 50% 100%;
          }
          .bian{
            opacity: 0.1;
          }
        }
      }
      .result-fat{
        background:  url('../../assets/images/advice.png') no-repeat;
        background-size: 10% 30%;
        background-position: 5% 10%;
      }
    }
  }
}
</style>
