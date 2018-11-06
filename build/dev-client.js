/* eslint-disable */
// 引入eventsource-polyfill模块
// 通常polyfill来填平旧浏览器一些事件支持上的缺陷
require('eventsource-polyfill')
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

// 监听dev-server.js中webpack-hot-middleware发布的事件，当event.action为reload的时候重新刷新页面
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
