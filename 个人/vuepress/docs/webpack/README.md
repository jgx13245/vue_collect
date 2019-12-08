# webpack

[webpack学习之路，点击去。点击去。点进去](https://juejin.im/post/5d398234518825121c007123)


## webpack4 学习之路（1）-起源

### 一、开篇小啰嗦
**此次webpack学习总结是通过慕课网上webpack教学。根据课程内容以及自己的理解，写成系列文章，加强自己的学习印象，共勉**


> 开始讲解之前，我们先了解一下为什么要使用webpack. webpack到底可以干什么啊？
好多面试的时候，都会问你会代码分割吗？ 你使用框架开发，离开脚手架，还会配置吗？怎么配置啊？看起来都是小问题，但是问起来有时候真的要命。现在写一下webpack4的系列文章。最后就应该可以解决这类问题了。

### 二、开发模式的演变

#### 1.面向过程开发
**特点**：乱七八糟。爱咋引就咋引

那个时候没有什么规范，一个html引入一个js文件。所有的js代码。全部写到一个js文件里面。
```html
<!html的页面>

<div id="root"></div>
<script src="./index.js"></script>
```
```js
// index.js代码
var root = document.getElementById('root');

// header模块
var header = document.createElement('div');
header.innerText = 'header';
root.appendChild(header);

// content模块
var content = document.createElement('div');
content.innerText = 'content';
root.appendChild(content);

// footer模块
var footer = document.createElement('div');
footer.innerText = 'footer';
root.appendChild(footer);
```
**问题来了，一个简单的头部，内容，尾部的布局，需要写在一个js文件。要是几十个上百个模块。是不是就多的爆炸。找问题，能累死**

#### 2.面向对象开发
**特点**：把js的代码一块块的分割，每个部分就是一个单独的js的代码，遇到问题，快速查找，容易维护
```html
<!-- index.html代码 -->
<p>这里是我们网页的内容</p>
<div id="root"></div>
<script src="./src/header.js"></script>
<script src="./src/content.js"></script>
<script src="./src/footer.js"></script>
<script src="./index.js"></script>
```
```js
// header.js
function Header() {
  var header = document.createElement('div');
  header.innerText = 'header';
  root.appendChild(header);
}
```
```js
// content.js
function Content() {
  var content = document.createElement('div');
  header.innerText = 'content';
  root.appendChild(content);
}
```
```js
// footer.js
function Footer() {
  var footer = document.createElement('div');
  header.innerText = 'footer';
  root.appendChild(footer);
}
```
```js
// index.js代码
var root = document.getElementById('root');
new Header();
new Content();
new Footer();
```
**大家好，我叫问题，我又来了。请问。js代码分隔开了，好处理了。html怎么办。一下子引入这么多js,而且顺序不能乱。否则就报错。少了还好，如果几百上千个咋整啊。我怎么拍顺序啊。**

#### 3.模块开发模式

**特点**：html 还是引入一个js代码，js代码还是分开。用模块化工具管理。咋看咋舒服。随后各种模块化加载越来越多，例如：ES Module（es6）、AMD(没用过)、CMD（没用过）以及CommonJS(服务端，node)等，我们介绍ES Module模块化加载方案，当然其他模块化标准也是生效的
```html
<!-- index.html代码 -->
<p>这里是我们网页的内容</p>
<div id="root"></div>
<script src="./index.js"></script>
```
```js
// header.js
export default function Header() {
  var root = document.getElementById('root');
  var header = document.createElement('div');
  header.innerText = 'header';
  root.appendChild(header);
}
```
```js

// content.js代码
export default function Content() {
  var root = document.getElementById('root');
  var content = document.createElement('div');
  content.innerText = 'content';
  root.appendChild(content);
}
```
```js
// footer.js
export default function Footer() {
  var root = document.getElementById('root');
  var footer = document.createElement('div');
  footer.innerText = 'footer';
  root.appendChild(footer);
}
```
```js

// index.js代码
import Header from './src/header.js';
import Content from './src/content.js';
import Footer from './src/footer.js';

new Header();
new Content();
new Footer();
```

**看的很爽啊，这样js代码既能分开，html也只需要自己引入一个js文件，爽啊，爽啊。哈哈，大家好。我叫浏览器，我不同意，怎么办。webpack来了。webpack就是编译一下，让浏览器同意**

<font color=red>webpack也不是单纯的js编译器，官网和新定义是模块打包工具</font>

## webpack4 学习之路（2）-安装

### 一、开篇小啰嗦


> 上一篇文章说了，浏览器不会同意我们使用ES module模块化方式写代码。它不认，此时webpack出马就可以解决这个问题 。

### 二、开始安装吧

1. 默认你装好node环境了啊。在桌面新建一个文件夹，创建一个node的包文件，生成一个package.json文件。

```
npm init 
```
2. 全局安装webpack

```
npm install webpack webpack-cli -g
```
**大家好，我叫问题。我又来了，这个webpack是在全局安装的，如果你有两个项目，一个依赖是webpack3,一个依赖webpack4.那么webpack3项目就废了。所以这种全局的也不一定好使，最好那个项目用，那个项目本身安装webpack4,别打扰别人**

3. 全局卸载掉
```
npm uninstall webpack webpack-cli -g
```
4. 进入项目文件夹
```
npm install webpack webpack-cli -D 或者 npm install webpack webpack-cli --save-dev
```
5.检查webpack版本号
```
npx webpack -v
```
**如果你直接输入webpack -v,是直接默认查看你的全局webpack。现在我们卸载了，所以是空。node提供npx,可以查看本文件的安装情况**

3. 版本号安装

```
npm install webpack@4.25.0 -D
```

## webpack4 学习之路（3）-配置文件

### 一、开篇小啰嗦


> 安装完，就该开始配置了。为什么webpack需要配置啊。我们说过webpack是个模块打包工具，但是打包js,图片，或者其他的后缀的文件，打包的流程肯定不一样的，所以需要配置文件。另外，webpack开发团队为了我们使用的爽。会有个一个文件默认配置基本的代码，我们就是在这个文件下修改代码。配置以满足我们的项目需求

### 二、开始配置吧

#### 1.创建基础配置文件
在总结一下需要输入的命令吧
```
1. npm init(生成node规范的文件)

2. npm install webpack webpack-cli -D （进入项目文件夹，局部安装webpack）

3. 把第一章的几个js，html文件自己手动创建

4. 手动创建 webpack.config.js文件

```
命令敲完，应该会形成一个下面的目录
```
|-- webpack(名字随便起)
|   |-- index.html
|   |-- index.js
|   |-- header.js
|   |-- content.js
|   |-- footer.js
|   |-- webpack.config.js
|   |-- package.json
```
webpack.config.js文件里面写代码
```
// path为Node的核心模块
const path = require('path');

module.exports = {
  entry: './index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
package.json 修改代码为
```
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "bundle": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2"
  }
}
```
执行命令
```
npm run bundle
```

看结果

#### 2.webpack执行的方式小总结

到现在，webpack 执行方式有三种

（1）如果你是全局安装的，就执行  webpack index.js 打包

（2）如果你是项目安装的，就执行 npx webpack index.js 打包

（3）你如果配置了webpack.config.js文件了，而且在packag.json里面修改了script.
直接执行 npm run bundle  不用特指index.js文件了。因为配置文件里面给你指明了

#### 3.看官方档案
讲的这里，就可以查看官网网址的开始了。看官方源码才是最原汁原味的讲解
[看官网讲解](https://webpack.js.org/guides/getting-started/)

#### 4.打包完页面信息解释
打完包，控制台会显示很多条信息。hash,version，等等啊。这些都是打包的信息提示，告知我们打包的状况，下面我们详细解释一下信息都是啥意思：
```
npm run bundle 
```
![打包信心](https://user-gold-cdn.xitu.io/2019/7/29/16c3ba8b203ae3a4?w=2322&h=624&f=jpeg&s=167854)

1. Hash： hash代表本次打包的唯一hash值，每一次打包此值都是不一样的

2. Version： 详细展示了我们使用webpack的版本号

3. Time： 代表我们本次打包的耗时

4. Asset： 代表我们打包出的文件名称

5. Size： 代表我们打包出的文件的大小

6. Chunks： 代表打包后的.js文件对应的id，id从0开始，依次往后+1

7. Chunks Names： 代表我们打包后的.js文件的名字，至于为何是main，而不是其他的内容，这是因为在我们的webpack.config.js中，entry:'./index.js'是对如下方式的简写形式：
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  // entry: './index.js',
  entry: {
    main: './index.js'
  }
  // 其它配置
}
```
8. Entrypoint main = bundle.js： 代表我们打包的入口为main

