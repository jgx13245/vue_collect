<template>
  <div class="eva-wrap">
    <div class="eva-title">随访问卷</div>
    <div class="eva-list">
      <ul class="eva-gun">
        <li class="eva-item">
          <div class="evaSui-hyper">
          <div class="evaSui-recently">最近一次的血压水平（mmHg）</div>
          <div class="evaSui-hyperRange">
            <div class="evaSui-sys">
              <div>收缩压</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <mt-range v-model="rangeShou" :min="60" :max="300">
                </mt-range>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{rangeShou}}</div>
            </div>
            <!--舒张压-->
            <div class="evaSui-dia">
              <div>舒张压</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <mt-range v-model="rangeShu" :min="40" :max="130">
                </mt-range>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{rangeShu}}</div>
            </div>
            <!--心率-->
              <div class="evaSui-heart">
              <div>心率</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <mt-range v-model="rangevaXin" :min="30" :max="300">
                </mt-range>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{rangevaXin}}</div>
            </div>
          </div>
        </div>
        </li>
         <li class="eva-item">
          <div class="evaSui-hyper">
          <div class="evaSui-recently">最近一次的血脂水平（mmHg）</div>
          <div class="evaSui-hyperRange">
            <div class="evaSui-sys">
              <div>TC</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <!-- <mt-range v-model="rangeShou" >
                </mt-range> -->
                <range-slider
                  class="slider"
                  min="1"
                  max="15"
                  step="0.01"
                v-model="tc">
            </range-slider>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{tc.toFixed(2)}}</div>
            </div>
            <!--舒张压-->
            <div class="evaSui-dia">
              <div>LDL-C</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <!-- <mt-range v-model="ldl">
                </mt-range> -->
                 <range-slider
                  class="slider"
                  min="1"
                  max="15"
                  step="0.01"
                v-model="ldl">
              </range-slider>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{ldl.toFixed(2)}}</div>
            </div>
            <!--心率-->
            <div class="evaSui-heart">
              <div>HDL-C</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <!-- <mt-range v-model="hdl">
                </mt-range> -->
                <range-slider
                  class="slider"
                  min="1"
                  max="15"
                  step="0.01"
                v-model="hdl">
              </range-slider>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{hdl.toFixed(2)}}</div>
            </div>
             <div class="evaSui-heart">
              <div>TG</div>
              <div class="sub">-</div>
              <div class="evaSui-range"> 
                <!-- <mt-range v-model="rangevaXin">
                </mt-range> -->
                <range-slider
                  class="slider"
                  min="1"
                  max="15"
                  step="0.01"
                v-model="tg">
              </range-slider>
              </div>
              <div class="add">+</div>
              <div class="evaSui-count">{{tg.toFixed(2)}}</div>
            </div>
            <div @click="handleSaveSui" class="evaSui-heart" style="background:#035732; color:#fff; padding:10px;" v-if="suiStatus !== '1'">
              保存
            </div>
          </div>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
// you probably need to import built-in style
import 'vue-range-slider/dist/vue-range-slider.css'
import { mapState } from 'vuex'
import { fetchSickSuiFangInfo, fetchSickSuiFangInfoSave} from '../assets/js/api'

export default {
  data() {
    return {
      yearShow:false,
      rangeShou:60, //收缩压
      rangeShu:40, //舒张压
      rangevaXin: 30,// 心率
      suiStatus:'',
      tc:1, //tc
      ldl:1, //ldl-c
      hdl: 1,// hdl-c
      tg: 1,// tg
      change:true,
    }
  },
  components:{
    RangeSlider
  },
  computed:{
    ...mapState(['suiStatus',"caseId"])
  },
  methods: {
    // handleChangeColor(e){
    //    //获取元素内的属性
    //   const isSick = e.target.getAttribute("isSick");
    //   if(isSick == 'new'){
    //     this.change= true
    //     this.hyperParams.doh = '新诊断的高血压患者'
    //   }else if(isSick == 'unknow'){
    //     this.change= false
    //     this.hyperParams.doh = '未确诊高血压'
    //   }
    // },
    // inputEvent() {
    // },
    // changeEventA() {
    //   this.hyperParams.sbpLately = this.rangeShou
    // },
    // changeEventB() {
    //   this.hyperParams.dbpLately = this.rangeShu
    // }, 
    // changeEventC() {
    //   this.hyperParams.hrLately = this.rangevaXin
    // },
    async getSuiList() {
      const caseId = localStorage.getItem('suiId')
      const res = await fetchSickSuiFangInfo({ caseId })
      console.log(res)
      const { sbp, dbp, hr, tc, ldlC, hdlC, tg }  = res.data.obj
      this.rangeShou = sbp //收缩压
      this.rangeShu = dbp //舒张压
      this.rangevaXin = hr // 心率
      this.tc = tc
      this.ldl = ldlC
      this.hdl = hdlC
      this.tg = tg
    },
    // 保存随访
    handleSaveSui() {
      this.getSaveSui(this.rangeShou, this.rangeShu, this.rangevaXin, this.tc, this.ldl, this.hdl, this.tg, this.caseId)
    },
    async getSaveSui(sbp, dbp, hr, tc, ldlC, hdlC, tg, caseId) {
      const res = await fetchSickSuiFangInfoSave({ sbp, dbp, hr, tc, ldlC, hdlC, tg, caseId })
      if(res.data.success === true){
        this.$toast('保存成功')
        this.$router.push({path:'./sickQuestion'})
      }
    }
  },
  mounted(){
    const suiStatus = localStorage.getItem('suiStatus')
    this.suiStatus = suiStatus
    if(suiStatus == 1){
      this.getSuiList()
    }
  }
}
</script>

<style lang="scss">
.eva-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #E9F5F1;
}
.eva-title{
  width:100%;
  height:5%;
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#3D3F3E;
  letter-spacing: 5px;
  font-size: 35px;
}
.eva-list{
  height: 95%;
  overflow-y: scroll;
}
.eva-gun{
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 10px 0 10px 0;
}
.eva-item{
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:100px;
}
/* 进度条 */ 
.evaSui-hyper{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.evaSui-recently{
  width:95%;
  height:80px;
  text-align: center;
  background:#035732;
  color:#fff;
  line-height: 80px;
}
.evaSui-hyperRange{
    width:95%;
    height:250px;
    border-radius: 30px;
    background: #E9F5F1;
    margin-top:20px;
   /* border:1px solid #0f0;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .evaSui-sys {
      width:95%;
      height:70px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 20%;
        font-size: 18px;
      }
      .evaSui-range {
        flex:1;
      }
      .slider{
        width:100%;
      }
      .evaSui-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        margin:5px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
    /*舒张压*/
    .evaSui-dia {
      width:95%;
      height:70px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 20%;
        font-size: 18px;
      }
      .evaSui-range {
        flex:1;
      }
      .slider{
        width:100%;
      }
      .evaSui-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        height: 35px;
        margin:5px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
     /*心率*/
    .evaSui-heart {
      width:95%;
      height:70px;
     /* border:1px solid #0f0;*/
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-child(1) {
        width: 20%;
        font-size: 18px;
      }
      .evaSui-range {
        flex:1;
      }
      .slider{
        width:100%;
      }
      .evaSui-count {
        width: 20%;
        text-align: center;
      }
      .sub, .add {
        width: 35px;
        margin:5px;
        height: 35px;
        border:1px solid #22A559;
        // border-radius: 50%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #035832;
      }
    }
  }
</style>