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
|   |  |  |--api.js  // 所有的公司的接口写到这里。几种类型的传参形式要注意 
|   |  |  |--apiRepresent.js // 医生端 患者端的接口
|   |  |  |--event-bus.js // 非父子组件的传值
|   |  |  |--login.js // 登录的回调，执行一个方式的时候，判断是否登录。调取原生
|   |  |  |--native.js // 原生交互的方法都写在里面
|   |  |  |--share.js // 分享的api
|   |  |  |--util.js // 工具类
|   |--components
|   |  |--DoctorSickEva（文件夹）  // 医生端提交评估结果组件部分。(views目录里面找对应的名字)
|   |  |--DoctorSickEvaDetail （文件夹）// 医生端评估结果查看详情组件部分。 (views目录里面找对应的名字)
|   |  |--SickEvaDetail （文件夹） // 患者端查看自己的评估结果详情组件部分 (views目录里面找对应的名字)
|   |--views
|   |  |--DoctorAgree.vue  // 医生知情同意书
|   |  |--DoctorClassify.vue // 医生端分类（血脂，血压）
|   |  |--DoctorHealthClass.vue // 医生端健康教育视频列表
|   |  |--DoctorInvestigate.vue // 医生端第一次的风险评估
|   |  |--DoctorInvesTwo.vue // 医生端劳务协议第二次的风险评估
|   |  |--DoctorLogin.vue // 医生端登录
|   |  |--DoctorPerson.vue // 医生端个人信息中心
|   |  |--DoctorQrcode.vue // 医生端首页 二维码
|   |  |--DoctorSickEva.vue // 医生端风险评估 保存按钮
|   |  |--DoctorSickEvaDetail.vue // 医生端患者列表详情页查看
|   |  |--DoctorSickManage.vue // 医生端患者信息列表
|   |  |--DoctorSign.vue // 医生劳务协议签名
|   |  |--EvaResult.vue // 医生一键转发评估结果的页面
|   |  |--RepresentChoose.vue //代表段医生个人信息
|   |  |--RepresentGetUrl.vue  // 代表段获取url视频链接
|   |  |--RepresentInfo.vue // 代表端填写医生信息
|   |  |--RepresentSubmitDoctorName.vue // 代表端三个按钮选择
|   |  |--RepresentVideo.vue // 代表端赋值url
|   |  |--SickAgree.vue // 患者端患者同意书
|   |  |--SickHealth.vue // 患者健康教育视频列表
|   |  |--SickInfo.vue // 患者信息录取
|   |  |--SickMyNews.vue // 患者查看自己信息列表
|   |  |--SickQuestion.vue // 患者查看自己随访记录
|   |  |--SickSuiFang.vue // 患者填写自己的随访记录
|   |  |--SickThanks.vue // 患者感谢页面
|   |--App.vue
|   |--main.js
|   |--router.js
|   |--store.js
```


# 项目注意事项

1. router.js部分    因为和微信结合了，需要获取code，所以本地联调，需要需要给code赋值一个假值

2. vue.config.js  是本地前端配置， devServer这个对象里面的是用来本地联调线上接口的，


```js

// 公司的接口

 proxy: {
      '/apis': {
        // target: 'http://10.1.1.197:8081/umbrella/', 
        target: 'http://server.iumed.com.cn/umbrella/', // umbrella 线上地址
        // target:'https://cubemedlink.com/', // umbrella 外包线上地址
        changeOrigin: true,
        pathRewrite: {
          '^/apis/': ''
        }
      }
    }
```

```js

// 外包的接口

 proxy: {
      '/umapis': {
        // target: 'http://10.1.1.197:8081/umbrella/', 
        // target: 'http://server.iumed.com.cn/umbrella/', // umbrella 线上地址 
        target:'https://cubemedlink.com/',// umbrella 外包线上地址
        changeOrigin: true,
        pathRewrite: {
          '^/umapis/': ''
        }
      }
    }
```

3. 有时候在data里面添加新东西，发现组件深层次对象无法赋值，查看相关资料，这是vue的一个小坑，不是代码写错了。。

# 未来可优化部分

1. 把本地图片放到dns服务器，打包速度大大加快

2. 路由组件部分可提取公共方法，单独列出，减少代码数量

3. 有想法可以试试多组件复用功能