9. warning in configuration： 提示警告，意思是我们没有给webpack.config.js设置mode属性，mode属性有三个值：development代表开发环境、production代表生产环境、none代表既不是开发环境也不是生产环境。如果不写的话，默认是生产环境，可在配置文件中配置此项，配置后再次打包将不会再出现此警告。
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  // 其它配置
  mode: 'development'
}
```
## webpack4 学习之路（4）-核心概念
### 一、开篇小啰嗦


> 基本配置完，大家就明白怎么回事了，现在如果有个需求需要你手动搭建一个脚手架，你就知道怎么下手了，哈哈哈，搭建vue.react的脚手架也是从这里开始的。只不过vue的后缀是.vue，webpack不认识。有的图片，后缀是.png.webapck也不认识，所以这章节就是webpack的核心配置。解决各种遇到的问题。让webpack发光发热

### 二、核心概念-loader

#### 1. 啥是loader

loader是一种打包规则，它告诉了 Webpack 在遇到非.js文件时，应该如何处理这些文件，一个项目总有很多后缀不一样的文件。这个时候你要用loader告诉webpack怎么使用loader配置。

```
loader有如下几种固定的运用规则：(后面会解释)

使用test正则来匹配相应的文件
使用use来添加文件对应的loader
对于多个loader而言，从 右到左 依次调用
```
#### 2.使用loader打包图片-file-loader/url-loader

开发场景中，几乎离不开图片，webpack怎么识别图片后缀呢？ 蹬蹬蹬蹬。。。。

<font color=red>file-loader</font>或者<font color=red>url-loader</font>，后面介绍区别。需使用npm install进行安装
现在我们重点讲解file-loader

下面我们稍微修改一下代码，在网上随便找个图片放到项目文件夹里面

```
// index.js代码
import Header from './header.js';
import Content from './content.js';
import Footer from './footer.js';
import img from './1.png';

new Header();
new Content();
new Footer();
```
再次执行，npm run bundle 会报错，为啥。因为webpack 不认识png啊。咋办呢。在webpack.config.js配置文件里面配置

```
// path为Node的核心模块
const path = require('path');

module.exports = {
  entry: './index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{ // 告诉webpack打包的模块
    rules:[{  // 遇到不同的后缀打包的规则
      test:/\.png$/, // 正则，就是说遇到这个后缀怎么办
      use:{  // 遇到上面的后缀文件就使用下面的loader
        loader:'file-loader'
      }
    }]
  },
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

配置完别忘了下载啊

```
npm install file-loader -D
```

```
npm run bundle
```

哇擦擦擦。不报错了，解决了。

这个时候看dist包，里面就多了一个图片

![打包的图片](https://user-gold-cdn.xitu.io/2019/7/29/16c3bdf425d680df?w=442&h=674&f=jpeg&s=40070)

这个时候再引入图片。挂在在页面上。打包就不会出错了

**运用占位符**

在以上打包图片的过程中，我们发现打包生成的图片好像名字是一串乱码，如果我们要原样输出原图片的名字的话，又该如何进行配置呢？这个问题，可以使用 占位符 进行解决。

文件占位符它有一些固定的规则，像下面这样：
```
[name]代表原本文件的名字
[ext]代表原本文件的后缀
[hash]代表一个md5的唯一编码
```

```js
//webpack.config.js

// path为Node的核心模块
const path = require('path');

module.exports = {
  // 其它配置
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]'
          }
        }
      }
    ]
  }
}
```

这样配置生成的文件名字就变了
```
|-- dist
|   |-- avatar_bd7a45571e4b5ccb8e7c33b7ce27070a.jpg
```

**说完了file-loader,那什么是url-loader呢**

其实url-loader跟file-loader功能差不多，但是url-loader多了个功能就是图片打包的时候多了个配置项 limit

```
npm install url-loader -D
```
```js
//webpack.config.js

// path为Node的核心模块
const path = require('path');

module.exports = {
  // 其它配置
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            limit:2000 // 字节判断
          }
        }
      }
    ]
  }
}
```
limit 的意思是如果你的图片大小超过2000个字节的话，就跟file-loader吧图片打包到dist目录下，但是如果小于2000字节，就直接默认吧图片转换成base64添加到bundle.js里面。这样就能减少不必要的图片请求。增加性能。vue脚手架的webpack配置就是这样写的啊

#### 3.使用loader打包静态样式-css-loader/style-loader

css打包部分就很复杂，设置很乱，因为css后缀有很多个文件，.css，.scss，.less
等等。而且css在写的时候，可能会有互相影响的问题，这就互相干扰了，所以打包的时候可能还要配置css模块化，避免互相干扰，别急，一步步来。慢慢把这块啃干净

```
打包说明

样式文件分为几种情况，每一种都需要不同的loader来处理：

普通.css文件，使用style-loader和css-loader来处理
.less文件，使用less-loader来处理
.sass或者.scss文件，需要使用sass-loader来处理
.styl文件，需要使用stylus-loader来处理
```

乍一看。我去。这么多loader,啥时候能记住啊，没事，一步步来。先说前两个

  
   **css-loader:负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明，比如一个css的文件，引入了另一个css的文件，css-loader就可以吧所有的css整合到一快。否则就是无法解析了**
  
  **style-loader：会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。**


> 样式生效以后，不会生成一个css的文件夹，webpack会通过 style-loader自动的吧样式加在头部的 style 里面

1. 打包css文件

首先安装style-loader和css-loader

```
npm install style-loader -D
npm install css-loader -D
```

现在实战啊，

把页面目录该删删，改加加，改成这个样子,吧头部，内容。脚步的js文件删除，在根目录新建一个src的文件夹，吧index.js移动过去

```
|-- webpack(名字随便起)
|   |--src
    | |--index.js
    | |--index.css
|   |-- webpack.config.js
|   |-- package.json
```

index.js代码如下
```js
// index.js代码
import './index.css';

img.src = avatar;
img.classList.add('avatar');
root.appendChild(img);

```

index.css代码如下
```css
.avatar{
  width: 200px;
  height: 200px;
  border:1px solid #0f0;
}
```
webpack.config.js代码如下
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  entry: './src/index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[{
      test:/\.png$/,
      use:{
        loader:'file-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'] // 因为需要两个loader.用数组。
    }]
  },
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
如果代码中使用sass怎么办呢。这个时候就是有sass-laoder了

