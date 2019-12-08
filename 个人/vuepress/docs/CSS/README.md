# CSS

## CSS一些基本概念

**块级元素**

默认情况下，块级元素会另起一行，并尽可能的充满整个容器。
块级元素可以包含行内元素和其他块级元素，相比于行内元素可以创建更复杂和大型的结构

块级元素列表：

html5新增的元素：

figcation：图文信息组标题 ，
article：文章，
figure：图文信息组
output：表单输出
aside：侧栏内容，
footer：区段尾或页尾，
audio：音频播放
video：视频播放，
section：页面区段，
canvas：画布、绘制图形，
header：区段头或页头
hgroup：标题组，

**行内元素**

行内元素不会另起一行只占据它对应的标签的边框所包含内容的空间，
只能包含数据和其他行内元素

行内元素列表
b，big，i，small，tt，
abbr，acronym，cite，code，dfn，em，kbd，strong，samp，var，
a，bdo，br，img，map，object，q，script，span，sub，sup，
button，input，label，select，textarea

**块级元素和行内元素的区别**

块级元素：

1.会另起一行，

2.可以设置width，height，margin，padding，border属性

3.默认宽度是容器的100%

行内元素：

1.和其他元素在同一行内

2.高度和宽度就是内容的高度和宽度

3.可以设置margin-left和margin-right属性，无法设置margin-top和margin-bottom属性

4.border和padding可以设置，但是border-top和padding-top到页面顶部后就不再增加

**正常流**

正常流指：从左到右，从上到下显示。要让一个元素不在正常流中，唯一的办法是让元素浮动或定位

**非替换元素**

如果元素的内容包含在文档中，则称之为非替换元素。比如一个段落的文本都在该元素本身之内，这个段落就是一个非替换元素。

**替换元素**

作为其他内容占位符的一个元素称为替换元素，根据标签和属性的值来显示内容的元素。比如img元素，它只是指向一个图像文件，这个文件插入到文档流中。大多数表单元素（input，根据type属性来显示内容）也是替换元素。

**根元素**

位于文档树的顶端，在html文档中就是html元素

## css盒模型

**什么是盒子模型**

>在一个文档中，每个元素都被表示为一个矩形的盒子。确定这些盒子的尺寸, 属性 --- 像它的颜色，背景，边框方面 --- 和位置是渲染引擎的目标。
在CSS中，使用标准盒模型描述这些矩形盒子中的每一个。这个模型描述了元素所占空间的内容。每个盒子有四个边：外边距边, 边框边, 内填充边与内容边。


1. 首先是W3C的标准盒子模型

