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