```
npm install sass-loader -D

npm install node-sass -D
```

下载好以后，修改一下代码

```js
// webpack.config.js代码如下
const path = require('path');

module.exports = {
  entry: './src/index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[{
      test:/\.png$/,
      use:{
        loader:'file-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'] // 因为需要两个loader.用数组。
    }]
  },
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
// 这里注意下，loader数组里面。都是从下到上，从右到左执行的，
//先是把scss语法转换为css,
//然后处理css文件的互相引用。
//最后挂载到html上。样式生效。
```
目录中的css文件改为 .scss后缀。里面的内容修改为 嵌套。就是这样

```css
body{
    .avatar{
        .....
    }
}
```
最后记得修改引用这个scss的文件的后缀

执行打包命令。页面上。语法会转换成 css的语法，并且生效。

**写到css我们就不可避免的涉及到兼容啊。浏览器厂商支持程度啊之类的问题，尤其是css3 每个浏览器厂商支持的，兼容都需要前缀。webpack有这个loader 可以帮我们实现**

1. 安装这个loader  

```
npm install postcss-lader -d
```
2. 我们先修改样式文件，加一个css3的属性transform

```css
body{
  .avatar{
    width: 150px;
    height: 150px;
    border:1px solid #0f0;
    transform: translate(100px,100px)
  }
}
```

3. 我们看官网的这个loader配置方式。
[官网](https://user-gold-cdn.xitu.io/2019/8/7/16c69dcf6a1596c8)

4. 根据官网我们得知，接下来就是在根目录下新建一个文件

postcss.config.js

```js
module.exports = {
  plugins: [
   require('autoprefixer')
  ]
}
```
别忘了下载这个插件
```
npm install autoprefixer -D
```

最后别忘了在webpack.config.js里面的loader数组再加一个postcss-loader

执行打包命令。看一下控制台的的样式  会加上厂商前缀

#### 4.css打包的模块化

CSS的模块化打包的理解是：我是一个单独的模块。如果我引用了你的样式，就生效，如果没有引入，那就不要干扰我的样式。

开发中有这中场景。

我是一个独立的模块A。我里面有我自己的一堆东西。这个时候，index.js入口文件全局引入了一个样式。同时index.js引入了A。那么。此时全局的样式就会影响A。这个时候就需要css模块化打包解决问题

修改下目录和里面的内容，吧index.html移动到dist文件下面

```
|-- webpack(名字随便起)
|   |--src
    | |--1.png
    | |--create.js
    | |--index.js
    | |--index.scss
|   |-- webpack.config.js
|   |-- package.json
```
create.js内容
```js
// create.js内容
import avatar from './1.png';

function create() {
  var root = document.getElementById('root');
  var img = new Image();
  img.src = avatar;
  img.classList.add('avatar');
  root.appendChild(img);
}
export default create
```

index.js内容
```js
// index.js代码
import avatar from './1.png';
import './index.scss';
import create from './avator'

create()

var root = document.getElementById('root');
var img = new Image();
img.src = avatar;
img.classList.add('avatar');
root.appendChild(img);
```
此时修改完以后，执行打包的命令。你会发现，你的独立模块样式被index.css影响了。这可就不好了。怎么办呢

**使用css模块化。修改代码**
webpack.config.js代码
```js
// path为Node的核心模块
const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[{
      test:/\.png$/,
      use:{
        loader:'url-loader',
        options:{
          name:'[name]_[hash].[ext]',
          outputPath:'images/',
          limit:20000    
        }
      }
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 
            {
              loader:'css-loader',
              options:{
               // 意思是如果一个css引入另一个css.那么也要把下面的loader走完
                importLoaders:2, 
               // 开启css模块化
                modules:true 
              }
            },
            'sass-loader',
            'postcss-loader'
          ]
    }]
  },
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
```css
body{
  .avatar{
    width: 150px;
    height: 150px;
    border:1px solid #0f0;
    transform: translate(100px,100px)
  }
  .mm{
    width: 250px;
    height: 250px;
    border:1px solid #f00;
    transform: translate(100px,100px)
  }
}
```

index.js
```js
// index.js代码
import avatar from './1.png';
import style from  './index.scss';
import create from './avator'

create()

var root = document.getElementById('root');
var img = new Image();
img.src = avatar;
img.classList.add(style.avatar); // 样式使用要求模块化了
root.appendChild(img);

```
avator.js代码
```
import avatar from './1.png';
import style from './index.scss'
function create() {
  var root = document.getElementById('root');
  var img = new Image();
  img.src = avatar;
  img.classList.add(style.mm); // 这么使用样式，用啥就是用啥，互不干扰
  root.appendChild(img);
}
export default create
```
### 三、webpacK的plugins使打包更加便捷
**plugins 是插件的意思，插件的意思是，在执行的过程中，来帮助webpack做一些事**

上面内容我们在写的时候，有这样的一个问题。就是webpack 只管吧js css  图片等文件通过loader 打包好以后，就直接放在dist里面，不管了，我们每次都需要手动创建一个index.html。来引入打包好的js文件，这样多费劲啊，如果能自动生成html.并引入js文件那该多好啊。下面就是插件们登场的时候了

1. [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#configuration)

```
npm install html-webpack-plugin -D
```
这个插件就能解决上面的问题

我们现在重新把页面目录删删减减

```
|-- webpack(名字随便起)
|   |--src
    | |--1.png
    | |--index.js
    | |--index.scss
    | |--index.html
|   |-- webpack.config.js
|   |-- package.json
```
webpack.config.js代码
```js
// path为Node的核心模块
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
module.exports = {
  mode:'development',
  entry: './src/index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[{
      test:/\.png$/,
      use:{
        loader:'url-loader',
        options:{
          name:'[name]_[hash].[ext]',
          outputPath:'images/',
          limit:20000    
        }
      }
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 
            {
              loader:'css-loader',
              options:{
                importLoaders:2,
                modules:true
              }
            },
            'sass-loader',
            'postcss-loader'
          ]
    }]
  },
  plugins:[new HtmlWebpackplugin({
  // 注入模板，这个html的内容会注入到自动生成的html里面
    template:'src/index.html' 
  })],
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
index.js的代码
```
// index.js代码
import avatar from './1.png';
import style from  './index.scss';

var root = document.getElementById('root');
var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);
root.appendChild(img);

```
index.html代码
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

