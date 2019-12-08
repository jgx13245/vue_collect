# 新鲜面试题

## this === vm ?

只是一个箭头函数的指向问题。实例化vue的时候，vue的方法使用call指向了this.$option.data.所以 this = this.$option.data。就乐意直接使用this.xx的数据


## promise

编写一个promise
```js
function test() {
  return new Promise((resolve, reject) => {
    const time = Math.random() * 2
    setTimeout(() => {
      if(time<1) {
        resolve(124)
      } else {
        reject(999)
      }
    }, 1000)
  })
}

test().then((res) => {
  console.log(res)
}).catch((error) => {
  console.log(error)
})
```

```js
class Pro {
  constructor (fun) {
    this.PromiseValue = ''
    this.PromiseStatus = 'pending'
    this.PromiseList = []
    if (fun) {
    fun(this.resolve.bind(this), this.reject.bind(this))
    }
  }
  then (fun) {
    this.PromiseList.push(fun)
    return this
  }
  resolve (v) {
    this.PromiseStatus = 'resolved'
    this.PromiseValue = v
    this.go()
  }
  reject (v) {
    this.PromiseStatus = 'rejected'
    this.PromiseValue = v
    this.go()
  }
  // 递归函数
  go () {
    if (this.PromiseStatus !== 'pending' && this.PromiseList.length) {
      const a = this.PromiseList.shift()(this.PromiseValue)
      if (a instanceof Pro) {
        a.PromiseList = this.PromiseList
        a.go()
      } else {
        this.PromiseValue = a
        this.go()
      }
    }
  }
}
```
promise源码实现的大概思路





## class

其中 constructor 方法是类的构造函数，是一个默认方法，通过 new 命令创建对象实例时，class必须要用new命令创建，不然会报错
js规定一个类必须有 constructor 方法，自动执行，

class继承中，子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。


```js
class A {}
class B extends A {
  constructor() {
    super();  // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
  }
}

// 在 constructor 中必须调用 super 方法，因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工,而 super 就代表了父类的构造函数。//// super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，
//  super() 在这里相当于 ```A.prototype.constructor.call(this, props)``。
```

```js
class A {
  constructor() {
    this.x = 1
  }
  x() {
    return 7
  }
}
A.prototype.x = function() {
  return 10
}

class B extends A {
  constructor() {
    super()
    this.x = 1
    super.x = 2
    console.log(super.x) // undefined
    console.log(super.x()) // 10
    console.log(this.x) // 2
  }
}

let b = new B()
// 总结

// 1. 父类，子类都必须有constructor函数，没有就默认添加执行
// 2. 子类如果继承，必须使用super关键字.子类没有this. 必选使用super继承父类的方法个属性，构建自己的实例 this
// 3. 子类中，如果使用super.xx相当于调用父类的Prototype的方法或者属性，如果没有，就去父类的方法里面找。
// 4. 子类中，如果使用，super.xx = yy  修改属性，不会修改父类的，而是修改子类的。修改的话，super.xx=yy 相当于this.xx =yy
```


## 继承
## *函数
## async await
## import require
import和require都是被模块化所使用。

require 是 AMD规范引入方式

import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法

require是运行时调用，所以require理论上可以运用在代码的任何地方

import是编译时调用，所以必须放在文件开头

require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量

import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require
 
 ```js
 // require

const fs = require('fs')
exports.fs = fs
module.exports = fs
 ```

```js
// import

