import { isWX, isMobileIOS, encodeQuery } from './util'
import { fetchWechatSDKConfig, fetchRecommendTokenByOpenid } from './api'
export default {
  created () {
    // TODO 请求配置参数接口
    if (isWX()) {
      fetchWechatSDKConfig({
        url: isMobileIOS() ? window.iOSShareURL : window.location.href.split('#')[0] // 安卓 当前页面的URL会刷新 iOS 是第一次进入页面的URL
      }).then(res => {
        const info = res.data || {}
        const { appId, nonceStr, signature, timestamp } = info
        this.initWXJavaScriptSDK({
          appId,
          nonceStr,
          signature,
          timestamp
        })
      })
    }
  },
  methods: {
    _registerWXHandler ({ title, imgUrl, desc, link }) {
      /* eslint-disable */
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title,
          link,
          imgUrl,
          success: function () {},
          cancel: function () {}
        })

        wx.onMenuShareAppMessage({
          title,
          desc, // 分享描述
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {},
          cancel: function () {}
        })
      })
    },
    initWXJavaScriptSDK (config) {
      /* eslint-disable */
      const { title, imgUrl, desc } = this.$route.meta
      let link = window.location.href.split('?')[0]
      wx.config(Object.assign({}, config, {
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ],
        debug: process.env.NODE_ENV === 'development' ? true : false
      }))

      const name = this.$route.name
      // 生成推荐码
      if (name === 'register' || name === 'register-success') {
        fetchRecommendTokenByOpenid({
          openId: localStorage.getItem('openId')
        }).then(res => {
          const { code, message } = res.data
          link += '?' + encodeQuery({ token: message })
          if (code === 200) {
            this._registerWXHandler({ title, imgUrl, desc, link })
          }
        })
        return true
      }

      this._registerWXHandler({ title, imgUrl, desc, link })
    }
  }
}