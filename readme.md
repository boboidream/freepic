# freepic

![freePic](http://7xsmek.com1.z0.glb.clouddn.com/github/freepic.gif)

## 说明
[![Support Node of LTS](https://img.shields.io/badge/node-LTS-brightgreen.svg)](https://nodejs.org/)
[![npm version](https://img.shields.io/badge/npm-v0.03-orange.svg)](https://www.npmjs.com/package/freepic)

轻松获取美图。

## 安装

- 安装项目

    ```
    sudo npm install freepic -g
    ```

    > 如果国内速度太慢，可以设置淘宝 npm 源，命令行执行  
    > `npm config set registry https://registry.npm.taobao.org`

## 使用

- 打开命令行，执行

    ```bash
    freepic # 随机获取一张美图
    ```

## 高级用法

1. 获取指定宽度或高度，等比例缩放的图片，例如：

    ```bash
    freepic -w 1080 # 获得 宽度为 1080 等比例缩放的图片
    freepic -h 900 # 获得 高度为 900 等比例缩放的图片
    ```

2. 同时指定图片宽高，获得裁切后的图片，例如
    ```bash
    freepic -w 1080 -h 900
    ```

3. 指定保存到桌面
    ```bash
    freepic -d
    ```

## 参数说明

- 命令行执行：`freepic --help` 查看参数详情

  ```bash
    Usage: freepic [options]

    Options:

          --help            output usage information
      -V, --version         output the version number
      -w, --width  <lang>   picture width
      -h, --height <lang>   picture height
      -a, --about  <lang>   keyword: nature,water
      -d, --desktop         save picture to Desktop

    Examples:

      $ freepic
      $ freepic -w 1600 -h 1200 -d
      $ freepic -a nature
  ```

## 感谢

- [Unsplash](https://unsplash.com)
- [StockSnap](https://stocksnap.io/)

## 最后

如果喜欢这个项目，别忘点 ⭐ 支持一下哦！ [freePic](https://github.com/boboidream/freepic)

有问题，可以点击反馈：[问题反馈](https://github.com/boboidream/freepic/issues)
