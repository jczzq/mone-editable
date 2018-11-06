import KEditable from './components/KEditable';
import '@/assets/fonts/iconfont.js';
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
