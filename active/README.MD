# 注意事项

- 适配方案采用的VW
- git commit message采用的Angular规范
- mock数据路径/public/mock
- CSS预编译器采用的是Sass

# 目录介绍

```
|--src
|   |--assets
|   |  |--css
|   |  |--icon
|   |  |--images
|   |  |--js
|   |  |  |--api.js  // 所有的接口写到这里。几种类型的传参形式要注意 
|   |  |  |--event-bus.js // 非父子组件的传值
|   |  |  |--login.js // 登录的回调，执行一个方式的时候，判断是否登录。调取原生
|   |  |  |--native.js // 原生交互的方法都写在里面
|   |  |  |--share.js // 分享的api
|   |  |  |--util.js // 工具类
|   |--components
|   |--views
|   |  |--Address.vue
|   |  |--CashBack.vue // app嵌套的banner跳转的活动页面
|   |  |--Commend.vue
|   |  |--CommenrExpire.vue
|   |  |--Coupon.vue // 有会员的优惠券页面
|   |  |--CouponCopy.vue // 没有会员的优惠券页面
|   |  |--CreateAddr.vue
|   |  |--DeliveryCouponSuccess.vue
|   |  |--DeliveryInfo.vue
|   |  |--DeliveryOrSelfWechat.vue // 微信公众号跳转自提还是配送的页面
|   |  |--DownLoad.vue // 运营要的中转跳转到下载的页面
|   |  |--FlashSale.vue
|   |  |--Login.vue
|   |  |--Member.vue //优惠券购买会员的页面
|   |  |--NewPeople.vue  // app嵌套的banner跳转的活动页面
|   |  |--PayQRCode.vue
|   |  |--Register.vue
|   |  |--RegisterSuccess.vue
|   |  |--RewardProgress.vue
|   |  |--userService.vue // app的服务协议html
|   |--App.vue
|   |--main.js
|   |--router.js
|   |--store.js
```