import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'
```

## mvvm 


## 循环一个对象，对象更新了，页面没有更新

----


1. 为什么离职 想要取得更长久的进步。
---
3. 讲下vuex

就是全局状态管理，四个状态，state,getter,mutation,action..  单项数据流。必须经过mutation才能改变数据。

4. vuex里面的model怎么用
5. vuex里面的多个model，多个store1
6. vuex里面的简写函数 
7. vue router和a标签的区别
8. vue的生命周期及做什么

（1）beforeCreate中拿不到任何数据，它在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。


（2）created中已经可以拿到data中的数据了，但是dom还没有挂载。会判断有无el，如果没有el则停止后面的模板挂载。
在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。

（3）beforeMount 和 created 拿到的数据相同 在挂载开始之前被调用：相关的 render 函数首次被调用。

（4）mounted中el被创建dom已经更新，vue实例对象中有template参数选项，则将其作为模板编译成render函数，编译优先级render函数选项 > template选项

    使用场景:常用于获取VNode信息和操作，ajax请求

（5）由于beforeUpdate更新之前，和updated更新之后

（6）beforeDestroyed 和 destroyed   销毁之前  销毁之后

9. createed想更改DOM，怎么做？ nextTick

10. vue父子组件传值。传引用
    ```
    1. props
    2. emit, on
    3. eventbus
    4. vuex
    5. 路由传值
    6. $ref
    7. provide inject
    
    ```
## 对babel怎么理解


## vue的指令
```
v-model
v-bind
v-on
v-text
v-html
v-pre
v-clock
v-show
v-if
v-else
v-else-if
v-slot
v-once
v-for
```
##  不用vue-cli写项目


## 14. 项目可以有多个vue对象，详解下
```
eventbus
```
## 15. 路由守卫
```
beforeEach(from, to, next)
```
## 16. methods和computed的区别
## 17. keep-alive 避免重新渲染
## 18. 循环一个对象，对象更新了，页面没有更新
## 19. mvvm模式如何理解
```
m: Model数据流 v: View视图 vm: ViewModel，连接v和m的对象
m和v是没有关系的，但是v和vm是双向绑定的，m改变的时候，vm也跟着改变，vm也会及时更新m，m改变的时候，也会改变vm，vm和m是双向绑定的。
```
20. 谁是vm，model是啥
## 21. es6 let const var的区别

let 暂时性死区，定义一个变量的时候，就不能被代码块一以外使用

const 定义常量，一旦定义，就不能在下面修改，

var 弱类型定义变量。变量提升


22. 解构赋值
24. async await
25. import require
26. 引用一个文件的实际操作，
27. 引用一个文件和引入一个函数的区别
28. 支持动态引入么
29. 通过什么方式学习
30. class原理和写法
31. 继承
32. 创建对象的方法
33. 组合继承有哪些
34. 
######## 作业帮面试
  - 调用支付，调用code，异步调用code的方法
  - es6 做异步怎么做 promise
## promise的原理  和 状态（rejict）
  原理就是一个解决异步回调的函数，语法糖，
  ```js
  function test() {
    return new Promise((resolve, reject) => {
      const time = Math.random() * 2
      setTimeout(() => {
        if (time > 1) {
          resolve('执行成功')
        } else {
          reject('执行失败')
        }
      }, 1000)
    })
  }

  test.then((res) => {
    console.log(res)
  }).catch((erroe) => {
    console.log(error)
  })
  ```
  ## 状态是否可逆，为什么
  ## 盒模型有几种
  ## 回流和重绘
  ## css3有哪些新特性
  ## css3的动画
  ## css3选择器
  ## ul*li*3 如何选择第二个li
    li:nth-child(2)
  ## rem的原理
  ## 定位
  fixed absolute relative  static
  ## ajax（原生 jq）
  ## 圣杯布局
  ## 箭头函数的处理 原理 特性 this指向
  不能构造，本身没有this,看上下文的this指向
  ## ES6都用到什么
  ## set map for循环数组
  ## git命令
  ## npm用来做什么 和webpack的区别
  npm是个代码仓库。webpack是个模块打包工具
  ## webpack是管理的包

  ## vue router 两个路由的模式 hash 地址栏上是否带##
  hans带  history不带 区别什么
  ## vuex 什么时候要用到
    需要频繁的传递数据的时候
  ## vue的cli webpack的配置在那个文件夹下找
    cli2的时候到build里面找   cli3的话需要自己在根目录创建vue.config.js、在里面创建
  ## axios 的封装
  ## 了解node么 
  ## 浏览器的缓存都有那些
    强缓存  弱缓存（协商缓存）
  ## 深拷贝
  ## git命令
  - `console.log(1);setTimeout(function(){ console.log(2)}, 0);console.log(3); // 1,3,2`
  - 是因为js是单线程的 而js实现异步是靠任务队列调度的 异步的会去队尾排队等待执行 而任务队列还可以细分为MacroTask Queue和MicoTask Queue两类 setTimeout属于前者，promise属于后者
  
