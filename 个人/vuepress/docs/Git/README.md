# GIT

## 克隆远程仓库
git协议是SSH协议，大部分克隆可以使用这种协议
https协议是口令协议，是针对只开发了https协议的网络
```
$ git clone git@github.com:xxx/xxx
$ git clone https://github.com/xxx/xxx
```
https 协议每次下拉代码都需要输入账号密码，很费劲。所以最好使用ssh协议，但是
使用ssh协议需要配置公钥。

win下找公钥的方法

[win](https://blog.csdn.net/qq_17524035/article/details/70762162)

mac下找公钥的方法

```js
1. 打开命令台
2. .ssh
3. ls -l 查看
4. cat id_rsa.pub  打开公钥
```


## 第一次推送内容到master分支
-u参数不仅把本地master分支的内容推送到远程仓库的master分支上，而且和远程仓库相关联起来
随后的远程推送内容，只需要$ git push origin master命令即可
```
$ git push -u origin master
```
## 创建分支
```
$ git branch xxx
```
## 切换分支
```
$ git checkout xxx
```
## 创建并切换分支的简写
```
$ git checkout -b xxx
```
## 查看所有分支

带*号的表示当前分支
```
$ git branch
```
## 查看当前分支修改地方

```
会显示你修改了什么文件。删除了什么文件。增加了什么文件
$ git status
```
## 合并分支
```
假设你开发的dev分支完成任务了，需要把你的分支合并到主分支上，步骤：
1.$ git checkout master
2.$ git merge dev
同理，A合并B，就主动切换到A分支，A merge B

```
## 删除分支
```
$ git branch -d xxx
```
## 解决冲突
```
当合并分支出现冲突时，可以利用git status查看冲突的位置
命令台会显示

推荐使用vs code开发编辑器 ，会把冲突显示在代码上。你选择保留以前的，还是最新的。
选择完以后  git add .  git commit -m  git push
```


## 临时接到任务切换分支
在自己的分支工作做一半，突然接到一个任务bug，需要切换到其他分支工作，该怎样进行合理的git操作
```
git stash命令隐藏当前工作区
git checkout -b xx命令创建并切换到bug分支
git add xx git commit -m xx修复提交bug分支
git checkout master切换到主分支
git merge xxx合并bug分支到主分支
git branch -d xx删除bug分支
git checkout self切换到自己的任务分支
git stash pop恢复隐藏的工作现成
```
## Feature分支
开发一个新功能mask1，但不保证后续这个新功能需不需要。

git checkout -b mask1创建mask1分支
git add xx git commit -m xxx开发完毕并提交到当前mask1分支上
上级通知，此功能砍掉，不需要了

git checkout dev切换到开发分支

git branch -D mask1删除mask1分支的内容

-d小写的参数d，再删除时会被提示，改分支没有合并，无法删除
-D大写的参数D，代表强制删除

## 远程新建了一个分支，本地要创建一个分支，马上就用，咋办？

git remote        # 列出所有远程主机

git remote update origin --prune   # 更新远程主机origin 整理分支

git branch -r      # 列出远程分支

git branch -vv     # 查看本地分支和远程分支对应关系

git checkout -b gpf origin/gpf   新建本地分支gpf与远程gpf分支相关联  （本地就不要再新建分支名字了）

