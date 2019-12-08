# ES6

我们直奔主题

## var、let和const

var是之前就有的了，在这里提出来主要是为了比较其和let与const。

**区别**

1. 块级作用域
```js
for(var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出3个3
  }, 0)
}
// 解析：变量i是var声明的，在全局范围内是都有效，全局只有一个变量i。
//每次循环，变量的值会发生改变。循环内的i是指向全局的i。
```

```js
for(let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 输出0, 1, 2
  }, 0)
}
//解析：变量i是let声明的，当前的i只在本轮循环有效，所以每次循环的i其实都是一个新变量。
//JavaScript引擎内部会记住上一轮的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。


// 也可以使用闭包吧变量生命周期延长
for(let i = 0; i < 3; i++) {
  (function(i){
    setTimeout(() => {
    console.log(i); // 输出0, 1, 2
  }, 0)
  })(i)
}
```

2. 不存在变量提升

```js
console.log(a); // undefined
var a = 100;
// 等同于
var a
console.log(a)
a = 100


// var命令会发生变量提升现象，即变量可以在声明之前使用，值为undefined；而let纠正了这种行为，不能产生变量提升。
console.log(a); // 报错
let a = 100;
```

3. 暂时性死区
```js
// 只要块级作用域内，存在let命令，它所声明的变量就绑定(binding)在这个区域，不再受外部影响。
var temp = 123;
if(true) {
  temp = 'abc'; // 引入错误
  let temp;
}
// 在上面中，if后面的大括号内容就形成了一个区域。而temp此时是找不到外层的，因为内部有个temp且你在内部let temp声明前赋值了。
```
```js
//在看一个隐晦的例子：
function bar(x = y, y = 2) {
  return [x, y]
}
bar(); // 报错

//上面的例子中bar里面进行赋值操作的时候，就产生了一个封闭的区域了，可以认为x 和 y通过let声明，可是上面的问题是，x = y的引用在y = 2的声明之前。
//可以修正如下：
function bar(y = 2, x = y) {
  return [x, y];
}
bar(); // [2, 2]
```
4. 不可重复声明
```js
var a = 100;
var a = 1000;
console.log(a); // 1000
let a = 100;
let a = 1000; // 报重复声明错误
```

5. ES6声明的变量不会挂在顶层对象

    嗯～ES6变量的声明是指哪些声明呢？
    指let, const, import, class声明。
    而var, function声明是ES6之前的。
    所以目前JavaScript有六种声明变量的方式了～
```js   
var job = 'teacher';
console.log(window.job); // teacher
let job = 'teacher';
console.log(window.job); // undefined
```


**const命令注意点**

1.let可以先声明稍后赋值；而const声明之后必须立马赋值，否则会报错

```js
let a;
a = 100; // this is ok
const a; // 报没初始化数据的错误
```
2.const声明了简单的数据类型就不能更改了；声明了引用类型（数组，对象等），指针指向的地址不能更改，但是内部的数据可以更改的

```js
const str = 'this is a string';
str = 'this is another string'; // 报了个“给不变的变量分配值”的错误
const obj = {
  name: 'jia'
}
obj.name = 'ming'; // this is ok
obj = {}; // 报了个“给不变的变量分配值”的错误
```

**let和const的使用场景**

1.let使用场景：变量，用以代替var

2.const使用场景：常量、声明匿名函数、箭头函数的时候。
```js
// 常量
const PI = 3.14;

// 匿名函数
const fn1 = function() {
  // do something
}

// 箭头函数
const fn2 = () => {
  // do something
}
```
## 变量的解构赋值
解构可以理解就是一个作用：简化你变量赋值的操作。