现在吧dist 文件夹删除掉，重新打包，会发现dist文件下会自动生成html的文件，而且还自动引入了打包好的js文件

自动生成的html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
<script type="text/javascript" src="main.js"></script></body>
</html>
```
2. [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

 假如有以下场景，我们需要修改打包好的js文件。比如现在打包好我们叫bundle.js文件。我们现在改成dist.js。文件。执行以下打包，我们发现。dist的文件重新生成一个dist.js的文件。但是。。。但是 bundle.js 这个我们上次生成的文件居然还在。这可不行。我们需要一个插件就是每次生成新的打包js文件，就把以前的清除掉
 
 ```
 npm install clean-webpack-plugin -D
 ```
 webpack.config.js代码
 ```js
 // path为Node的核心模块
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  entry: './src/index.js',  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    ......
  },
  plugins:[
    new CleanWebpackPlugin(), // 在打包之前执行，清空所有的dist内容
    new HtmlWebpackplugin({template:'src/index.html'})
  ],
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: 'mm.js',
    path: path.resolve(__dirname, 'dist')
  }
}
 ```
注意版本问题，老版本的clean-webpack-plugin可能需要参数，但是新版本的不需要

### 四、entry和output的基本配置

1. entry 可以是一个字符串，也可以是一个对象。
（1）假如entry 不设置名字的话，打包就以output的filename的输出为主
  ```
  entry: './src/index.js', // 入口文件
  output: { //输出文件
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  ```
 > 这种情形打包出来的是 app.js

 (2)如果filename不设置名字，就医entry的名字为主
  ```
  entry: {
    main:'./src/index.js', // 入口文件
  }
  output: { //输出文件
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  ```
  > 这种情形打包出来的是 main.js

2. 有这个需求，需要把打包文件里面的js文件生成两个，
  修改entry和output的配置,让output的输出变成一个占位符。这样就能生成两个js
  ```
  entry: {
    main:'./src/index.js',
    sub:'./src/index.js'
  }, // 入口文件
  output: { //输出文件
    filename: '[name].js',  
    path: path.resolve(__dirname, 'dist') // path 会在根目录生成一个dist的文件
  },
  ```
  3.有时候我们需要打包好吧index.html给后端作为入口文件，里面引入的js文件前面加上域名，比如cdn什么的，这时候在output里面添加
  publicPath:域名，
  ```
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    publicPath:'https://ww.cdn.com',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
  ```
  打包好的html文件
  ```html
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
<script type="text/javascript" src="https://ww.cdn.com/aa.js"></script>
<script type="text/javascript" src="https://ww.cdn.com/bb.js"></script>
</body>
</html>
  ```
[官网解释](https://webpack.js.org/concepts/output/)

### 五、sourceMap的配置

我们知道webpack把所有的js代码打包到一快，有时候开发环境下没问题，但是生产环境下就有问题。但是代码全部都打包压缩了，根本不知道那里有问题，这个时候sourceMap就出场了。sourceMap顾名思义 就是 资源导图，它会告诉你现在打包好的js文件，运行出错的时候，对应没有打包的js文件的哪一行那一列。这下子就知道怎么修改了。

它是一种映射关系，它映射了打包后的代码和源代码之间的对应关系，一般通过devtool来配置。

webpack.config.js的代码
```js
// path为Node的核心模块
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  devtool:'source-map', // 配置这一行
  entry: {

  },  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[{
     
    }]
  },
  plugins:[
  
  ],
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的

  }
}
```
devtool:的sourceMap的配置很多个选项。涉及到打包速度的快慢问题，这是官网的配置

![sourceMap](https://user-gold-cdn.xitu.io/2019/8/8/16c705c21f32c956?w=732&h=949&f=jpeg&s=114468)

devtool: 配置的选项

build: 第一次打包的速度

rebuild: 以后打包的速度

production: 是否是生产环境

quality: 打包的质量

1. devtools:'sourceMap'，可以开启这个功能，如果配置了sourcemap.打包的速度会变慢的。

2. 使用sourcemap以后，你会发现，打包好的文件里面，有个.js.map的映射文件

3. 官方文档 配置 里面， 有个选项 devtool.里面有很详细的使用方法，

（1）sourceMap.打包出一个xx.js.map的文件

（2）inline-source-map，会把map的文件取消，转换成一个base64的行字符串加在打包的js文件里面.

（3）inline-cheap-source-map，上面的两个会把哪一行，那一列错的位置告诉我们，但是这个会把那一列去到，提高性能。

（4）cheap-module-eval-source-map,开发使用这个最好，全面，速度还快一点    **开发环境**

（5）cheap-module-source-map，生产使用这个比较好，mode：producton   **生产环境**

### 六、使用WebpackDevServer提升开发的效率

这一个插件很重要，因为跟我们前端开发日常息息相关。我们有时候使用vue，react 会发现启动了一个8080端口，3000端口。帮我们本地开了一个小型的服务。同时ajax请求数据（ajax必须在服务器上才能通过http协议请求数据），都是WebpackDevServer的功劳。搭配热更新效率更加好，下面我们就详细学习一下

1. 我们在开发中会遇到这样的问题，就是每次修改完代码，都需要手动执行打包的命令，然后在dist 文件夹打开index.html的页面，更新了。还要重新打包，回到浏览器刷新，费劲。

2. 现在有了WebpackDevServer就不用这么费劲了，因为它能时刻监听你是否更新，并且自动打包，生成一个小型本地服务，并自动更新浏览器的页面，那么怎们用呢

```
npm install webpack-dev-server -D
```

在index.js页面内容里面随便加一行代码

index.js代码
```
console.log(1233)
```

webpack.config.js代码

```js
// path为Node的核心模块
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  devtool:'source-map',
  entry: {
    main:'./src/index.js',
  },  
  devServer:{ // 添加一个devServer的模块，启动小服务，端口8020的（可以自己设置）
    contentBase:'./dist',
    port:8020
  },
  module:{
    rules:[{
      ....
    }]
  },
  plugins:[
   ...
  ],
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

