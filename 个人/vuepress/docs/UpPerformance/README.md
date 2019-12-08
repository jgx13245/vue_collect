# 性能提升

## 前端性能优化

### webpack 打包优化

1. 生产环境下去掉sourcemap

```js
// webpacl.config.js 代码修改为： 
const shouldUseSourceMap = process.env.NODE_ENV === 'production' ? false : true;
```

2. 修改了图片打包大小的限制，

```js
// 小于30k的图片直接转换成base64 减少图片请求
{
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.jpg$/,/\.svg$/],
      loader: require.resolve('url-loader'),
      options: {
            limit: 30000, // 把默认的 10000 修改为 40000
            name: 'static/media/[name].[hash:8].[ext]',
      },
 }
```

3. 图片使用懒加载，可以使用网上的插件，也可以自己写一个事件节流和防抖

```js
// fn 是事件回调, delay 是时间间隔的阈值
function throttle(fn, delay) {
  // last 为上一次触发回调的时间, timer 是定时器
  let last = 0,
    timer = null;
  // 将throttle处理结果当作函数返回
  return function() {
    // 保留调用时的 this 上下文
    let context = this;
    // 保留调用时传入的参数
    let args = arguments;
    // 记录本次触发回调的时间
    let now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      clearTimeout(timer);
      timer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, delay);
    } else {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    }
  };
}

// 获取可视区域的高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
// 用新的 throttle 包装 scroll 的回调
const lazyload = throttle(() => {
  // 获取所有的图片标签
  const imgs = document.querySelectorAll('#list .wrap-img img');
  // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
  let num = 0;
  for (let i = num; i < imgs.length; i++) {
    // 用可视区域高度减去元素顶部距离可视区域顶部的高度
    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
    // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
    if (distance >= 100) {
      // 给元素写入真实的 src，展示图片
      let hasLaySrc = imgs[i].getAttribute('data-has-lazy-src');
      if (hasLaySrc === 'false') {
        imgs[i].src = imgs[i].getAttribute('data-src');
        imgs[i].setAttribute('data-has-lazy-src', true); // 
      }
      // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
      num = i + 1;
    }
  }
}, 1000);
```

**节流和防抖的区别**