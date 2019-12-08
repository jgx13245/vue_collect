import axios from 'axios'
import Vue from 'vue'
const _instance = new Vue()

axios.defaults.timeout = 15000
axios.defaults.baseURL = '/umapis/'
// axios.defaults.baseURL = "http://server.iumed.com.cn/umbrella/"

axios.interceptors.request.use(
  config => {
    // console.log(config)
    let url = config.url
    console.log(url)
    if(url.indexOf("apiAuthController/openid.do")>-1 || url.indexOf("loginByValidCode")>-1 || url.indexOf("sendValidCode")>-1 || url.indexOf("loginController/api/loginByCaseOpenId.do")>-1){
      return config
    }else if(url.indexOf("/ubaVoPatientFollowUpController/api")>-1 ||url.indexOf("/tCaseController/api/update.do")>-1 || url.indexOf("ubaMidPatientInformationController/api/list.do")>-1 
			|| url.indexOf("ubaPatientInformedConsentController/api/save.do")>-1  || url.indexOf("ubaVoPatientFollowUpController/api/list.do")>-1||url.indexOf("tCaseController/api/info.do")>-1 ){
      console.log(localStorage.getItem("caseToken"), '患者token')
      config.headers['X-Cube-Token'] = localStorage.getItem("caseToken")
      return config
    }else{
      console.log(localStorage.getItem("docToken"), '医生token')
      config.headers['X-Cube-Token'] = localStorage.getItem("docToken")
      return config
    }
    // return config
  },
  err => Promise.reject(err)
)

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const code = error.response.status
      switch (code) {
        case 500:
          break
        case 401:
          break
      }
    }
    _instance.$toast(error.message || error)
    return Promise.resolve(Object.create(null)) // 以免数据解构错误
  }
)

// TODO 定义接口


// 授权地址 https://m.24igo.com/page/wx/recirect
// code url state


/*----------医生所有接口-------------*/

// 获取openId
export const fetchDocOpenid = (options) => {
  return axios.post('apiAuthController/openid.do', options, {})
}

// openId医生登录

export const fetchOpenIdLogin = (options) => {
  return axios.get('loginController/api/loginByDoctorOpenId.do', {
    params: options
  })
}

//获取验证码

export const fetchDoctorValid = (options) => {
  return axios.get('loginController/api/sendValidCode.do', {
    params: options
  })
}

// 医生登录按钮
export const fetchDoctorLogin = (options) => {
  return axios.get('loginController/api/loginByValidCode.do', {
    params: options
  })
}

// 医生观念调查表保存对象

export const fetchDocGndcSave = (options) => {
  return axios.post('ubaDoctorConceptQuestionnaireController/api/save.do', options, {})
}

// 医生观念调查表2保存对象

export const fetchDocGndc2Save = (options) => {
  return axios.post('ubaDoctorConceptIfsignController/api/save.do', options, {})
}



// 医生知情同意书保存对象

export const fetchDocZqty = (options) => {
  return axios.post('ubaDoctorInformedConsentController/api/save.do', options, {})
}

// 医生获取患者列表对象
export const fetchSickList = (options) => {
  return axios.get('tCaseController/api/list.do', {
    params: options
  })
}


// 医生首页  个人信息表

export const fetchDoctorFirst = (options) => {
  return axios.get('ubaDoctorInfoController/api/info.do', {
    params: options
  })
}

// 医生首页  账户信息表

export const fetchDoctorAccount = (options) => {
  return axios.get('ubaDoctorAccountInfoController/api/info.do', {
    params: options
  })
}

// 医生评估保存

export const fetchDocEvaSave = (options) => {
  return axios.post('ubaAssessController/api/save.do', options, {})
}

// 获取评估保存结果   在医生患者管理详情页面里面

export const fetchDocEvaResult = (options) => {
  return axios.get(`/ubaAssessController/api/${options.id}/info.do`, {})
}

// 提交医生信息的接口

export const fetchDocInfoSave = (options) => {
  return axios.post('ubaMidDoctorServiceAgreementController/api/signature.do', options, {})
}

// 获取劳务协议的展示页

export const fetchNegotiate = (options) => {
  return axios.get(`ubaMidDoctorServiceAgreementController/api/${options.id}/pdf.do`, {})
}

// 一件转发评估结果

export const fetchPush = (options) => {
  return axios.get(`ubaAssessController/api/${options.assessId}/push.do`, {})
}

// 医生个人信息提交按钮

export const fetchDoctorPersonInfo = (options) => {
  return axios.post('/ubaDoctorAccountInfoController/api/save.do', options, {})
}

/*----------------------患者端-------------------*---------*-----------*/

// openId患者登录

export const fetchOpenIdSickLogin = (options) => {
  return axios.get('loginController/api/loginByCaseOpenId.do', {
    params: options
  })
}
// 保存患者信息

export const fetchSickInfoSave = (options) => {
  return axios.post('/tCaseController/api/update.do', options, {})
}

// 患者消息列表获取

export const fetchSickListData = (options) => {
  return axios.post('ubaMidPatientInformationController/api/list.do', options, {})
}

// 患者知情同意

export const fetchSickAgreeData = (options) => {
  return axios.post('ubaPatientInformedConsentController/api/save.do', options, {})
}


// 患者随访问卷消息列表获取

export const fetchSickSuiFangList = (options) => {
  return axios.post('ubaVoPatientFollowUpController/api/list.do', options,  {})
}


// 患者获取评估结果

export const fetchSickPingGu = (options) => {
  return axios.get(`ubaAssessController/api/${options.openId}/result.do`,  {})
}

// 患者随访问卷消息获取

export const fetchSickSuiFangInfo = (options) => {
  return axios.get(`/ubaVoPatientFollowUpController/api/${options.caseId}/info.do`,  {})
}


// 患者随访问卷消息保存

export const fetchSickSuiFangInfoSave = (options) => {
  return axios.post('/ubaVoPatientFollowUpController/api/save.do', options,  {})
}

//患者个人基本机芯
export const fetchSickBaseinfo = (options) => {
	return axios.get('/tCaseController/api/info.do', options,  {})
}