![Alt text](https://img-blog.csdn.net/20180819102728436?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3psaW5neXVu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


在标准盒子模型中，width指的是content

假设设置了width：300

**标准盒模型中,总width = 你设置的width+2margin+2padding+2border**

2. IE的盒子模型

![Alt text](https://img-blog.csdn.net/2018081910282343?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3psaW5neXVu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

在IE的盒子模型中，width表示content+padding+border这三部分的宽度。

假设设置了width：300

总width = width+margin   

**怪异盒模型中，你设置的width=内容+padding+border.全是你自己设置的width的值，所以，如果你设置padding的话，里面的cotent会变小。被压缩了**

## CSS伪类和伪元素

1. 伪类和伪元素的区别，其实很简单，从字面上就可以理解。它们有一个共同的修饰词“伪”，那么“伪”是什么意思呢？就是假的呗。所以，伪类就是假的类，伪元素就是假的元素，这就是在字面上它们之间的区别。下面我们再从定义上感受一下。

### 伪类

1. 伪类存在的意义是为了通过选择器，格式化DOM树以外的信息以及不能被常规CSS选择器获取到的信息。

（1）格式化DOM树以外的信息。比如： a 标签的:link、:visited 等。这些信息不存在于DOM树中。

（2）不能被常规CSS选择器获取到的信息。比如：要获取第一个子元素，我们无法用常规的CSS选择器获取，但可以通过 :first-child 来获取到。

### 伪元素
1. 伪元素可以创建一些文档语言无法创建的虚拟元素。比如：文档语言没有一种机制可以描述元素内容的第一个字母或第一行，但伪元素可以做到(::first-letter、::first-line)。同时，伪元素还可以创建源文档不存在的内容，比如使用 ::before 或  ::after。

### 伪类和伪元素的区别
1. 伪类其实是弥补了CSS选择器的不足，用来更方便地获取信息。
```html
<ul>
    <li>11111</li>
    <li>22222</li>
</ul>  
```
```css
li:first-child {
    color: red;   
}
// 选择器不能直接选取第一个子元素
// 伪类弥补了选择器的不足
```
2. 而伪元素本质上是创建了一个虚拟容器(元素)，我们可以在其中添加内容或样式

```html
<p>
    HelloWorld
</p>
```
```css
p::first-letter {
  color: red;
}
// 获取元素内容里面的第一个字母并且显示红色
// 伪元素本质上是创建了一个虚拟容器,在里面进行操作
```

3. 伪类是单冒号。伪元素是双冒号

### 伪类个伪元素的几个例子

1. 伪类

: first-child  匹配第一个子元素。

: last-child  匹配最后一个子元素。

: first-of-type  匹配属于其父元素的第一个特定类型的子元素（假如一个div里面有一堆乱七八糟的元素，p:xxx ，就找一对元素里面的第一个p）

: last-of-type

2. 伪元素

::before 在被选元素之前插入内容。需要指定content属性来插入内容。

::after  在被选元素之后插入内容。需要指定content属性来插入内容

::first-letter 匹配元素中文本的首字母。

::first-line 匹配元素中第一行的文本(只能在块元素中使用)。

::selection 用户用鼠标选中的字段显示不同的颜色

## css水平垂直居中的方法

1. 定位方法的水平垂直居中

```html
<div class="box">
    <div class="content">
    </div>
</div>

```
```css
.box {
    background-color: #FF8C00;
    width: 300px;
    height: 300px;
    position: relative;
}
.content {
    background-color: #F00;
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
```

2. flex弹性盒水平垂直居中

```html
<div class="box">
    <div class="content">
    </div>
</div>

```
```css
.box {
   background-color: #FF8C00;
    width: 300px;
    height: 300px;
    display: flex;//flex布局
    justify-content: center;//使子项目水平居中
    align-items: center;//使子项目垂直居中
}
.content {
    background-color: #F00;
    width: 100px;
    height: 100px;
}
```

3. table-cell布局 

因为table-cell相当与表格的td，td为行内元素，无法设置宽和高，所以嵌套一层，嵌套一层必须设置display: 
inline-block;td的背景覆盖了橘黄色，不推荐使用


```html
<div class="box">
    <div class="content">
        <div class="inner">
        </div>
    </div>
</div>
```

```css
.box {
    background-color: #FF8C00;//橘黄色
    width: 300px;
    height: 300px;
    display: table;
}
.content {
    background-color: #F00;//红色
    display: table-cell;
    vertical-align: middle;//使子元素垂直居中
    text-align: center;//使子元素水平居中
}
.inner {
    background-color: #000;//黑色
    display: inline-block;
    width: 20%;
    height: 20%;
}
```

## BFC实现原理

1. **BFC是什么**

在解释 BFC 是什么之前，需要先介绍 Box、Formatting Context的概念。

<font  color=red>Box: CSS布局的基本单位</font>

**Box** 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。让我们看看有哪些盒子：

block-level box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；

inline-level box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；

run-in box: css3 中才有， 这儿先不讲了。

<font  color=red>Formatting context</font>

Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

<font  color=red>BFC 定义</font>

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

**BFC布局规则：** 

内部的Box会在垂直方向，一个接一个地放置。

Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

BFC的区域不会与float box重叠。

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

计算BFC的高度时，浮动元素也参与计算

2. **怎么生成BFC**

根元素

float属性不为none

position为absolute或fixed

display为inline-block, table-cell, table-caption, flex, inline-flex

overflow不为visible

3. **BFC的作用**

（1）防止垂直 margin 重叠

```
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <p>Hehe</p>
</body>
```

两个p之间的距离为100px，发生了margin重叠。其实应该是200px的距离的

**Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠**

我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。

```
<style>
    .wrap {
        overflow: hidden;
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <div class="wrap">
        <p>Hehe</p>
    </div>
</body>
```
(2) 清楚浮动，解决高度塌陷问题

父元素不设置高度，子元素设置高度，。一个父元素里面的子元素设置了float,那么父元素就会塌陷。没有高度。解决办法
就是使用ovelflow:hodden。我们可以触发par生成BFC，那么par在计算高度时，par内部的浮动元素child也会参与计算。