**1.数组场景**
```js
let [name, job] = ['jiaming', 'teacher'];
console.log(name); // jiaming
// 本质上，这种写法属于模式匹配，只要等号两边的模式相同（重点），左边的变量就会被赋予对应的值。再比如：
let [ , , third] = ["foo", "bar", "baz"];
console.log(third); // "baz"

let [head, body, ...tail] = [1, 2, 3, 4, 5];
console.log(tail); // [3, 4, 5]
```
```js
//也可以使用默认值。但是默认值生效的前提是：ES6内部使用严格相等运算符（===），判断一个位置是否有值。
//所以，只有当一个数组成员严格等于undefined，默认值才会生效。null也相当于赋值，
let [x, y = 'b'] = ['a']; // x='a', y='b'

// 后面的值为undefined，所以默认值生效
let [z = 1] = [undefined];
console.log(z); // 1
// 后面的值为null，默认值不生效。使用null值
let [k = 1] = [null];
console.log(k); // null
```

**2.对象场景**

```js
const state = {
  name: 'jiaming',
  job: 'teacher'
};
let {
  name,
  job
} = state;
// 上面的场景很熟悉吧
console.log(job); // teacher

// 上面的例子如果写具体的话，是这样的：
const state = {
  name: 'jiaming',
  job: 'teacher'
};
let {
  name: name, // 第一个name是匹配模式，第二个name才是变量，两者同名简化成一个即可
  job: job
} = state;

// 我们来改写下：
const state = {
  name: 'jiaming',
  job: 'teacher'
};
let {
  name: job,
  job: name
} = state;
console.log(job); // jiaming
```

```js
// 对象也可以使用默认值，但是前提是：对象的属性值严格等于undefined。
var {x = 3} = {x: undefined};
console.log(x); // 3

var {y = 3} = {y: null};
console.log(y); // null

```
**3.字符串场景**

字符串之所以能够被解构赋值，是因为此时字符串被转换成了一个类似数组的对象。
```js
const [a, b, ...arr] = 'hello';
console.log(arr); // ["l", "l", "o"]
```


**两种使用场景**
```js
//交换两变量值
let [a, b] = ['reng', 'jia'];
[a, b] = [b, a];
console.log(b); // 'reng'
```
```js
//将字符串转换为数组
let [...arr] = 'reng';
console.log(arr); // ["r", "e", "n", "g"]
console.log(arr.splice(0, 2)); // ["r", "e"] 返回删除的数组（能使用数组的方法了）
```
## 字符串扩展
针对字符串扩展这个，个人感觉模版字符串使用的频率比较高。模版字符串解放了拼接字符串带来的繁琐操作的体力劳动。
```js
let name = 'jiaming';
let str = 'Hello! My name is '+ name + '. Nice to meet you!';
let strTemp = `Hello! My name is ${ name }. Nice to meet you!`
```
对于新增的字符串方法，可以记下下面这几个：
```
includes(): 返回布尔值，表示是否找到了参数字符串
startWith(): 返回布尔值，表示参数字符串是否在原字符串的头部
endWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部
trimStart(): 返回字符串，表示消除参数字符串开头的空格
trimEnd(): 返回字符串，表示消除参数字符串结尾的空格
```

## 数值扩展
留意下在Number对象上提供的新方法：
```
Number.isFinite(): 返回布尔值，表示参数值是否有限的
Number.isNaN(): 返回布尔值，用来检查一个值是否为NaN
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isInteger(): 返回布尔值，用来判断一个数值是否为整数
关于Math对象上的方法，遇到要用到时候，查API吧，不然记太多，脑瓜子会疼～
```

## 函数扩展

rest参数

ES6引入rest参数（形式是...变量名），用于获取多余的参数，这样就不需要使用arguments对象了。rest参数搭配的变量是一个数组（arguments是一个类数组来的），该变量将多余的参数放入数组中。

arguments对象是一个类数组，还得通过Array.prototype.slice.call(arguments)将其转换为真数组；而rest参数直接就可以使用数组的方法了。
```js
function add(...arr) {
  console.log(arr); // [2, 5, 3]
  let sum = 0;
  for(var val of arr) {
    sum += val;
  }
  return sum;
}
console.log(add(2, 5, 3)); // 10
```

## 箭头函数

ES6允许使用“箭头”(=>)定义函数。
``` js
const f = v => v; // 注意是有返回值return的啊

// 等同于
const f = function (v) {
  return v;
}
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回结果。
```js
const sum = (num1, num2) => num1 + num2;