######## 百度
	first
    笔试
    比较重要的几个题:
    一个 是while 循环 + 异 步 ，考察的是任务队列 答案就是循环最后一次的输出的值
    二个 是bind call apply 区别， 能自己实现bind函数嘛， 加分项
    三个 盒模型，主要是怪异和模型和标准盒模型的定义区别
        ```js
        // 标准盒模型是  总宽度= 设置的宽+2border+2margin+2padding
        // 怪异盒模型是  总宽度= 设置的宽+2margin （设置的宽 = content+border+padding）
        // 改变方式： 标准： box-sizing: content-box  怪异 box-sizing: border-box
        ```
    四个 inline-block 和 inline元素的区别
        ```js
        block 单独占一行。
        inline不能设置宽高。不会占一行，会自动向右排列
        inline-block 是有blcok的属性可以设置宽高，同时不会单独占一行。
        ```
    五个 居中的方式主要是竖直居中
      ```css
      1.flex布局
      2.position定位  transform: translate(-50%, -50%)
      ```
    六个 性能优化，尽量从多角度去谈
    七个 有个数组去重的直接用[...new Set(arr)] 就可以了
    剩下的都比较简单 有考察变量声明提前的
    然后谈一下自己擅长的东西
    seond
    面试
    也会有一些笔试的东西的但是都比较拔高的
    一个 看下underScore 要了解节流函数 和 防抖函数 的用途和区别，以及原理
    二个 模拟history的工作模式 要搞清楚history 都有哪些方法，是怎么实现的 重点是 go 和pushState
    三个 nodejs 会谈的比较多，异步啊，代理啊，nginx嘛，代理实现的原理
    四个 还会根据你之前一轮的情况问一些针对性的问题
    third
    面试
    一个 布局 地位的问题 使用fixed定位一个input在移动设备屏幕的bottom 但是输入法会遮 盖 你得输入框，怎么解决 有两个方案 一个是使用flex 竖直进行布局，中间的部分flex设置 为1 input所在的div固定高度 另一个用js获取高度实时计算改变定位方式
    二个 懒加载的实现原理 这个很重要
    三个 如何封装sdk 主要考察面向对象的编程思维 封装一个注册登录的界面还有校验的界面 四个 一些移动端兼容的问题比如flex 定位之类的
    五个 自己擅长什么

######## 搜狐
1. 自我介绍（自己和项目）
	我13-17年在河南师范大学读的物联网工程专业，是统招的本科。16年11月，在国美就职，目前还是就职状态。在国美快两年了，也接触了不少的项目。
	商户系统的三个前端项目，刚开始的一期和后来又开展了二期，是我和我同事四个人一块做的。我当时主要负责做商户的前端系统和另一个同事。两个人负责前端，两个人负责后端的。
	美易分公众号的维护
	weex项目
	活动配置项目一期和二期
	息费拆分

2. 你觉得你的哪一项强一些(HTML JS CSS)

3. 语义合理、结构清晰、易维护 你怎么理解的

4. 你们的团队怎么构成，分享之类的

5. 各个浏览器对css样式的支持不太一样，我们需要用reset.css把他们做成一致的

6. 盒模型是什么

7. 清浮动
- overflow： hidden  形成了bfc
- clear: both
- 父浮子自浮
- 最后一个兄弟浮动  
- 设置高度  
- overflow: hidden;   
- clearfix;
```
.clearfix :after{
	  content: '.';
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
}
```
- flex布局
- 后面加空div，空div  clear：both

