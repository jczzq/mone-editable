import Vue from 'vue';

import KEditable from './components/KEditable';
import '@/assets/fonts/iconfont.js';

import KIcon from './components/KIcon';
Vue.component('k-icon', KIcon);

KEditable.install = function(Vue) {
    Vue.config.keyCodes = {
        up: [38],
        down: [40],
        left: [37],
        right: [39]
    };
    Vue.component(KEditable.name, KEditable);
};
export default KEditable;
