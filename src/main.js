import '@/es6-polyfill';
import Vue from 'vue';
import App from './App';
import KEditable from './KEditable';
Vue.config.productionTip = false;
Vue.use(KEditable);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