8. 图片 jpeg 和 png
- jpeg是有损压缩 png是无损压缩
- png 透明度
- 图片的格式有gif、png、jpg、webp、png-8、png-24、svg
png后的数字代表2^8色，png-8支持索引透明和alpha透明。png-24不支持。
jpg有损压缩，不支持透明和动画，支持所有浏览。
gif只能存储256种颜色，支持动画和透明，占用空间小。
png占用空间大。

 图片格式 | 压缩方式 | 透明度 | 动画 | 浏览器 | 适应场景
 ---  | ---      | ---    | ---    |---|  ---
 jpeg | 有损压缩 | 不支持 | 不支持 | * | 复杂颜色及形状、照片
 gif  | 无损压缩 | 支持   | 支持   | * | 简单颜色、动画
 png  | 无损压缩 | 支持   | 不支持 | * | 需透明
 webp | 有损压缩 | 支持   | 支持   | chrom/oper | 复杂颜色和形状，浏览器已知
 svg  | 无损压缩 | 支持   | 支持   | IE8↑/* | 简单
9. split 数组去掉第三个元素

## 解决跨域的方法 
    
  [JSONP](https://www.cnblogs.com/dhsz/p/6893682.html)

  （1）jsonp 不安全的原因是 依赖后端，如果后端被攻击，返回一个病毒脚本。
  （2）cros,前后端一起配合。后端修改请求的浏览器标识头。缺点是。不能同时处理多个不同源的请求
  （3）proxy 前端框架的 webpack的代理请求。使用node模拟一个nginx请求。服务器请求服务器。获取数据
  （4）nginx配置。直接就是服务器互相请求数据，不用前端配置
 
11. get post 请求的区别  不安全的原因 攻击 XXS

12. this.$router和thi.$route的区别

this.$router是全局路由实例存在的方法是所有组件都可以使用，使用push  go  replace的方法进行跳转

this.$route表示当前正在用于跳转的路由器对象，可以调用其name、path、query、params等方法；

######## 瓜子
## 1. 手写一个防抖和一个节流

防抖是将多次执行变为最后一次执行，节流是将多次执行变为在规定时间内只执行一次

 我们在操作的js的时候，有很多根据窗口尺寸，或者滚动加载事件来执行方法的。但是这种操作会及其频繁的占用浏览器性你那个

  所以我们设置一下，避免频繁调用方法，增加浏览器的负担

**（1）防抖**

  防抖是在单位时间内。只要触发事件，调用方法的时间就会重新计算延迟。只有单位时间不再操作。才会调用一次方法。

  比如 持续触发scroll事件时，并不执行handle函数，当1000毫秒内没有触发scroll事件时，才会延时触发scroll事件。
  
  简单的防抖函数实现

  ```js
  function debounce(fn, delay) {
    let timer
    return function() {
      let _this = this
      let args = arguments
      // 防抖事件，只要定时器存在。还一直频繁操作事件，我就一直给你清空，直到你停止
      if (timer !== null) {
        clearTimeout(timer)
        timer = setTimeout(()=> {
          fn.apply(context, args)
        },delay)
      }
    }
  }
  function handle() {
    console.log(90909201902190)
  }

  window.addEventListener('scroll', debounce(handle, 1000))
  ```
  应用场景:
    两个条件:

    1,如果客户连续的操作会导致频繁的事件回调(可能引起页面卡顿).

    2,客户只关心"最后一次"操作(也可以理解为停止连续操作后)所返回的结果.

    例如:

    输入搜索联想，用户在不断输入值时，用防抖来节约请求资源。

    按钮点击:收藏,点赞,心标等

  **(2) 节流**

  当用户操作持续出发事件的时候，保证一定时间内，只执行一次方法

  ```js
  // 定时器版本的节流
  function throttle(fn, delay) {
    let timer
    return function () {
      let args = arguments
      let context = this
      // 如果频繁操作事件，定时器还在，什么都不执行，如果定时器不在了，设置一个定时器。
      if(!timer) {
        timer = setTimeout(() => {
          fn.apply(context,args)
          timer = null
        },delay)
      }
    }
  }

  ```


  **(3) 总结**

函数防抖：将几次操作合并为一此操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。


函数节流：使得一定时间内只触发一次函数。原理是通过判断是否到达一定时间来触发函数。


区别： 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 比如在页面的无限加载场景下，我们需要用户在滚动页面时，每隔一段时间发一次 Ajax 请求，而不是在用户停下滚动页面操作时才去请求数据。这样的场景，就适合用节流技术来实现。


## 2. 手写一个promise
## 3. 虚拟dom原理

如果频繁操作dom，浏览器解析起来很费劲。性能就会很差。

虚拟dom就是一个js对象。通过吧节点拆解成一个个的属性。进行保存，这样新老dom节点对比。就相当的快。

vue的核心方法就是patch方法，就是把新老虚拟dom穿进去。进行对比。diff算法。

前端diff算法一般都是同级对比。这样时间复杂度就是0(n).不会嵌套对比。提高性能

vue的diff算法有个核心方法patch。先判断是不是属性一样，如果不一样。直接就替换，不走diff,一样再走diff

diff算法 头头对比。尾尾对比。尾头对比。头尾对比  这是前四种

还有一种就是新老虚拟dom全部不一样。

## 4. 手写apply call，使用apply实现bind

区别是啥。

**call** 

改变方法的this指向，需要一个个的传参

**apply**

改变方法的this指向，第二个参数可以是一个数组。不用一个个的写参数

**bind**

改变方法的this指向,同时不是直接执行方法。而是必须返回一个新的方法。再去执行


```js
// 实现一个call的方法
// 手动实现一个call
    Function.prototype.call2 = function(context = window) {
      context.fn = this // context是传入的对象，this是指需要改变指向的那个函数，在目标对象上复制一个需要改变指向的方法
      let args = [...arguments].slice(1)   // 解析参数，第一个参数不要。因为是指向的对象。从第二个参数开始才是需要的
      let result = context.fn(...args)// 目标对象上新复制的函数，执行一下，记得把处理的参数放进去。
      delete context.fn // 执行完。把添加的方法删了。要不然平白无故就会多出一个函数。上面已经改变了。
      return result // 把结果返回啊
    }

    var foo1 = {
      value:5
    }

    function bar(name,age) {
      console.log(name)
      console.log(age)
      console.log(this.value)
    }
    
    bar.call2(foo1,'back',12)


```

## 5. 发布订阅模式怎么实现？

发布-订阅模式又叫观察者模式,它定义对象间的一种一对多的依赖关系,当一个对象的状态发生改变时,所有依赖于它的对象都将得到通知。

发布订阅的实现思路是。定义一个对象

对象里面 

1. 定义缓存事件的列表信息，
2. 订阅信息的方法，
3. 发布信息的方法

用户订阅消息的时候调用对象里面的订阅方法，吧自己的订阅信息添加到信息列表里面，数组或者对象

发布消息的时候，调用发布方法，并且根据发布消息的参数去信息列表里面找对象的key，来执行响应的方法。

```js
/*烧饼店  定义一个对象*/         
var Sesamecakeshop={
    clienlist:[],//缓存列表
    addlisten:function(fn){//增加订阅者
        this.clienlist.push(fn);
    },
    trigger:function(){//发布消息
        for(var i=0,fn;fn=this.clienlist[i++];){
            fn.apply(this,arguments);
        }
    }
}

