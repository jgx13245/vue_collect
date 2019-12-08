# VUE知识点


[vue 和 react的区别](https://mp.weixin.qq.com/s/J-ZwcSjVYzZiZzQYFogrOw)
## VUE基础知识点
::: tip
vue 这快就重点讲一下比较深一点的原理方面的知识吧，简单的指令以及用法网上太多了，暂时写一下vue2.0核心原理和一些零散的知识
:::

### vue2.0的核心方法

Object.defineProperty(obj,prop,descriptor)

### vue核心简说

vue.js采用的是数据<font color=red>劫持结合发布和-订阅者模式</font>的方式，通过Object.defineProperty()来劫持各个属性的setter,getter，在数据变动时发布消息给订阅者，触发相应的监听回调。那么Object我们知道是一个对象，defineProperty()这个方法是什么呢？作用是什么呢，我 们来一起分析一下

[mdn文档解释Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### 核心的方法

Object.defineProperty()这个方法包含三个参数，

- obj是要在其上定义属性的对象，简单说就是你要操作的那个对象

- prop要定义或修改属性的名称，简单说就是你要操作的那个对象下的属性（对象下没有那个属性怎么办？可以自己设置的

- descriptor将定义或修改的属性描述：注意这个不知道就要看api了，他有这几个属性

### descriptor属性描述符

1. 对象里目前存在的属性描述符有两种主要形式：**数据描述符**和**存取描述符**。

数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。

存取描述符是由getter-setter函数对描述的属性。

<font color=red>描述符必须是这两种形式之一；不能同时是两者。</font>

2. 共存关系

(1)**数据描述符和存取描述符均具有以下可选键值(默认值是在使用Object.defineProperty()定义属性的情况下)：**

  configurable
  当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。

  enumerable
  当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。

(2)**数据描述符同时具有以下可选键值：**

  value
  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。

  writable
  当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。

(3)**存取描述符同时具有以下可选键值：**（划重点啊。这是关键啊）

  get一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为 undefined。

  set
  一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
  默认为 undefined。

::: tip
上面啥意思呢，意思是说啊，descriptor属性描述符总共有6个是属性，但是6个不能同时设置，否则会报错。其中共存属性可以一直存在。其他四个两两一组。有你没我。有我没你的意思
:::

3. **共存属性和数据描述符号属性讲解**

```js

var obj = {
    test:"hello"
}
//对象已有的属性添加特性描述  如果对象本身有这个属性，就正好可以操作了
Object.defineProperty(obj,"test",{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
});
//对象新添加的属性的特性描述，如果对象没有这个属性，就写上，就相当于添加上这个属性，也可以进行操作
Object.defineProperty(obj,"newKey",{
    configurable:true | false,
    enumerable:true | false,
    value:任意类型的值,
    writable:true | false
})
```
(1) **value(数据描述符)**

```js
// 属性对应的值,可以使任意类型的值，默认为undefined

var obj = {}
//第一种情况：不设置value属性
Object.defineProperty(obj,"newKey",{
 
});
console.log( obj.newKey );  //undefined
------------------------------
//第二种情况：设置value属性
Object.defineProperty(obj,"newKey",{
    value:"hello"
});
console.log( obj.newKey );  //hello
```

(2) **writable(数据描述符)**
```js
//属性的值是否可以被重写。设置为true可以被重写；设置为false，不能被重写。默认为false。

var obj = {}
//第一种情况：writable设置为false，不能重写。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false
});
//更改newKey的值
obj.newKey = "change value";
console.log( obj.newKey );  //hello
 
//第二种情况：writable设置为true，可以重写
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:true
});
//更改newKey的值
obj.newKey = "change value";
console.log( obj.newKey );  //change value
```

(3)**enumerable(共存描述符)**
```js
// 此属性是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。默认为false。


var obj = {}
//第一种情况：enumerable设置为false，不能被枚举。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false,
    enumerable:false
});
 
//枚举对象的属性
for( var attr in obj ){
    console.log( attr );  // undefined
}
//----------------------------------------
//第二种情况：enumerable设置为true，可以被枚举。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false,
    enumerable:true
});
 
//枚举对象的属性
for( var attr in obj ){
    console.log( attr );  //newKey
}
```

(4)**configurable(共存描述符)**
```js
//是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）。
//设置为true可以被删除或可以重新设置特性；设置为false，不能被可以被删除或不可以重新设置特性。默认为false。

//这个属性起到两个作用：

//1.目标属性是否可以使用delete删除

//2.目标属性是否可以再次设置特性


//-----------------测试目标属性是否能被删除------------------------
var obj = {}
//第一种情况：configurable设置为false，不能被删除。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false,
    enumerable:false,
    configurable:false
});
//删除属性
delete obj.newKey;
console.log( obj.newKey ); //hello
 
//第二种情况：configurable设置为true，可以被删除。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false,
    enumerable:false,
    configurable:true
});
//删除属性
delete obj.newKey;
console.log( obj.newKey ); //undefined
 
//-----------------测试是否可以再次修改特性------------------------
var obj = {}
//第一种情况：configurable设置为false，不能再次修改特性。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false,
    enumerable:false,
    configurable:false
});
 
//重新修改特性
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:true,
    enumerable:true,
    configurable:true
});
console.log( obj.newKey ); //报错：Uncaught TypeError: Cannot redefine property: newKey
 
//第二种情况：configurable设置为true，可以再次修改特性。
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:false,
    enumerable:false,
    configurable:true
});
 
//重新修改特性
Object.defineProperty(obj,"newKey",{
    value:"hello",
    writable:true,
    enumerable:true,
    configurable:true
});
console.log( obj.newKey ); //hello
```

4. **存取描述符号属性讲解**

set是该属性值被设置时执行的回调函数（默认是undefined）

get是该属性值被获得时执行的回调函数（默认是undefined）

5. **Vue响应式和双向绑定的原理**

Vue实例在初始化时，遍历在Observer（观察者）中所有属性通过Object.defineProperty()来实现他们的存取描述符（getter和setter），这样以来给任何对象的任意属性赋值都会触发该属性的setter，那么就能监听到数据变化。同时每个属性都会设置一个Dep（消息订阅器），他内部维护了一个数组，用来记录所有Watcher（订阅者）。
       然后Vue通过Compile（解析器）编译模板，将模板中的变量替换成对应的数据并渲染页面视图。此时Watcher会将自己添加到Dep中，到这里一个Vue实例的初始化完毕。
       当属性值发生改变时，触发setter函数，setter会调用Dep.notify()通知每一个订阅该属性的Watcher，Watcher会调用自身的update()函数对视图进行更新。这样一来双向绑定就实现了。

js 手动实现一个双向绑定

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>双向绑定demo</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <div id="app">
            <div>双向绑定demo</div>
            <input type="text" id="input">
            <div>
				<span>input:</span>
				<span id="output"></span>
			</div>
        </div>
    </body>
    <script>
        var obj={}
        Object.defineProperty(obj,'input',{
            get:function(){
                return obj.input
            },
            set:function(value){
                document.getElementById('input').value = value
                document.getElementById('output').innerHTML = value
            }
        })
        document.addEventListener('keyup',function(e){
            obj.input = e.target.value
        })
    </script>
</html>
```

## VUE深度知识

### vue双向绑定的原理
### vuex的工作原理
### 虚拟dom，解释一下工作的原理
### 为什么vue是一套渐进式框架
### vue-cli提供的几种脚手架模板
### npm run dev 执行过程
### vue中央事件总线是什么
### MVVM 思路分析
### nextTick的实现原理
### vue组件data为什么是函数
### vue-router如何响应路由参数的变化
### $set 的原理
