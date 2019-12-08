import Vue from 'vue'
import Vuex from 'vuex'


const state = {
  // marketId: process.env.NODE_ENV === 'development' ? 300 : null,
  code: '',
  tranches:'', // 区分医生端分组 血脂，血压 
  doctorId:'', // 医生id
  gndc: [], //观念调查
  zqty: [], //知情同意 
  caseId:'', //患者id
  evaResult: {}, //评估结果
  serviceId:'', //协议列表id
  gndc2:null, // 判断劳务协议后的观念调查是否填写
  sign:null, // 判断劳务协议的签名是否填写
  name: "", // 医生姓名
  hospital: "", // 医生医院
  offices: "", //科室
  accountName: "", // 开户名
  bankname: "" ,//开户行
  accountNumber:"" ,// 开户账号
  personalId:"", // 身份证
  doctorMobile:"", //医生手机号
  openCaseId:"", //患者openId
  caseTranches:'',// 患者的分组 
  caseName:'',// 患者姓名
  assessId:'',// 风险评估结果id 
  suiStatus:'',// 患者随访记录是否填写
}

const mutations = {
  updateCode (state, options) {
    state.code = options.code
  },
  // 医生分组情况
  updateTranches (state, options) {
    state.tranches = options.tranches
  },
  // 医生id
  updateDoctorId (state, options) {
    state.doctorId = options.doctorId
  },
  // 医生观念调查
  updateGndc (state, options) {
    state.gndc = options.gndc
  },
   // 医生知情同意
   updateZqty (state, options) {
    state.zqty = options.zqty
  },
  // 更改患者id
  updateCaseId (state, options) {
    // console.log(options.caseId)
    state.caseId = options.caseId
  },
  // 医生评估结果
  updateEvaResult (state, options) {
    console.log(options)
    state.evaResult = options
  },
  // 系列id保存
  updateServiceId (state, options) {
    state.serviceId = options.id
  },
  // 判断劳务协议后的观念调查是否填写
  updateGndc2 (state, options) {
    state.gndc2 = options.gndc2
  },
  // 判断劳务协议的签名是否填写
  updateSign (state, options) {
    state.sign = options.sign
  },
  // 医生信息
  updateDoc(state, options) {
    state.name = options.name
    state.hospital = options.hospital
    state.offices = options.offices
    state.accountName = options.accountName
    state.bankname = options.bankname
    state.accountNumber = options.accountNumber
    state.personalId = options.personalId
    state.doctorMobile = options.doctorMobile
  },
   //风险评估结果id
   updateInvesFinish(state, options){
    state.assessId = options.assessId
  },
  // 患者openid
  updateCaseOpenid(state, options) {
    state.openCaseId = options.openCaseId
  },
  //患者分组
  updateCaseTranches(state, options) {
    state.caseTranches = options.caseTranches
  },
  //患者姓名
  updateCaseName(state, options){
    state.caseName = options.caseName
  },
   //患者随访记录是否填写记录
  updateSuiStatus(state, options){
    console.log(options)
    state.suiStatus = options.suiStatus
  }
}

const getters = {
  getUserId: state => {
    return state.userId
  },
  isLogin: state => {
    return state.isLogin
  }
}

const actions =  {
  
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
