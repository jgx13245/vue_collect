# Js基础知识面试
## 原始类型

**六种基本类型**

1.string

2.number

3.boolean

4.object

5.null

6.undefined

::: warning
JavaScript 中原始类型有六种，原始类型既只保存原始值，是没有函数可以调用的。
:::

**null到底是什么**

现在很多书籍把null解释成空对象，是一个对象类型。然而在早期JavaScript的版本中使用的是32位系统，考虑性能问题，使用低位存储变量的类型信息，000开头代表对象，而null就代表全零，所以将它错误的判断成Object，虽然后期内部判断代码已经改变，但null类型为object的判断却保留了下来，至于null具体是什么类型，属于仁者见仁智者见智，你说它是一个bug也好，说它是空对象，是对象类型也能理解的通。
## Mvc Mvp Mvvm 的区别

[三种视图模式的区别](https://github.com/livoras/blog/issues/11)

## this的讲解

[markdown用法使用方法](https://www.jianshu.com/p/q81RER)
> JavaScript 中最容易被误解的一点就是 this 关键字。在这篇文章中，你将会了解四种规则，弄清楚 this 关键字指的是什么。隐式绑定、显式绑定、new 绑定和 window 绑定。在介绍这些技术时，你还将学习一些 JavaScript 其他令人困惑的部分，例如  .call、.apply、.bind和 new 关键字 。

- 隐性绑定：

```js
const user = {
  name: 'Tyler',
  age: 27,
  greet() {
    alert(`Hello, my name is ${this.name}`)
  }
}
```
 这个时候方法greet里面的this指向的是对象 user
 可以这么理解
::: tip
函数都是有默认参数的，里面有两个参数，第一个就是函数指向的对象，后面的参数就是传的值
:::
 ```js
 function say（） {xxx}
 
 // 看成这样
 say('this所指的对象'，参数)
 ```
 如果没有对象调用函数，函数上下文就是win，那么this就是指win,如果有对象调用，那就是指向这个对象
 
 比如上文的对象里面，greet方法是被user对象调用的额，函数里面的this就是指向user。
 
 - 显性绑定
```js
function greet () {
  alert(`Hello, my name is ${this.name}`)
}

const user = {
  name: 'Tyler',
  age: 27,
}
```
如果方法不在对象里面呢，还想使用this调用怎么办，提供了的方法 **==call==** 可以做到啊

greet.call(user)
这样方法里面的this就指向对象user了

> 再强调一遍，call 是每个函数都有的一个属性，并且传递给它的第一个参数会作为函数被调用时的上下文。换句话说，this 将会指向传递给 call 的第一个参数。

下面我们使用call的用法做一个小例子

```js
function greet (lang1, lang2, lang3) {
  alert(`Hello, my name is ${this.name} and I know ${lang1}, ${lang2}, and ${lang3}`)
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

greet.call(user, languages[0], languages[1], languages[2])

```
**但是如果参数有100个，也这么一个个传啊，多难受**

这个时候就是**==apply==**的用法了，它个call的实现原理一样，但是第二个参数可以形成一个数组，并且自动展开给方法使用 
```
const languages = ['JavaScript', 'Ruby', 'Python']

// greet.call(user, languages[0], languages[1], languages[2])
greet.apply(user, languages)
```
> 到目前为止，我们学习了关于 .call 和 .apply 的“显式绑定”规则，用此规则调用的方法可以让你指定 this 在方法内的指向。关于这个规则的最后一个部分是 .bind。.bind 和 .call 完全相同，除了不会立刻调用函数，而是返回一个能以后调用的新函数。因此，如果我们看看之前所写的代码，换用 **.==bind==**，它看起来就像这样
```js
function greet (lang1, lang2, lang3) {
  alert(`Hello, my name is ${this.name} and I know ${lang1}, ${lang2}, and ${lang3}`)
}

const user = {
  name: 'Tyler',
  age: 27,
}

const languages = ['JavaScript', 'Ruby', 'Python']

const newFn = greet.bind(user, languages[0], languages[1], languages[2])
newFn() // alerts "Hello, my name is Tyler and I know JavaScript, Ruby, and Python"
```

- new 绑定

> 第三条判断 this 引用的规则是 new 绑定。若你不熟悉 JavaScript 中的 new 关键字，其实每当用 new 调用函数时，JavaScript 解释器都会在底层创建一个全新的对象并把这个对象当做 this。如果用 new 调用一个函数，this 会自然地引用解释器创建的新对象。
- 严格模式
>在 ES5 添加的 严格模式 中，JavaScript 不会默认 this 指向 window 对象，而会正确地把 this 保持为 undefined。
```js
'use strict'

window.age = 27

function sayAge () {
  console.log(`My age is ${this.age}`)
}

sayAge() // TypeError: Cannot read property 'age' of undefined
```

 **小总结**

1.查看函数在哪被调用。

2.点左侧有没有对象？如果有，它就是 “this” 的引用。如果没有，继续第 3 步。

3.该函数是不是用 “call”、“apply” 或者 “bind” 调用的？如果是，它会显式地指明 “this” 的引用。如果不是，继续第 4 步。

4.该函数是不是用 “new” 调用的？如果是，“this” 指向的就是 JavaScript 解释器新创建的对象。如果不是，继续第 5 步。

5.是否在“严格模式”下？如果是，“this” 就是 undefined，如果不是继续第 6 步。

6.JavaScript 很奇怪，“this” 会指向 “window” 对象。


## promise理解

一、 promise

所谓Promise，字面上可以理解为“承诺”，就是说A调用B，B返回一个“承诺”给A，然后A就可以在写计划的时候这么写：当B返回结果给我的时候，A执行方案S1，反之如果B因为什么原因没有给到A想要的结果，那么A执行应急方案S2，这样一来，所有的潜在风险都在A的可控范围之内了。

- 规范

1.一个promise可能有三种状态：等待（pending）、已完成（fulfilled）、已拒绝（rejected）

2.一个promise的状态只可能从“等待”转到“完成”态或者“拒绝”态，不能逆向转换，同时“完成”态和“拒绝”态不能相互转换

3.promise必须实现then方法（可以说，then就是promise的核心），而且then必须返回一个promise，同一个promise的then可以调用多次，并且回调的执行顺序跟它们被定义时的顺序一致

4.then方法接受两个参数，第一个参数是成功时的回调，在promise由“等待”态转换到“完成”态时调用，另一个是失败时的回调，在promise由“等待”态转换到“拒绝”态时调用。同时，then可以接受另一个promise传入，也接受一个“类then”的对象或方法，即thenable对象。

二、 实现一个简单的promise
```js
function test(resolve, reject) {
    var timeOut = Math.random() * 2;
    log('set timeout to: ' + timeOut + ' seconds.');
    setTimeout(function () {
        if (timeOut < 1) {
            log('call resolve()...');
            resolve('200 OK');
        }
        else {
            log('call reject()...');
            reject('timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
}
```
> 生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败：这个test()函数有两个参数，这两个参数都是函数，如果执行成功，我们将调用resolve('200 OK')，如果执行失败，我们将调用reject('timeout in ' + timeOut + ' seconds.')。可以看出，test()函数只关心自身的逻辑，并不关心具体的resolve和reject将如何处理结果。

有了执行函数，我们就可以用一个Promise对象来执行它，并在将来某个时刻获得成功或失败的结果：
```js
var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：' + reason);
});
```
我们可以把这个串联起来

```js
new Promise(test).then(function (result) {
    console.log('成功：' + result);
}).catch(function (reason) {
    console.log('失败：' + reason);
});
```

简单的实现了异步的函数使用promise链式完成。简单明了

**除了串行执行若干异步任务外，Promise还可以并行执行异步任务。**

```js
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});
```

**有些时候，多个异步任务是为了容错。比如，同时向两个URL读取用户的个人信息，只需要获得先返回的结果即可。这种情况下，用Promise.race()实现：**

```js
var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});
```
由于p1执行较快，Promise的then()将获得结果'P1'。p2仍在继续执行，但执行结果将被丢弃。



es6-promise 的插件

promise.resolve() 方法的使用
```js
promise.resolve(value).then(data => {
    console.log(value)
    
})
// value

```

三、 在vue中实际操作

```js
methods:{
async test() {
      console.log(5)
      console.log(await this.shu())
      const [{img,name,hao,recommend,haveConpou}] = await this.shu();
      console.log(img,name)
    },
    shu() {
      return new Promise(resolve => {
        this.api.v().then(res => {
          // console.log(res)
          resolve(res.data.data)
        });
      });
    }
  },
  mounted() {
    this.test();
  }
```

这样写的好处是，可以使用await的方法把一堆接口写在一个方法里面。避免方法互相嵌套。同时使用解构赋值，可以更好的把promise返回的数据直接使用。避免单独设置变量


## 原型链

>原型链涉及到的是prototype，构造函数，—proto—，实例对象这几个概念之间的关系，讲清楚原型链之前，先把这几个概念直接的关系屡清楚

一、**构造函数**

```js
function Person() {

}
var person = new Person();
person.name = 'Kevin';
console.log(person.name) // Kevin
```
在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person。

二、**prototype**

每个函数都有一个 prototype 属性
```js
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin

```
**每个函数都有prototype属性，函数的prototype属性指向的是
调用该构造函数而创建的实例的原型，就是person1和person2的原型。**

那什么是**原型**呢？你可以这样理解：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

三、**-proto-**

> 这是每一个JavaScript对象(除了 null,但是包括实例对象 )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。

```js
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```
**person是实例后的对象，Person是构造函数。函数才有prototype,对象才有-proto-,**

**person.__proto__ === Person.prototype指向的都是同一个地方实例对象的原型。**

四、**constructor**

**既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？**

指向实例对象倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个*原型*都有一个 constructor 属性指向关联的构造函数。
```js
function Person() {

}
console.log(Person === Person.prototype.constructor); // true
```
**所以结论我们可以看到这个结果**
```js
function Person() {

}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

---------------------------------------------------

# **了解了构造函数、实例原型、和实例对象之间的关系，接下来我们讲讲实例对象和原型的关系：**

当读取实例对象的属性时，如果找不到，就会查找与实例对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

```js
function Person() {

}

Person.prototype.name = 'Kevin';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // Kevin
```
在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.__proto__ ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

**原型的原型**

但是万一还没有找到呢？原型的原型又是什么呢？

我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：

```js
var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin
```
其实原型对象就是通过 Object 构造函数生成的。

原型对象.-proto- 指向object.prototype

那 Object.prototype 的原型呢？

null，我们可以打印：

```js
console.log(Object.prototype.__proto__ === null) // true
```

**所以 Object.prototype.__proto__ 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。
所以查找属性的时候查到 Object.prototype 就可以停止查找了。**





五、**最后总结一波**

所谓的原型链就是一个实例对象查找自己属性，找不到，顺着-protp-向上找，直到找到 object.prototype,也就是null。找不到，那就是没有了，原型链就这么回事。

1.只有函数有属性prototype

2.对象才有属性-proto-

3.原型对象有属性 constructor

4.函数.prototype === 对象.-proto- ===原型对象

5.原型对象.constructor === 构造函数

等同于：函数.prototype.constructor === 函数

六、 **再来一波代码总结**
```js

function A() {} // 构造函数 A

var a = new A(); // 实例对象a

A.prototype === a.-proto === 原型对象

A.prototype.constructor === 原型对象.constructor === A
```

>原型链是针对构造函数的，比如我先创建了一个函数，然后通过一个变量new了这个函数，那么这个被new出来的函数就会继承创建出来的那个函数的属性，然后如果我访问new出来的这个函数的某个属性，但是我并没有在这个new出来的函数中定义这个变量，那么它就会往上（向创建出它的函数中）查找，这个查找的过程就叫做原型链。

七、**这么讲就对了**

原型链是针对构造函数的，

我创建一个函数a,实例化一下（new）小a生成A，A就是a的实力对象，

函数有个属性，prototype，对象有个属性，—proto—,

创造的实力对象A.-proto— 等于指向于构造函数 a.prototype = 原型对象

比如小a里面有this.c =1  A就可以继承使用

a.prototype也是一个原型对象，继续往上找属性，如果没有的话，就找到js object.prototype  在往上找就是 null.这就是一个链




七、**作用域链**

作用域是针对变量的，比如我们创建了一个函数，函数里面又包含了一个函数，那么现在就有三个作用域

　　全局作用域==>函数1作用域==>函数2作用域

作用域的特点就是，先在自己的变量范围中查找，如果找不到，就会沿着作用域往上找。


## 异步执行的顺序理解

异步执行顺序的宏任务，微任务

有时候分不清楚异步，.then,setTimeout,同步任务的执行顺序是什么，老是啥啥分不清楚，现在通过粗略的分为宏任务，微任务来具体讲解怎么判断执行顺序

**这是一道典型的异步执行顺序问题，讲清楚为什么哪一步先执行**
```js
 async function async1() {
        console.log( 'async1 start' )
        await async2()
        console.log( 'async1 end' )
    }
    
    async function async2() {
        console.log( 'async2' )
    }
    
    console.log( 'script start' )
    
    setTimeout( function () {
        console.log( 'setTimeout' )
    }, 0 )
    
    async1();
    
    new Promise( function ( resolve ) {
        console.log( 'promise1' )
        resolve();
    } ).then( function () {
        console.log( 'promise2' )
    } )
    
    console.log( 'script end' )

```

 **async / await 是干啥子的，和promise的区别是啥**

分三点细说一下

1.async 做一件什么事情？

2.await 在等什么？

3.await 等到之后，做了一件什么事情？

>1async 做一件什么事情？

**一句话概括： 带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象**

如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装

如果async关键字函数显式地返回promise，那就以你返回的promise为准
```js
async function fn1(){
    return 123
}

function fn2(){
    return 123
}

console.log(fn1())
console.log(fn2())

// 返回结构
Promise {<resolved>: 123}

123

```
以后看到带有 async 关键字的函数，你就想它无非就是把return值包装了一下，其他就跟普通函数一样。

1.在语义上要理解，async表示函数内部有异步操作
另外注意，

2.一般 await 关键字要在 async 关键字函数的内部，await 写在外面会报错。

>2.await 在等什么？

右侧如果是函数，那么函数的return值就是「表达式的结果」

右侧如果是一个 'hello' 或者什么值，那表达式的结果就是 'hello'

```js
async function async1() {
    console.log( 'async1 start' )
    await async2()
    console.log( 'async1 end' )
}
async function async2() {
    console.log( 'async2' )
}
async1()
console.log( 'script start' )
```
**这里注意一点，可能大家都知道await会让出线程，阻塞后面的代码，那么上面例子中， 'async2' 和 'script start' 谁先打印呢？**

是从左向右执行，一旦碰到await直接跳出, 阻塞async2()的执行？

还是从右向左，先执行async2后，发现有await关键字，于是让出线程，阻塞代码呢？

**实践的结论是，从右向左的。先打印async2，后打印的script start**

所以有些说法：一旦遇到await就立刻让出线程，阻塞后面的代码，实际上不会把await右面的堵塞，只是堵塞后面的代码

>3.await 等到之后，做了一件什么事情？

那么右侧表达式的结果，就是await要等的东西。

等到之后，对于await来说，分2个情况

1.不是promise对象

2.是promise对象

**如果不是 promise , await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为 await表达式的结果**

**如果它等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。**

 **宏任务  微任务**

上述这个顺序可以理解为宏任务和微任务，

也就是「宏任务」、「微任务」都是队列。

一般情况下会先执行宏任务的同步代码。如果有异步的，就放到下一轮，以此类推，

1.如果执行中遇到setTimeout之类宏任务，那么就把这个setTimeout内部的函数推入「宏任务的队列」中，下一轮宏任务执行时调用。

2.如果执行中遇到promise.then()之类的微任务，就会推入到「当前宏任务的微任务队列」中，在本轮宏任务的同步代码执行都完成后，依次执行所有的微任务1、2、3

| 宏任务 | 微任务 | 
| ------ | ------ | 
| 同步任务1，2，3，4.。。。 | 微任务1，2，3，4 | 
| settimeout等异步任务， |微任务1，2，3，4

**以上述题为例子任务序列看看**

1.直接打印

2.调用async1，打印 同步代码 console.log( 'async1 start' )

3.**分析一下 await async2()**

>前文提过await，1.它先计算出右侧的结果，2.然后看到await后，中断async函数
- 先得到await右侧表达式的结果。执行async2()，打印同步代码console.log('async2'), 并且return Promise.resolve(undefined)
- await后，中断async函数，先执行async外的同步代码
目前就直接打印 console.log('async2')

目前任务序列

| 宏任务 | 微任务 | 
| ------ | ------ | 
| script start，async start,async2 | 微任务1，2，3，4 | 
| settimeout， |微任务1，2，3，4

4.被阻塞后，要执行async之外的代码，执行new Promise()，Promise构造函数是直接调用的同步代码，所以 console.log( 'promise1' )，

代码运行到promise.then()，发现这个是微任务，所以暂时不打印，只是推入当前宏任务的微任务队列中。

目前任务序列
| 宏任务 | 微任务 | 
| ------ | ------ | 
| script start，async start,async2，promise| promise2 | 
| settimeout， |微任务1，2，3，4

5.打印同步代码 console.log( 'script end' )

目前任务序列
| 宏任务 | 微任务 | 
| ------ | ------ | 
| script start，async start,async2，promise1,script end| promise2 | 
| settimeout， |微任务1，2，3，4

>没什么好说的。执行完这个同步代码后，「async外的代码」终于走了一遍

6.下面该回到 await 表达式那里，执行await Promise.resolve(undefined)了

如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果。

在我们这个例子中，就是Promise.resolve(undefined)正常处理完成，并返回其处理结果。那么await async2()就算是执行结束了。
所以这里的 await Promise.resolve() 就类似于

>Promise.resolve(undefined).then((undefined) => {

})

把then的第一个回调参数 (undefined) => {} 推入微任务队列。

then执行完，才是await async2()执行结束。

await async2()执行结束，才能继续执行后面的代码


目前任务序列
| 宏任务 | 微任务 | 
| ------ | ------ | 
| script start，async start,async2，promise1,script end| promise2 , (undefined) => {} | 
| settimeout， |微任务1，2，3，4


**执行结果**

此时当前宏任务1都执行完了，要处理微任务队列里的代码。

微任务队列，先进先出的原则，

- 执行微任务1，打印promise2
- 执行微任务2，没什么内容..

但是微任务2执行后，await async2()语句结束，后面的代码不再被阻塞，所以打印

console.log( 'async1 end' )


顺序为。。。。。。。

script start

async1 start

async2

promise1

script end

promise2

async1 end

setTimeout

## 闭包

>闭包就是能够读取其他函数内部变量的函数。
 由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的 函数"。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
 
 ### **变量的作用域**
 
 变量的作用域无非就是两种：全局变量和局部变量。
 Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量

**函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！**

1.内部访问外部(*可以做到*)
```js
var n=999;

　　function f1(){
　　　　alert(n);
　　}

　　f1(); // 999
```
2.外部访问内部(*报错*)
```js
　function f1(){
　　　　var n=999;
　　}

　　alert(n); // error
```
### 如何从外部读取局部变量？

 我们有时候需要得到函数内的局部变量。但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现。 那就是在函数的内部，再定义一个函数。
 
 ```js
 function f1(){

　　　　var n=999;

　　　　function f2(){
　　　　　　alert(n); // 999
　　　　}

　　}
 ```
 >在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。
 
 **既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！**
 
 ```js
 　function f1(){

　　　　var n=999;

　　　　function f2(){
　　　　　　alert(n); 
　　　　}

　　　　return f2;

　　}

　　var result=f1();

　　result(); // 999
 ```
 
 ### **闭包的概念**
 
闭包就是能够读取其他函数内部变量的函数。
由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。所以，在本质上，*闭包就是将函数内部和函数外部连接起来的一座桥梁*。

<font color=red>定义：就是能在一个函数外部执行这个函数内部定义的方法，并访问这个函数内部定义的变量</font>

### **闭包的用途**

    1.一个是前面提到的可以读取函数内部的变量
 
    2.另一个就是让这些变量的值始终保持在内存中。延长局部变量的生命周期。防止被垃圾回收机制收回。

```js
function f1(){

　　　　var n=999;

　　　　nAdd=function(){n+=1}

　　　　function f2(){
　　　　　　alert(n);
　　　　}

　　　　return f2;

　　}

　　var result=f1();

　　result(); // 999

　　nAdd();

　　result(); // 1000

```
>在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

>为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

>这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这一行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。


 ### **闭包的应用实例**
```js
// 这个函数啊，如果使用普通的这个方法，返回的结果永远是首次传入，因为。函数里面的list变量。在每次执行完函数以后
// 就销毁掉了，但是用闭包。可以延长变量的生存周期。
function isFirstLoad(){
            var list=[];
            return function(option){
                if(list.indexOf(option)>=0){ //检测是否存在于现有数组中，有则说明已存在
                    console.log('已存在')
                }else{
                    list.push(option);
                    console.log('首次传入'); //没有则返回true,并把这次的数据录入进去
                }
            }
        }

var ifl = isFirstLoad();

ifl("zhangsan"); // 首次传入
ifl("lisi");  // 首次传入
ifl("zhangsan"); // 已存在

// 这个可以作为一个公共方法使用，别的函数可以使用这个函数来判断自己的字符串是否已经存在。如果没有里面的闭包。其他函数在调用isFirstLoad
// 每次调用玩。list变量就会销毁。其他函数在调用。，永远都是首次传入，如果用闭包。list的变量被里面的匿名函数闭包保住了。延长了变量的生命周期
```

### **匿名函数和闭包之间的关系**

1. 接触闭包过程中，有具名函数闭包的。有匿名函数闭包的。很混乱。到底匿名函数和闭包有什么关系呢（实际上没有任何鸟关系）。

2. 再说匿名函数，一般用到匿名函数的时候都是立即执行的。通常叫做自执行匿名函数或者自调用匿名函数。常用来构建沙箱模式，作用是开辟封闭的变量作用域环境jquery的源码就是在一个大匿名函数里面执行

3. 一般情况下，匿名函数写法这两种

```js
(function(){ 
  console.log("我是匿名方式1");
})();//我是匿名方式1

(function(){ 
  console.log("我是匿名方式2");
}());//我是匿名方式2
```

4. 示范一下具名的闭包函数怎么转换成匿名函数
```js
// 这一段代码个第二段是一样的 这两个函数都是具名的，
function box(){
  var a = 10;
  return function inner(){
    console.log(a) ; 
  }
}
var outer = box();
outer()


//第一步直把内部inner这个具名函数改为匿名函数并直接return， 结果同样是10，里面改成匿名的函数
function box(){
  var a = 10;
  return function(){
    console.log(a) ; 
  }
}
var outer = box();
outer();//10


//第二步把外部var outer = box()改成立即执行的匿名函数,两个都是匿名的
var outer = (function(){
  var a=10;
  return function(){
    console.log(a);
  }
})();
//outer 作为立即执行匿名函数执行结果的一个接收，这个执行结果是闭包，outer等于这个闭包。
//执行outer就相当于执行了匿名函数内部return返回的闭包函数
//这个闭包函数可以访问到匿名函数内部的私有变量a，所以打印出10
outer();//10
```

5.由此可见。其实匿名，具名 函数和形成闭包没有任何关系，只是不同的展示方式而已

### **for循环经典闭包案子的分析**
1. 
```js
// 老生长谈的问题之一啊
for(var i = 0;i<5;i++){
  setTimeout(function(){
    console.log(i);
  },100*i);
}
//我们希望打印出来0,1,2,3,4，然而打印出来的是5个5，很尴尬。什么原因引起的这问题呢？
//这是因为setTimeout的回调函数并不是立即执行的而是要等到循环结束才开始计时和执行（在此对运行机制不伸展），
//要说明的一点是js中函数在执行前都只对变量保持引用，并不会真正获取和保存变量的值。所以等循环结束后i的值是已经是5了，
//因此执行定时器的回调函数会打印出5个5。
```
2. 解决办法
```js
// 给异步函数套一个立即执行的匿名函数。里面的函数使用了外部匿名函数的变量i，形成闭包，
for(var i = 0;i<5;i++){
  (function(i){
    setTimeout(function(){
      console.log(i);
    },100*i);
  })(i);
}

// 这个匿名的其实等同于这个具名的函数

for(var i = 0;i<5;i++){
  function hasNameFn(i){
    setTimeout(function(){
      console.log(i);
    },100*i);
  };
  hasNameFn(i);
}
/*而自执行的匿名函数的作用也很简单：就是每一次循环创建一个私有词法环境，
执行时把当前的循环的i传入，保存在这个词法环境中
这样执行for循环的时候。生成了10个函数（两两嵌套），每个函数里面都有自己的词法作用域。变量生命周期
被延长。settimeout寻找i的时候就在自己的作用域里面找。如同下面这个情况
*/

for(var i = 0;i<5;i++){
  (function(j){
    var _i = j;
    setTimeout(function(){
      console.log(_i);
    },100*_i);
  })(i);
}
```



### **闭包需要注意的地方**

 1.由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

 2.闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

## 数组的几个用法

### 1. reduce

- reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，

reduce 接受两个参数，一个方法，一个起始值

方法又接受四个参数。

pre 初始值 (或者上一次回调函数的返回值)

cur 当前元素值

index 当前元素的索引

arr  当前数组
```js
arr.reduce(function(pre,cur,index,arr) {},0)
```

1. 第一个例子 （reduce只传一个参数）

```js
var arr = [1,2,3]

const newArr = arr.reduce((pre, cur, index, arr) => {
  console.log(pre, cur)
  return pre+cur
})
console.log(newArr)

// 结果：
1 2

3 3

6

reduce 不设置第二个参数的话，数组长度是3 但是只会循环两次数组元素， 

第一次循环 pre = 1(一开始数组的第一个值),cur = 2（因为没有设置第二个参数，所以当前元素从下标1，开始，也就是元素2）

第二次循环 pre = 3(现在这个值pre+cur  =3）,cur = 3(当前值3)


```

2. 第二个例子 (reduce传两个个参数）
```js
var arr = [1,2,3]

const newArr = arr.reduce((pre, cur, index, arr) => {
  console.log(pre, cur)
  return pre+cur
},0)
console.log(newArr)

// 结果：
0 1

1 2

3 3

6
```

**结论：如果没有提供第二个参数，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供第二个参数，从索引0开始。**

3. reduce的简单用法（数组的累积和，累计乘）

```js
var arr = [1,2,3]

const sum =  arr.reduce((pre,cur) => {pre+cur})
const sum =  arr.reduce((pre,cur) => {pre*cur})
```

4. reduce的高级用法

```js
// 计算元素出现的次数
const  arr = [1,1,2,3,4,5,5,6,6,6]
const newArr = arr.reduce((pre, cur) => {
  if(cur in pre){
    pre[cur] ++
  }else{
    pre[cur] = 1
  }
},{})

// 

```