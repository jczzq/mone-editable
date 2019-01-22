import Vue from 'vue';
import App from './App';

// 查看build
// import 'vue-editable/dist/vue-editable.css';
// import KE from 'vue-editable';

// or
// 查看实时
import KE from '@';

Vue.use(KE);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