/*小明发布订阅*/
Sesamecakeshop.addlisten(function(price,taste){
    console.log("小明发布的"+price+"元，"+taste+"味道的");
});
/*小龙发布订阅*/
Sesamecakeshop.addlisten(function(price,taste){
    console.log("小龙发布的"+price+"元，"+taste+"味道的");
});        

Sesamecakeshop.trigger(10,"椒盐");
```

## 6. vue中$emit、$on实现机制

在vue内部初始化时会为每个组件实例挂载一个this._events私有的空对象属性：

这个里面存放的就是当前实例上的自定义事件集合，也就是自定义事件中心，它存放着当前组件所有的自定义事件。和自定义事件相关的API分为以下四个：this.$on、this.$emit、this.$off、this.$once，它们会往这个事件中心中添加、触发、移除对应的自定义事件，从而组成了vue的自定义事件系统，

说下自定义事件的机制。

子组件使用this.$emit触发事件时，会在当前实例的事件中心去查找对应的事件，然后执行它。不过这个事件回调是在父组件的作用域里定义的，所以$emit里的参数会传递给父组件的回调函数，从而完成父子组件通信。


父子组件通信的原理

```
父子组件通过自定义事件通信，自定义事件的实现原理和通常解释的会不同，
它们的原理是父组件在经过编译模板后，会将定义在子组件上的自定义事件test及其回调handleTest通过$on添加到子组件的事件中心中，
当子组件通过$emit触发test自定义事件时，会在它的事件中心中去找test，找到后传递hello-vue~给回调函数并执行，
不过因为回调函数handleTest是在父组件作用域内定义的，所以看起来就像是父子组件之间通信般。
```

## 7. 闭包应用

检测字符串是不是第一次传入
```js
function isFirst() {
  const list = []
  return function(options) {
    if (list.indexOf(options) > 0) {
      console.log('已存在')
    } else {
      list.push(options)
      console.log('首次传入')
    }
  }
}