// 等价于，使用了大括号，那箭头函数里面就要使用return了
const sum = (num1, num2) => { return num1 + num2 }

// 等价于
const sum = function(num1, num2) {
  return num1 + num2
}
```

使用箭头函数注意点：
```
函数体内的this对象，就是定义所在的对象，而不是使用时所在的对象
不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
不可以使用arguments对象，该对象在函数体内不存在的，如果要用，可以用rest参数代替。
不可以使用yield命令，因此箭头函数不能用作Generator函数。
```

[箭头函数](https://www.cnblogs.com/biubiuxixiya/p/8610594.html]])




## 数组扩展

**数组扩展运算符**

数组扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用空格分隔的参数序列。
```js
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
```
rest参数是运用在函数参数上的，将函数参数转换为数组的形式，如下：
```js
function fn(...values) {
  console.log(values); // ['jia', 'ming']
}
fn('jia', 'ming');
```

下面我们结合数组扩展运算符和rest参数来实现一个类似call的方法call2操作：
```js
Function.prototype.call2 = function(context=windows){ // 这里使用到rest参数
  context.fn = this; // 让fn的上下文为context
  let args = [...arguments].slice(1)  
  const result = context.fn(...args); // 这里使用了数组扩展运算符
  delete context.fn;
  return result; // 因为有可能this函数会有返回值return
}
var job = 'outter teacher';
var obj = {
  job: 'inner teacher'
};
function showJob() {
  console.log(this.job);
}
showJob(); // outter teacher
showJob.call2(obj); // inner teacher

//复习一下，我们把var job = 'outter teacher'改为let job = 'outter teacher'后，showJob()会输出什么？
//答案是undefined。在前一篇中也提到过，ES6语法声明的变量是不会挂载在全局对象上的～
```

**Array.from()**

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（对象包括ES6新增的数据结构Set和Map）。
```js
// 类数组转化成数组
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```


**Array.of()**
```js
Array.of() // 方法用于将一组值，转换为数组。
let arr = Array.of(2, 3, 'reng');
console.log(arr); // [2, 3, 'reng']
console.log(arr.pop()); // reng
Array.of基本上可以弥补Array()或new Array()带来的因为参数个数导致的不同行为。Array.of基本上可以替代它们两个了。
Array.of(); // []
Array.of('reng'); // ['reng']
Array.of(2, 'reng'); // [2, 'reng']
```

数组中还有其它有用的方法：
```js
copyWithin(target, start = 0, end = this.length): 拷贝指定数组的范围值
find(fn): 用于查找第一个符合条件的数组成员，没有返回undefined
findIndex(fn): 用于查找第一个符合条件的数组成员的位置，没有返回-1
entries(): 对键值对的遍历
keys(): 对键的遍历
values(): 对值的遍历
includes(el): 返回一个布尔值，表示某个数组是否包含给定的值，与字符串的include(el)方法相似
flat(num): 将嵌套的数组拉平，num是遍历的深度 数组扁平化
[1, [2, [3]]].flat(Infinity);
// [1, 2, 3]
```

```js
//有这么一个需求：将数组[[2, 8], [2], [[4, 6], 7, 6]]转成一维且元素不重复的数组。
// 我们的实现方案如下：
let arr = [[2, 8], [2], [[4, 6], 7, 6]];
console.log([...new Set(arr.flat(Infinity))]); // [2, 8, 4, 6, 7]
```


## 对象扩展

**属性名表达式**

ES6允许字面量定义对象时，把表达式放在方括号内：
```js
let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world',
  ['end'+'symbol']: '!' 
};

a['first word'] // 'hello'
a[lastWord] // 'world'
a['last word'] // 'world'
a['endsymbol'] // '!'
```

**对象的扩展运算符**
上面整理数组扩展内容的时候，提到了数组的扩展运算符。ES2018将这个运算符引入了对象～
```js
let z = { a: 3, b: 4 };
let n = { ...z }; // 关键点
n // { a: 3, b: 4 }
```

对象中某些新增的方法

```js
Object.is(arg1, arg2): 比较两个值是否严格相等，与===行为基本一致
Object.assign(target, source1, ...): 用于对象的合并，将源对象(source)的所有可枚举属性，复制到目标对象(target)。属于浅拷贝
Object.keys(obj): 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
Object.values(obj): 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
Object.entries(obj): 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

