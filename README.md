# mone-editable

基于 vue 的可编辑表格插件
![效果展示](assets/show.png)

## 特性

`mone-editable`支持的表单类型有：

- `KCheckBox` 单选框，类似于 input type="radio"
- `KNumber` 数字框，类似于 input type="number"
- `KSelect` 下拉框，类似于 select
- `KQuery` 搜索框，自定义表单类型，常用于异步关联查询
- `KText` 文本框，类似于 input type="text"

简约的样式风格

## 使用

#### 安装组件

```bash
npm i mone-editable -S
```

#### 引入和使用

[`index.js`](https://github.com/jczzq/mone-editable/blob/master/example/index.js)

```
import Vue from 'vue';
import App from './App';

// 全局引入
import 'mone-editable/dist/mone-editable.css';
import me from 'mone-editable';
Vue.use(me);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
```

[`App.vue`](https://github.com/jczzq/mone-editable/blob/master/example/App.vue)

```
<template>
  <div class="app">
    <h3 class="text-center">mone-editable</h3>
    <!-- 可编辑表格 -->
    <k-editable :config="config"
      :data-list="rows"
      @add-row="addNewRow"
      @del-row="delRow"></k-editable>

  </div>
</template>
...
```

通过`config`参数配置整个 editable 的主结构，
通过`data-list`参数展示列表数据，数据的编辑改动直接影响到该引用参数

## 目录

- assets 文档以及项目相关资源
- example 示例程序开发目录
- lib 压缩打包后的正式文件
- src 插件源码

## 开发

```bash
# 安装依赖
npm install

# 查看项目 http://localhost:8080
npm run dev
```

开发时会启动`example`目录的示例程序

## 构建

```bash
# 构建正式文件到 lib 目录
npm run build

# 查看webpack构建分析
npm run build --report
```

## 贡献人员

[jczzq](https://github.com/jczzq)