const result = isFirst()

result('试试水')
result('试水')
result('试试水')
```

## 8. computed、methods区别

1. 计算属性有缓存，计算属性会把函数执行一次，把结果存起来，依赖的值改变，会重新赋值。
2. 函数是每次模板编译都会执行。只要有响应式属性改变，视图刷新，函数就执行。

## 9. 懒加载的实现原理

图片懒加载技术主要通过监听图片资源容器是否出现在视口区域内，来决定图片资源是否被加载。
那么实现图片懒加载技术的核心就是如何判断元素处于视口区域之内。

**以前**

以前的懒加载核心技术原理就是通过js提供的element.getBoundingClientRect()

1. 给图片容器自定义属性，不赋值真实图片连接，
2. 利用scroll事件， Element.getBoundingClientRect() 方法判断目标容器是否给跟可视区域交叉了
3. 判断交叉了 就 把真实链接赋值给图片容器，显示内容

注意使用的时候 scroll事件记得使用节流，避免一直触发操作事件，影响性能

**现在**

Web为开发者提供了 IntersectionObserver 接口它
可以异步监听目标元素与其祖先或视窗的交叉状态，
注意这个接口是异步的，它不随着目标元素的滚动同步触发，所以它并不会影响页面的滚动性能。

```js
var io = new IntersectionObserver(callback, options)


// 用来指定交叉比例，决定什么时候触发回调函数，是一个数组，默认是[0]。

// 我们指定了交叉比例为0，0.5，1，当观察元素img0%、50%、100%时候就会触发回调函数
const options = {
    root: null,
    threshold: [0, 0.5, 1]
}
var io = new IntersectionObserver(callback, options)
io.observe(document.querySelector('img'))
```




## 10. 其他问题
2. 常见的web安全问题都有哪些?怎么处理
    xss 跨站脚本请求   csrf 伪请求
3. h5页面加载百分比进度条变化机制
4. 生产上出现白屏怎么处理?(抓包机制)
5. 抓包
6. 怎么监控与原生通信时的异常
7. http缓存
  分为强缓存，弱缓存
8. http1  http1.1  http2
  HTTP/1.* 一次请求-响应，建立一个连接，用完关闭；每一个请求都要建立一个连接；

  HTTP/1.1 Pipeling解决方式为，若干个请求排队串行化单线程处理，后面的请求等待前面请求的返回才能获得执行机会，一旦有某请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的线头阻塞；，HTTP1.x的解析是基于文本。基于文本协议的格式解析

  HTTP/2多个请求可同时在一个连接上并行执行。某个请求任务耗时严重，不会影响到其它连接的正常执行；HTTP2.0的协议解析决定采用二进制格式




1. 响应式原理本质就是数据劫持和发布订阅模式

2. 数据劫持。就是把数据每一个属性转换成可以被检测

3.订阅就是属性所有读取或修改被观察者订阅

当修改的时候，发布通知。调用回调函数进行相应的改变

4. 看一下vue的源码主要就是三个大类，核心  Observal   Dep   Watcher

（1）Observal类定义了几个方法。目的就是吧对象的所有属性使用object.defineProperty转换为可以被检测。

  同时在get里面dep.depend手收集依赖。在get里面dep.notify派发更新

（2）Dep类是Observal和watcher的桥梁。里面定义了depend的方法，用来依赖收集。放进去subs数组。定义了notify的范发给。用来执行watcher订阅者的
  回调函数派发更新

（3）Watcher累是一个监听器。定义的方法是将自己实例添加到Dep类subs数组中。完成订阅。自己内部定义了update的回调更新方法，当派发通知下来的时候，执行。更新页面等操作。