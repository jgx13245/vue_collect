import axios from 'axios'
import Vue from 'vue'
const _instance = new Vue()

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/apis/'
// axios.defaults.baseURL = "http://server.iumed.com.cn/umbrella/"

axios.interceptors.request.use(
  config => config,
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





/**--------代表的所有接口--------**/

//获取省份

export const fetchProvince = (options) => {
  return axios.get('rpm/province', {
    params: options
  })
}

//获取城市
/**
 * @param { String } province
 */
export const fetchCity = (options) => {
  return axios.get('rpm/city', {
    params: options
  })
}

//获取医院
/**
 * @param { String } province
 */
export const fetchHos = (options) => {
  return axios.get('rpm/hospital', {
    params: options
  })
}

//获取科室

export const fetchDept = (options) => {
  return axios.get('rpm/dept', {
    params: options
  })
}

//获取时间段
/**
 */
export const fetchTimeQuantum = (options) => {
  return axios.get('/rpm/timeQuantum', {
    params: options
  })
}

//获取职称

export const fetchTitles = (options) => {
  return axios.get('/rpm/titles', {
    params: options
  })
}

//提交选项信息
/**
 * @param { String } province
 */
export const fetchSubmitDoctor = (options) => {
  return axios.post('rpm/submitDoctor', options, {})
}

//提交video
/**
 * @param { String } province
 */
export const fetchVideo = (options) => {
  return axios.post('rpm/submitVideo', options, {})
}