package.json里面

```
{
  "name": "webpack-jue",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "bundle": "webpack", // 更新后需要每次手动的打包。。。。
    "watch": "webpack --watch", // 更新后，不用手动打包，但是要手动刷新浏览器
    "start": "webpack-dev-server" // 只要代码变更，保存，自动打包，刷新浏览器
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^9.6.1",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.1.0",
    "file-loader": "^4.1.0",
    "html-webpack-plugin": "^3.2.0",
    "install": "^0.13.0",
    "node-sass": "^4.12.0",
    "npm": "^6.10.3",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "url-loader": "^2.1.0",
    "webpack": "^4.38.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.8.0"
  }
}

```
### 七、Hot Module Replacement 热模块更新

模块热更新(HMR)的理解：它能够让我们在不刷新浏览器(或自动刷新)的前提下，在运行时帮我们更新最新的代码。

模块热更新(HMR)已内置到 Webpack ,我们只需要在webpack.config.js中像下面这样简单的配置即可，无需安装别的东西。

webpack.config.js代码
```
const webpack = require('webpack');
module.exports = {
  // 其它配置
  devServer: {
    contentBase: 'dist',
    open: true,
    port: 3000,
    hot: true, // 启用模块热更新
    hotOnly: true // 模块热更新启动失败时，重新刷新浏览器
  },
  plugins: [
    // 其它插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

在模块热更新(HMR)配置完毕后，我们现在来想一下，什么样的代码是我们希望能够热更新的，我们发现大多数情况下，我们似乎只需要关心两部分内容：CSS文件和.js文件，根据这两部分，我们将分别来进行介绍。

#### CSS中的模块热更新
首先我们在src目录下新建一个style.css样式文件，它的代码可以这样下：

```css
div:nth-of-type(odd) {
  background-color: red;
}
```

随后我们改写一下src目录下的index.js中的代码，像下面这样子：

```js
import './style.css';

var btn = document.createElement('button');
btn.innerHTML = '新增';
document.body.appendChild(btn);

