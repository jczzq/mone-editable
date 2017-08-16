import Vue from 'vue';
import App from './App';

import KIcon from '@/components/KIcon';
Vue.component('k-icon', KIcon);

Vue.config.productionTip = false;
Vue.config.keyCodes = {
    up: [38],
    down: [40],
    left: [37],
    right: [39]
};
import '@/assets/fonts/iconfont.js';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
