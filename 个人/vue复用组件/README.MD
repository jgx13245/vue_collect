# 注意事项

- 适配方案采用的VW
- git commit message采用的Angular规范
- mock数据路径/public/mock
- CSS预编译器采用的是Sass

# 复用组件介绍

## 一、 popup（消息弹出框 确定取消 组件---带遮罩层）

### 使用方法

1. **popup组件默认功能**

（1）在父组件里面引用Popup组件。父组件里面代码

  ```html
  <popup :isVisible="show"></popup>
  ```

（2）data里面设置属相

  ```js
    data() {
      return {
        show:false
      };
    },
  ```
  (3) 设置按钮，点击 this.show = true

2. **popup组件自定义功能**
  
（1）在父组件里面引用Popup组件。父组件代码

  ```html
  <popup :isVisible="show" @changeClose="changeClose">
      <div class="box" slot="content">             _| 
        <div class="label">确定执行此操作</div>        |
        <div class="btn">                            |
          <span @click="handleclose">取消</span>      |  --------->  这块代码自定义。设计。slot="content" 必写
          <span @click="handleclose">确定</span>     |
        </div>                                     _|
      </div>
    </popup>
  ```

（2）data里面设置属相

  ```js
    data() {
      return {
        show:false
      };
    },
  ```
  (3) 方法

  ```js
   handleOpen() {
      this.show = true
    },
    handleclose() {
      this.show = false
    },
  ```

## 一、 toast 消息弹框 组件

1. 新建一个文件夹，里面新建一个toast.vue的文件。新建一个toast.js的文件

2. toast.vue内容

  ```

<template>
  <transition name="fade">
    <div v-show="visible" class="toast-container">
      <span>{{message}}</span> 
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      message: ''
    }
  }
}
</script>
<style lang="scss">
.fade-enter-active {
  animation: toast-in 1s;
}

.fade-leave-active {
  animation: toast-out 1s;
}

@keyframes toast-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: .5;
  }
}
@keyframes toast-out {
  0% {
    opacity: .5;
  }
  100% {
    opacity: 0;
  }
}
.toast-container {
  width: 50%;
  padding: 20px 15px;
  border-radius: 10px;
  background: #000;
  opacity: .5;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate3d(-50%,-50%,0);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  span{
    color: #FFF;
    opacity: 1;
    font-weight: blod;
  }
}
</style>
  ```
  
3. toast.js内容

```js

import toastcom from './toast.vue'
const toast = {}
toast.install = vue => {
  const ToastCon = vue.extend(toastcom)
  const ins = new ToastCon()
  ins.$mount(document.createElement('div'))
  document.body.appendChild(ins.$el)
  vue.prototype.$toast = (msg, duration = 3000) => {
    ins.message = msg
    ins.visible = true
    setTimeout(() => {
      ins.visible = false
    }, duration)
  }
}
export default toast

```

// main.js内容里面

```js
import Toast from './components/Toast/toast'
Vue.use(Toast)
```


4. 其他组件里面使用

```js

this.$toast('啊啊啊啊')
```