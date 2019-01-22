import '@/assets/fonts/iconfont.js';
import KEditable from './components/KEditable';
import KIcon from './components/KIcon';
import knife from './knife';

const install = function(Vue, option = {}) {
  if (install.installed) return;

  Vue.prototype.$knife = knife;
  Vue.config.keyCodes = {
    up: [38],
    down: [40],
    left: [37],
    right: [39]
  };
  Vue.component('k-icon', KIcon);
  Vue.component(KEditable.name, KEditable);
  if (option.zIndex) knife.zIndex;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
