// import Vue from 'vue/dist/vue.esm'
// import App from './App.vue'
import frameUtils from './js/frameUtils';
import menuUtils from './js/menuUtils';
// import { mut } from './js/commonUtils'
import { sessionData, storageData, forageData } from './js/mainData'
// import pageUtils from './js/pageUtils';
// import tagStore from './js/tagStore'
import test from './test';
// Vue.config.productionTip = false

// new Vue({
//   render: function (h) { return h(App) },
// }).$mount('#app')

location.pathname = '/nForum/'
location.hash = '#!article/Reader/697241';
frameUtils.loadCss();
frameUtils.initDom();
menuUtils.init();
sessionData.init();
storageData.init();
forageData.init();
// pageUtils.init();
// tagStore.init();
// window.addEventListener('hashchange', () => {
//     sessionData.onhashchange();
//     forageData.onhashchange();
// });
// let body = document.querySelector('#body');
// let mutConfig = {
//     attributes: false,
//     childList: true,
//     subtree: false
// };
// mut(body, mutConfig, function () {
//     pageUtils.onMut();
// })


test.test();