btn.onclick = function() {
  var dom = document.createElement('div');
  dom.innerHTML = 'item';
  document.body.appendChild(dom);
}
```
由于我们需要处理CSS文件，所以我们需要保留处理CSS文件的loader规则，像下面这样
（其他loader配置不用动，单独加这个css规则就行）

webpack.config.js代码
```
module.exports = {
  // 其它配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```
在以上代码添加和配置完毕后，我们使用npm run start进行打包，我们点击按钮后，它会出现如下的情况 打包结果

理解： 由于item是动态生成的，当我们要将red颜色改变成yellow时，模块热更新能帮我们在不刷新浏览器的情况下，替换掉样式的内容。直白来说：自动生成的item依然存在，只是颜色变了。

#### 在js中的模块热更新
```
我们开发中，vue-laoder已经把这个功能内置了，
所以不用单独去配置这个功能
所以不用单独写什么。每次vue的项目保存一下，
页面自动就改变了，就是这个热模快更新的作用
```

在介绍完CSS中的模块热更新后，我们接下来介绍在js中的模块热更新。

首先，我们在src目录下创建两个.js文件，分别叫counter.js和number.js，它的代码可以写成下面这样：

```js
// counter.js代码
export default function counter() {
  var dom = document.createElement('div');
  dom.setAttribute('id', 'counter');
  dom.innerHTML = 1;
  dom.onclick = function() {
    dom.innerHTML = parseInt(dom.innerHTML,10)+1;
  }
  document.body.appendChild(dom);
}
```
number.js中的代码是下面这样的：
```js
// number.js代码
export default function number() {
  var dom = document.createElement('div');
  dom.setAttribute('id','number');
  dom.innerHTML = '1000';
  document.body.appendChild(dom);
}
```
添加完以上两个.js文件后，我们再来对index.js文件做一下小小的改动：

```js
// index.js代码
import counter from './counter';
import number from './number';
counter();
number();
```
在以上都改动完毕后，我们使用npm run start进行打包，在页面上点击数字1，让它不断的累计到你喜欢的一个数值(记住这个数值)，这个时候我们再去修改number.js中的代码，将1000修改为3000，也就是下面这样修改：

```js
// number.js代码
export default function number() {
  var dom = document.createElement('div');
  dom.setAttribute('id','number');
  dom.innerHTML = '3000';
  document.body.appendChild(dom);
}
```
我们发现，虽然1000成功变成了3000，但我们累计的数值却重置到了1，这个时候你可能会问，我们不是配置了模块热更新了吗，为什么不像CSS一样，直接替换即可？

回答：这是因为CSS文件，我们是使用了loader来进行处理，有些loader已经帮我们写好了模块热更新的代码，我们直接使用即可(类似的还有.vue文件，vue-loader也帮我们处理好了模块热更新)。而对于js代码，还需要我们写一点点额外的代码，像下面这样子：

```js
import counter from './counter';
import number from './number';
counter();
number();

// 额外的模块HMR配置
if(module.hot) {
  module.hot.accept('./number.js', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  })
}
```
写完上面的额外代码后，我们再在浏览器中重复我们刚才的操作，即：

累加数字1带你喜欢的一个值
修改number.js中的1000为你喜欢的一个值
以下截图是我的测试结果，同时我们也可以在控制台console上，看到模块热更新第二次启动时，已经成功帮我们把number.js中的代码输出到了浏览器。 模块热更新结果

小结：在更改CSS样式文件时，我们不用书写module.hot，这是因为各种CSS的loader已经帮我们处理了，相同的道理还有.vue文件的vue-loader，它也帮我们处理了模块热更新，但在.js文件中，我们还是需要根据实际的业务来书写一点module.hot代码的。

### 八、使用bable处理Es6语法

我们在开发的时候会写到ES6语法，但是这个语法，好多的浏览器不支持，
所以需要各种办法去吧ES6的语法转换我ES5，这就用到了bable
使用之前，先下载三个依赖
```
// babel-loader是和webpack建立连接的桥梁，
// @babel/core 是bable的核心库
   
$ npm install babel-loader @babel/core --save-dev

// @babel/preset-env这个模块是吧es6转换为es5的模块

$ npm install @babel/preset-env --save-dev

//  @babel/polyfilles5转换为es5语法转了，但是有些变量或者方法，浏览器还是不
//  认识，所以这个模块就是这个个别的方法或者变量的补丁，

$ npm install @babel/polyfill --save-dev
```

安装完以后，我们改一下页面的目录
src只留下index.js入口文件就可以了
同事在根目录新建一个.babelrc的文件
```
|-- webpack(名字随便起)
|   |--src
    | |--index.js
    | |--index.html
|   |-- webpack.config.js
|   |-- package.json
|   |-- .babelrc
```
webpack.config.js的代码,loader部分新加一个babel-loader

```
// path为Node的核心模块
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  devtool:'source-map',
  entry: {
    main:'./src/index.js',
  },  
  devServer:{
   ......
  },
  module:{
    rules:[
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader" ,
      },
      ....
      ]
  },
  plugins:[
   ......
  ],
  output: {  
  ......
  }
}
```
.babelrc文件

```
{
  "presets": [["@babel/preset-env", {
    "corejs": 2,// 目的是，按需引入需要的es6补充语法，如果不设置，就是全局引入，包会很大。
    "useBuiltIns": "usage" // 如果不配置，polyfill补丁会把所有的es补丁补充上
    ，代码打包很大，这个配置上，按需补充，就会很小
  }]]
}
```

index.js代码
```
// index.js代码
const arrppp = [
  new Promise(() => {}),
  new Promise(() => {})
]

arrppp.map( item => {
  console.log(item)
})

```

执行打包命令
```
npx webpack
```

查看main.js的代码，会发现已经转换为es5语法，并且。补充了es6新特性的变量和语法


## webpack4 学习之路（5）-高级概念

### 一、Tree shaking 概念以及如何使用

- Tree Shaking，树枝摇晃，是一个术语，通常用于描述移除js中未使用的代码。
比如我们在开发中，有一个模块有大量的方法，但是引用其中一个方法，打包的时候，其他没有用的方法也会打包，就会代码冗余，所以需要设置一下，吧不需要的方法，不打包。

注意
```
Tree Shaking 只适用于ES
Module语法(既通过export导出，import引入)，因为它依赖于ES
Module的静态结构特性。
```

下面我们重新改造一下目录

我们需要现在src目录下新建一个math.js文件，它的代码如下：

```js
export function add(a, b) {
  console.log(a + b);
}
export function minus(a, b) {
  console.log(a - b);
}
```

接下来我们对index.js做一下处理，它的代码像下面这样，从math.js中引用add方法并调用：

```js
import { add } from './math'
add(3, 2);
```

对webpack.config.js做一下配置，让它支持Tree Shaking，它的改动如下：

```
const path = require('path');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.js'
  },
  ...
  ...
  ...
  optimization: {
    usedExports: true
  },
  ...
  ...
  ...
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,'dist')
  }
}
```



修改package.json的文件配置，添加一行sideEffects的属性



由于Tree Shaking作用于所有通过import引入的文件，如果我们引入第三方库，例如：import _ from 'lodash'或者.css文件，例如import './style.css' 时，如果我们不 做限制的话，Tree Shaking将起副作用，会认为没有导出，就把这个模块全部否定不打包。SideEffects属性能帮我们解决这个问题：它告诉webpack，我们可以对哪些文件不做 Tree Shaking

```
// 如果不希望对任何文件进行此配置，可以设置sideEffects属性值为false
// *.css 表示 对所有css文件不做 Tree Shaking
// @babael/polyfill 表示 对@babel/polyfill不做 Tree Shaking
"sideEffects": [
  "*.css",
  "@babel/polyfill"
],
```
配置完毕后，我们依然使用npx webpack进行打包，可以看到，它的打包结果如下所示：

![WeChat6bb43657c137362605efd33e85e5d5ff.png](https://user-gold-cdn.xitu.io/2019/8/28/16cd60f00de26599?w=1722&h=306&f=png&s=84279)

打包代码分析：以上代码是一段被压缩过后的代码，我们可以看到，上面只有add方法，未使用的minus方法并没有被打包进来，这说明在开发环境下我们的Tree Shaking起了作用。

这是开发环境，如果是生产环境，optimization 这个属性就不用配置了。但是sideEffects还是需要配置的。打包一下。还是这个效果，没有用的方法，就不会打包进去。


### 二、区分开发模式和生产模式

如果我们要区分Tree Shaking的开发环境和生产环境，那么我们每次打包的都要去更改webpack.config.js文件，是不是很麻烦啊！

```

区分开发环境和生产环境，最好的办法是把公用配置提取到一个配置文件，生产环境和开发环境只写自己需要的配置，在打包的时候再进行合并即可，webpack-merge 可以帮我们做到这个事情。

```
首先，我们模仿一下vue的脚手架的形式，把 Webpack 相关的配置都放在根目录下的build文件夹下，所以我们需要新建一个build文件夹，随后我们要在此文件夹下新建三个.js文件和删除webpack.config.js，它们分别是：

```
webpack.common.js：Webpack 公用配置文件
webpack.dev.js：开发环境下的 Webpack 配置文件
webpack.prod.js：生产环境下的 Webpack 配置文件
```

新建完webpack.common.js文件后，我们需要把公用配置提取出来，它的代码看起来应该是下面这样子的：

```js
// path为Node的核心模块
const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main:'./src/index.js',
  },  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader" ,
      },
      {
      test:/\.png$/,
      use:{
        loader:'url-loader',
        options:{
          name:'[name]_[hash].[ext]',
          outputPath:'images/',
          limit:20000    
        }
      }
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 
            {
              loader:'css-loader',
              options:{
                importLoaders:2,
                modules:true
              }
            },
            'sass-loader',
            'postcss-loader'
          ]
    }]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackplugin({template:'src/index.html'})
  ],
  output: {  // 告诉webpack打好包以后放在那个文件夹。dist是自动生成的
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
}
```
提取完 Webpack 公用配置文件后，我们开发环境下的配置，也就是webpack.dev.js中的代码，将剩下下面这些：
```js
// path为Node的核心模块
module.exports  = {
  mode:'development',
  devtool:'source-map',
  devServer:{
    contentBase:'./dist',
    port:8020
  },
  optimization: {
    usedExports:true
  },
}

```

而生产环境下的配置，也就是webpack.prod.js中的代码，可能是下面这样子的：

```js

module.exports = {
  mode:'production',
  devtool:'source-map',
  optimization: {
    usedExports:true
  },
}

```
在处理完以上三个.js文件后，我们需要做一件事情：

- 当处于开发环境下时，把webpack.common.js中的配置和webpack.dev.js中的配置合并在一起
- 当处于开发环境下时，把webpack.common.js中的配置和webpack.prod.js中的配置合并在一起
- 针对以上问题，我们可以使用webpack-merge进行合并，在使用之前，我们需要使用如下命令进行安装：

```
$ npm install webpack-merge -D
```

安装完毕后，我们需要对webpack.dev.js和webpack.prod.js做一下手脚，其中webpack.dev.js中的改动如下(代码高亮部分)：

```js
// path为Node的核心模块
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode:'development',
  devtool:'source-map',
  devServer:{
    contentBase:'./dist',
    port:8020
  },
  optimization: {
    usedExports:true
  },
}

module.exports = merge(commonConfig, devConfig);
```

相同的代码，webpack.prod.js中的改动部分如下(代码高亮)：
js

```js
// path为Node的核心模块
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode:'production',
  devtool:'source-map',
  optimization: {
    usedExports:true
  },
}

module.exports = merge(commonConfig, prodConfig);
```

要重新在package.json中配置一下我们的打包命令，它们是这样子写的：

```
"scripts": {
  "dev": "webpack-dev-server --config ./build/webpack.dev.js",
  "build": "webpack --config ./build/webpack.prod.js"
},
```

配置完打包命令，心急的你可能会马上开始尝试进行打包，你的打包目录可能长成下面这个样子：
```
|-- build
|   |-- dist
|   |   |-- index.html
|   |   |-- main.js
|   |   |-- main.js.map
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- src
|   |-- index.html
|   |-- index.js
|   |-- math.js
|-- .babelrc
|-- postcss.config.js
|-- package.json
```
问题分析：当我们运行npm run
build时，dist目录打包到了build文件夹下了，这是因为我们把Webpack 相关的配置放到了build文件夹下后，并没有做其他配置，Webpack 会认为build文件夹会是根目录，要解决这个问题，需要我们在webpack.common.js中修改output属性，具体改动的部分如下所示：

```
output: {
  filename: '[name].js',
  path: path.resolve(__dirname,'../dist')
}
```

那么解决完上面这个问题，赶紧使用你的打包命令测试一下吧，我的打包目录是下面这样子，如果你按上面的配置后，你的应该跟此目录类似

```
|-- build
|   |-- webpack.common.js
|   |-- webpack.dev.js
|   |-- webpack.prod.js
|-- dist
|   |-- index.html
|   |-- main.js
|   |-- main.js.map
|-- src
|   |-- index.html
|   |-- index.js
|   |-- math.js
|-- .babelrc
|-- postcss.config.js
|-- package.json
```

### 三、webpack的code splitting 代码分割

每次面试都会问，你是怎么进行代码分割的，现在终于可以说出来了。

其实代码分割跟webpack 并没有实质联系。只是webpack 现在内置的插件可以帮我们进行代码分割，所有就绑在一块了。

Code Splitting 的核心是把很大的文件，分离成更小的块，让浏览器进行并行加载。

```
假如项目打包业务代码1m，引入的第三方库打包也是1m，如果不分割，

webapck就会打包出一个2m的文件，每次加载，都要加载一个2m的文件。很占空间

如果使用代码分割，就是打包出两个1m的文件。

我们知道，浏览器执行js代码，是可以并行加载的。所以速度会提升

另外，我们修改业务代码。第三方代码不改变，用户重新刷新，就只会

在单独加载一个1m的文件就好了。
```

**常见的代码分割有三种形式：**
```
手动进行分割：例如项目如果用到lodash，则把lodash单独打包成一个文件。

同步导入的代码：使用 Webpack 配置进行代码分割。

异步导入的代码：通过模块中的内联函数调用来分割代码。
```

#### 1. 手动进行分割
手动进行分割的意思是在entry上配置多个入口，例如像下面这样：

module.exports = {
  entry: {
    main: './src/index.js',
    lodash: 'lodash'
  }
}
这样配置后，我们使用npm run build打包命令，它的打包输出结果为：

```
        Asset       Size  Chunks             Chunk Names
  index.html  462 bytes          [emitted]
    lodash.js   1.46 KiB       1  [emitted]  lodash
lodash.js.map   5.31 KiB       1  [emitted]  lodash
      main.js   1.56 KiB       2  [emitted]  main
  main.js.map   5.31 KiB       2  [emitted]  main
 ```
 
它输出了两个模块，也能在一定程度上进行代码分割，不过这种分割是十分脆弱的，如果两个模块共同引用了第三个模块，那么第三个模块会被同时打包进这两个入口文件中，而不是分离出来。**（强烈不推荐）**


所以我们常见的做法是关心后两种代码分割方法，无论是同步代码还是异步代码，都需要在webpack.common.js中配置splitChunks属性，像下面这样子：

```js
module.exports = {
  // 其它配置
  ...
  ...
  ...
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
  ...
  ...
  ...
}
```
你可能已经看到了其中有一个chunks属性，它告诉 Webpack 应该对哪些模式进行打包，它的参数有三种：

- async：此值为默认值，只有异步导入的代码才会进行代码分割。
- initial：与async相对，只有同步引入的代码才会进行代码分割。
- all：表示无论是同步代码还是异步代码都会进行代码分割

以上只是大概介绍一下同步代码分割和异步代码分割的共同配置项。下面详细讲解。


#### 2. 同步代码分割

首先，我们先介绍同步代码分割，所谓的同步代码分割，就是引入第三方库，正常使用，下面我们安装一个第三方库，例如：lodash，

```
npm install loadsh --save
```

然后对index.js中的代码做一些手脚，像下面这样：

```js
import _ from 'lodash'
console.log(_.join(['Dell','Lee'], ' '));
```

就像上面提到的那样，同步代码分割，我们只需要在webpack.common.js配置chunks属性值为initial即可：

```js
module.exports = {
  // 其它配置
  optimization: {
    splitChunks: {
      chunks: 'initial'
    }
  }
}
```
在webpack.common.js配置完毕后，我们使用npm run build来进行打包， 你的打包dist目录看起来应该像下面这样子：

```
|-- dist
|   |-- index.html
|   |-- main.js
|   |-- main.js.map
|   |-- vendors~main.js
|   |-- vendors~main.js.map
```
打包分析：main.js使我们的业务代码，vendors~main.js是第三方模块的代码，在此案例中也就是_lodash中的代码。由此可见，业务代码main和第三方的代码vendors~main.js分割了。

#### 3. 异步代码分割
如果我们只需要针对异步代码进行代码分割的话，我们只需要进行异步导入，Webpack会自动帮我们进行代码分割，异步代码分割它的配置如下：

```
module.exports = {
  // 其它配置
  optimization: {
    splitChunks: {
      chunks: 'async'
    }
  }
}
```
注意：由于异步导入语法目前并没有得到全面支持，需要通过 npm 安装
```
$ npm install @babel/plugin-syntax-dynamic-import -D 插件来进行转译
```


安装完毕后，我们需要在根目录下的.babelrc文件做一下改动，像下面这样子：
```
{
  "presets": [["@babel/preset-env", {
    "corejs": 2,
    "useBuiltIns": "usage"
  }]],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

配置完毕后，我们需要对index.js做一下代码改动，让它使用异步导入代码块:

```js
// 点击页面，异步导入lodash模块
document.addEventListener('click', () => {
  getComponent().then((element) => {
    document.getElementById('root').appendChild(element)
  })
})

function getComponent () {
  return import(/* webpackChunkName: 'lodash' */'lodash').then(({ default: _ }) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Dell', 'lee'], ' ')
    return element;
  })
}
```

写好以上代码后，我们同样使用npm run build进行打包，dist打包目录的输出结果如下：

```
|-- dist
|   |-- 1.js
|   |-- 1.js.map
|   |-- index.html
|   |-- main.js
|   |-- main.js.map
```
我们在浏览器中运行dist目录下的index.html，切换到network面板时，我们可以发现只加载了main.js，


当我们点击页面时，才 真正开始加载 第三方模块，

#### 4. SplitChunksPlugin配置参数详解
webpack能进行代码分割的核心就是使用了SplitChunksPlugin这个插件，
这个插件有很多可以配置的属性，它也有一些默认的配置参数，它的默认配置参数如下所示，我们将在下面为一些常用的配置项做一些说明。

 打开官网，找到这个插件 [SplitChunksPlugin](https://user-gold-cdn.xitu.io/2019/8/29/16cdc73a3a2e786b)
 ```
module.exports = {
  // 其它配置项
  optimization: {
    splitChunks: {
      chunks: 'async', // 异步还是同步分割代码
      minSize: 30000, // 如果模块大于30k就开始分割。否则就不分割
      minChunks: 1, // 改模块必须引用一次以上才分割
      maxAsyncRequests: 5, // 默认就行了
      maxInitialRequests: 3,// 默认就行了
      automaticNameDelimiter: '~',// 默认就行了
      name: true,
      cacheGroups: { 
        vendors: { //分组，如果模块满足在module包里面，就打包成vender.js形式
          test: /[\\/]node_modules[\\/]/,
          priority: -10// 值越大。越服从谁，比如一个loadsh的包，符合第一个组，也符合默认，就看priority的值，越大就打包到哪个组
        },
        default: { //分组，如果模块不在module包里面，打包成default.js形式
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 如果一个模块已经被打包了，在遇到的时候，就忽略掉，直接使用以前的包
        }
      }
    }
  }
};
```


**参数详细说明**
```
# minSize
minSize默认值是30000，也就是30kb，当代码超过30kb时，才开始进行代码分割，小于30kb的则不会进行代码分割；与minSize相对的，maxSize默认值为0，为0表示不限制打包后文件的大小，一般这个属性不推荐设置，一定要设置的话，它的意思是：打包后的文件最大不能超过设定的值，超过的话就会进行代码分割。

为了测试以上两个属性，我们来写一个小小的例子，在src目录下新建一个math.js文件，它的代码如下：

export function add(a, b) {
  return a + b;
}
新建完毕后，在index.js中引入math.js:

import { add } from './math.js'
console.log(add(1, 2));
打包分析：因为我们写的math.js文件的大小非常小，如果应用默认值，它是不会进行代码分割的，如果你要进一步测试minSize和maxSize，请自行修改后打包测试。

--------------------------------------------------------

# minChunks

默认值为1，表示某个模块复用的次数大于或等于一次，就进行代码分割。

如果将其设置大于1，例如：minChunks:2，在不考虑其他模块的情况下，以下代码不会进行代码分割：

// 配置了minChunks: 2，以下lodash不会进行代码分割，因为只使用了一次 
import _ from 'lodash';
console.log(_.join(['Dell', 'Lee'], '-'));
--------------------------------------------------------


# maxAsyncRequests 和 maxInitialRequests
maxAsyncRequests：它的默认值是5，代表在进行异步代码分割时，前五个会进行代码分割，超过五个的不再进行代码分割。
maxInitialRequests：它的默认值是3，代表在进行同步代码分割时，前三个会进行代码分割，超过三个的不再进行代码分割。

--------------------------------------------------------

# automaticNameDelimiter
这是一个连接符，左边是代码分割的缓存组，右边是打包的入口文件的项，例如vendors~main.js
--------------------------------------------------------

# cacheGroups
说明

在进行代码分割时，会把符合条件的放在一组，然后把一组中的所有文件打包在一起，默认配置项中有两个分组，一个是vendors和default

vendors组： 以下代码的含义是，将所有通过引用node_modules文件夹下的都放在vendors组中

vendors: {
  test: /[\\/]node_modules[\\/]/,
  priority: -10
}
default组： 默认组，意思是，不符合vendors的分组都将分配在default组中，如果一个文件即满足vendors分组，又满足default分组，那么通过priority的值进行取舍，值最大优先级越高。

default: {
  minChunks: 2,
  priority: -20,
  reuseExistingChunk: true
}
--------------------------------------------------------
# reuseExistingChunk
中文解释是复用已存在的文件。意思是，如果有一个a.js文件，它里面引用了b.js，但我们其他模块又有引用b.js的地方。开启这个配置项后，在打包时会分析b.js已经打包过了，直接可以复用不用再次打包。

// a.js
import b from 'b.js';
console.log('a.js');

// c.js
import b from 'b.js';
console.log('c.js');
```

### 四、shimming

有时候我们在引入第三方库的时候，不得不处理一些全局变量的问题，例如jQuery的‘$’符号，

lodash的_符号，但由于一些老的第三方库不能直接修改它的代码，每次每个页面使用。都需要单独的import ....,这样真的很费劲。这时我们能不能定义一个全局变量，当文件中存在$或者_的时候自动的帮他们引入对应的包。

- 我们可以使用ProvidePlugin插件来解决，这个插件已经被 Webpack 内置，无需安装，直接使用即可。 

src目录下新建一个juqery.js的文件

```js
export function ui() {
  $('body').css('background','green')
}
```
index.js

```js
import _ from 'lodash';
import $ from 'jquery';
import { ui } from './jquery';

ui();

var dom = $(`<div>${_.join(['ji', 'xin'], '---')}</div>`);
$('#root').append(dom);
```
这个时候npm run dev 打开页面。。你会发现报错，$ 符号找不到的错误

为啥呢？ 因为index.js虽然引用了jquery的包。而且使用了ui的模块。但是模块之间是解耦的，没有关系。所以jquery的模块没有$的引用。为此使用ProvidePlugin插件可以在webpack帮忙全局引用

webpack.common.js

```js
// path为Node的核心模块
const HtmlWebpackplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    main:'./src/index.js',
  },  // 告诉webpack打包的入口文件在哪里，它从这里找，开始打包
  module:{
    rules:[
    ...
    ...
    }]
  },
  optimization: {
   ...
   ...
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackplugin({template:'src/index.html'}),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash'
    })
  ],
}
```
再重新打包，就没有问题了。

### 四、webpack的性能优化

webpack如果配置好了，就可以增加打包的速度，所以webpack的性能问题也是一个面试或者工作中常见的问题。










