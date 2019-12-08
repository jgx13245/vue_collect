# 手写前端方法



## 手写实现call

::: tip
其实call方法就会在方法（Function）的原型上添加了一个方法(call)。这个添加的方法(call)。有个参数(随便都行)就是你要指向的那个对象(foo1)。方法里面的this(bar)就是你要改变指向的方法。原理就是，在这个call方法里面把要改变方向的方法（bar）复制一份给被指向的对象（foo1）,然后被指向的对象调用这个方法。这不就是把bar方法的this指向foo1对象了啊
:::
```js
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

## 手写实现apply

::: tip
其实apply方法就会在方法（Function）的原型上添加了一个方法(call)。这个添加的方法(call)。有个参数(随便都行)就是你要指向的那个对象(foo1)。方法里面的this(bar)就是你要改变指向的方法。原理就是，在这个call方法里面把要改变方向的方法（bar）复制一份给被指向的对象（foo1）,然后被指向的对象调用这个方法。这不就是把bar方法的this指向foo1对象了啊
:::

```js
  Function.prototype.apply1 = function(context = window) {
    context.fn = this
    let result
    if(arguments[1]) {
      result = context.fn(...arguments[1]) // 如果有第二个参数，就把这个数组参数拆开一个个参数传进去
    }else{
      result = context.fn() // 如果没有第二个参数。就直接执行
    }
    delete context.fn()
    return result
  }
  var foo1 = {
    value:10
  }
  function bar1(name,age) {
    console.log(name)
    console.log(age)
    console.log(this.value)
  }
  const arr = ['ss','123']
  bar1.apply1(foo1,arr)
```