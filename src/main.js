// import Vue from 'vue/dist/vue.esm'
// import App from './App.vue'
import frameUtil from '@/js/frameUtil';
import menuUtil from '@/js/menuUtil';
// Vue.config.productionTip = false

// new Vue({
//   render: function (h) { return h(App) },
// }).$mount('#app')

frameUtil.loadCss();
frameUtil.initDom();
menuUtil.init();