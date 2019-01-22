import Vue from 'vue';
import App from './App';

import KE from '@';
Vue.use(KE);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});
