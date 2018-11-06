import Vue from 'vue';
import App from './App';
import KEditable from 'vue-editable';
Vue.use(KEditable);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
