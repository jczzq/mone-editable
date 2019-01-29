import Vue from 'vue';
import App from './App';

// 查看build
// import 'mone-editable/dist/mone-editable.css';
// import KE from 'mone-editable';

// or
// 查看实时
import KE from '@';

Vue.use(KE);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