## Set和Map数据结构

**Set**

Set翻译出来就是集合，有元素唯一性的特点。

在数组去重的场景上很有用处：
```js
// 去除数组的重复成员
[...new Set(array)]
// 如
console.log([...new Set([2, 2, 3, 2])]); // [2, 3]
```

需要留意的Set属性和方法有以下：
```js
size: 返回实例成员的总数
add(value): 添加某个值，返回Set结构本身
delete(value): 删除某个值，返回一个布尔值，表示删除是否成功。
has(value): 返回一个布尔值，表示该值是否为Set的成员
clear(): 清除所有成员，没有返回值。
key():返回键名的遍历器。
values(): 返回键值的遍历器。
entries(): 返回键值对的遍历器。
forEach(): 使用回调函数遍历每个成员
```

**WeakSet**
WeakSet结构与Set类似，也是有不重复元素的集合。但是它和Set有两个区别：

<font color=red>WeakSet对象中只能存放对象引用, 不能存放值, 而Set对象都可以.</font>

<font color=red>WeakSet中对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, WeakSet 对象是无法被枚举的, 没有办法拿到它包含的所有元素。</font>

```js
var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false, 对象 foo 并没有被添加进 ws 中

ws.delete(window); // 从集合中删除 window 对象
ws.has(window);    // false, window 对象已经被删除了

ws.clear(); // 清空整个 WeakSet 对象

WeakSet 没有size属性，没有办法遍历它的成员。
```
**Map**

Map对象保持键值对。任何值（对象或者原始值）都可以作为一个键或一个值。

Object和Map的比较：
::: tip
一个Object的键只能是字符串或者Symbols，但一个Map的键可以是任意值，包括函数、对象、基本类型。
Map中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map对象是按插入的顺序返回键值。
Map在涉及频繁增删键值对的场景下会有些性能优势`。
:::

```js

//如果你需要“键值对”的数据结构，Map比Object更合适。
const set = new Set([ // 数组转换为map
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```
Map拥有的属性和方法和Set相似，多出了些：
set(key, value)：set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
get(key)：get方法读取key对应的键值，如果找不到key，返回undefined

**WeakMap**
```
WeakMap结构与Map结构类似，也是用于生成键值对的集合。但是有两点区别：
WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
WeakMap的键名所指向的对象，不计入垃圾回收机制。和WeakSet相似啦。
属性方法啥的跟Map差不多，就是没有了size和forEach，因为其是不可枚举的。
```

## Promise对象
Promise是异步编程的一种解决方案，比传统的解决方案“回调函数和事件”更合理和更强大。

Promise对象有以下两个特点：

对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种情况：从pending变成fulfilled（fulfilled也称
resolved）和从pending变成rejected。

用法
```js
const promise = new Promise(function(resolve, reject) {
  // ...some code
  
  if(/* 异步操作成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
})
参数resolve和reject是两个函数，由JavaScript引擎提供，不用自己部署。

Promise实例生成之后，可以使用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
我们来粘贴个简单例子：
```js
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value); // 100ms后输出'done'
});
```

嗯～我们顺道来复习下setTimeout的第四个参数。
var timeoutID = scope.setTimeout(function[, delay, param1, param2, ...]);
function 是你想要在到期时间（delay毫秒）之后执行的函数。
delay 是可选语法，表示延迟的毫秒数。
param1, ..., paramN 是可选的附加参数，一旦定时器到期，它们会作为参数传递给function
那么，到这里你理解了上面的例子为什么在100ms后输出done了嘛💨

简单的例子看完了，看下我们在工作中使用得比较多的请求接口的例子：
```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if(this.readyState !== 4) {
        return;
      }
      if(this.status === 200) {
        resolve(this.response); // this.response作为参数传给then中的json
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application.json');
    client.send();
  });
  return promise;
};
getJSON('/post.json').then(function(json) {
  console.log('Contents: '+ json);
}, function(error) {
  console.log('error happen ', error);
});
```

**catch方法**
```js
Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err)); // promise中任何一个抛出错误，都会被最后一个catch捕获
  
// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log('rejected:', err));
```

**finally方法**
```js
Promise.prototype.finally()方法（其不接受任何参数）用于指定不管Promise对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
语法：promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
```

**Promise.all**
```js
构造函数方法Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。
const p = Promise.all([p1, p2, p3]);
上面代码中，Promise.all方法接受一个数组作为参数，p1, p2, p3都是Promise实例。如果不是会调用Promise.resolve方法。
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

上面代码中，promises是包含 6 个 Promise 实例的数组，只有这6个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。

⚠️注意，如果作为参数的Promise实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。所以使用Promise.all()别手痒在每个实例promise内添加错误捕获。


一道练手题
```js
需求：使用promise改写下面的代码，使得输出的期望结果是每隔一秒输出0, 1, 2, 3, 4, 5，其中i < 5条件不能变
for(var i = 0 ; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    },1000)
}
console.log(i);
我们直接上使用promise改写的代码吧～
const tasks = []; // 存放promise对象
for(let i = 0; i < 5; i++){
  tasks.push(new Promise((resolve) => {
    setTimeout(() => {
      console.log(i);
      resolve();
    }, 1000 * i);
  }));
}
Promise.all(tasks).then(() => {
  setTimeout(() => {
    console.log(tasks.length);
  }, 1000);
});
// 每隔一秒输出 0, 1, 2, 3, 4, 5
```


## async函数

ES2017标准引入了async函数，使得异步操作更加方便。async函数是Generator函数的语法糖。不打算写Generator函数，感兴趣的话可以看文档。与Generator返回值（Iterator对象）不同，async返回的是一个Promise对象。

用法
async函数返回一个Promise对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
```js
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}
getStockPriceByName('goog').then(function(result) {
  console.log(result);
})
```
再来看几种情况加深下印象：
```js
function fun1() {
  console.log('fun1');
  return 'fun1 result';
}
async function test() {
  const result1 = await fun1();
  console.log(result1);
  console.log('end');
}
test();
// 输出
// 'fun1'
// 'fun1 result'
// 'end'
```
```js
async function fun2() {
  console.log('fun2');
  return 'fun2 result';
}
async function test() {
  const result2 = await fun2();
  console.log(result2);
  console.log('end');
}
test();
// 输出
// 'fun2'
// 'fun2 result'
// 'end'
```

正常情况下，await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值。
```js
async function fun3() {
  console.log('fun3');
  setTimeout(function() {
    console.log('fun3 async');
    return 'fun3 result';
  }, 1000)
}
async function test() {
  const result3 = await fun3();
  console.log(result3);
  console.log('end');
}
test();
// 输出
// 'fun3'
// undefined
// 'end'
// 'fun3 async'
```
```js
async function fun4() {
  console.log('fun4');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fun4 async');
      resolve('fun4 result');
    }, 1000);
  })
}
async function test() {
  console.log(result4);
  console.log('fun4 sync');
  console.log('end');
}
test();
// 输出
// 'fun4'
// 'fun4 async'
// 'fun4 result'
// 'fun4 sync'
// 'end'
```

**模拟sleep**

JavaScript一直没有休眠的语法，但是借助await命令就可以让程序停顿指定的时间。【await要配合async来实现】
```js
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}
// use
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}
one2FiveInAsync();
// 1, 2, 3, 4, 5 每隔一秒输出数字
```
一道题

需求：使用async await改写下面的代码，使得输出的期望结果是每隔一秒输出0, 1, 2, 3, 4, 5，其中i < 5条件不能变。
```js
for(var i = 0 ; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    },1000)
}
console.log(i);

我们用async await方式来实现：
const sleep = (time) => new Promise((resolve) => {
  setTimeout(resolve, time);
});

(async () => {
  for(var i = 0; i < 5; i++){
    console.log(i);
    await sleep(1000);
  }
  console.log(i);
})();
// 符合条件的输出 0, 1, 2, 3, 4, 5
```

**比较promise和async**

为什么只比较promise和async呢？因为最近用得频繁，实在的才是需要的，而且async语法是generator的语法糖。

两者上，async语法写法上代码量少，错误处理能力佳，而且更有逻辑语义化。

假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。
```js
// promise
function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  let ret = null;

  // 新建一个空的Promise
  let p = Promise.resolve();

  // 使用then方法，添加所有动画
  for(let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  });

}
```
```js
// async await
async function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
```


## 类class
在ES6之前，是使用构造函数来模拟类的，现在有了关键字class了，甚是开心😄
```js
// 以前
function Person() {}
Person.prototype.sayHello = function(){
  console.log('Hi');
};
// 现在
class Person{
  sayHello(){
    console.log('Hi!');
  }
}
```

**constructor方法**

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法，一个类中必须有construtor方法，如果没有显式定义，一个空的constructor方法会默认添加。
```js
class Person{}
// 等同于
class Person{
  constructor(){}
}
```

construtor方法也就类似构造函数，在执行new的时候，先跑构造函数，再跑到原型对象上。

取值函数(getter)和存值函数(setter)
与ES5一样，在类的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```js
class MyClass {
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log(`setter: ${ value }`)
  }
}

let inst = new MyClass();

// 设置属性了。set拦截
inst.prop = 123;
// 'setter: 123'

// 直接输出，就走get拦截
console.log(inst.prop);
// 'getter'
```

**this的指向**

类的方法内部如果含有this，它默认是指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```js
class Person{
  constructor(job) {
    this.job = job;
  }
  printJob() {
    console.log(`My job is ${ this.job }`);
  }
  sayHi() {
    console.log(`I love my job -- ${ this.job }.`)
  }
}
const person = new Person('teacher');
person.printJob(); // 'My job is teacher'
const { sayHi } = person;
sayHi(); // 报错: Uncaught TypeError: Cannot read property 'job' of undefined


//上面的代码中，sayHi方法单独使用，this会指向该方法运行时所在的环境（由于class内部是严格模式，所以this实际上指向undefined）。

// 修正上面的错误也很简单，也是我们在react开发中经常使用的一种手段：在调用构造函数实例化的时候直接绑定实例(this)，修改如下：
class Person{
  constructor(job) {
    this.job = job;
    this.sayHi = this.sayHi.bind(this);
  }
}
```

## 继承

ES6中的继承通过extends关键字实现，比ES5的实现继承更加清晰和方便了。
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color;
  }
}

let cp = new ColorPoint(25, 8, 'green'); // 报错：Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

上面这样写，不能继承构造函数里面的属性值和方法。需要在子类的构造函数中加上super关键字。改成下面这样即可：
```js
// react 就是这么写的啊
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的construtor(x, y)，相当于ES5中的call。注意的是，super要放在子类构造函数的第一行
    this.color = color;
  }
}

let cp = new ColorPoint(25, 8, 'green');
```

## module模块

在ES6之前，社区制定了一些模块的加载的方案，最主要的有CommonJS和AMD两种。前者用于服务器，后者用于浏览器。
```js
// CommonJS
let { stat, exists, readFile } = require('fs');
```
ES6在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。
```js
// ES6模块
import { stat, exists, readFile } from 'fs';
```
**export命令**

export命令用于规定模块的对外接口	。

**一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。**你可以理解为一个命名空间～

想要获取模块里面的变量，你就需要导出export：
```js
// profile.js
const name = 'jia ming';
const sayHi = function() {
  console.log('Hi!');
}

export { name, sayHi };
```

还有一个export default命令，方便用户（开发者啦）不用阅读文档就能加载模块（实际上就是输出一个default变量，而这个变量在import的时候是可以更改的）：
```js
// export-default.js
export default function () {
  console.log('foo');
}
其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
**export 和 export default的区别**

export 导出的时候，其他模块要引入就得  import {x,x,x,} from xx,一个模块可以有多个 export

export default导出的时候，其他模块要引入就得  import x from xx,一个模块只能一个 export default


