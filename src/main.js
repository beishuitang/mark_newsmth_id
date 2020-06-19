import frameUtils from './js/frameUtils';
import menuUtils from './js/menuUtils';
import eventUtils from './js/eventUtil'
import { mut } from './js/commonUtils'
import mainData from './js/mainData'
import pageDispatcher from './js/pageDispatcher'
// Vue.config.productionTip = false
// import test from './test'

// new Vue({
//   render: function (h) { return h(App) },
// }).$mount('#app')

frameUtils.loadCss();
frameUtils.initDom();
menuUtils.init();
mainData.init();
eventUtils.preventDblclickDefault();
window.addEventListener('hashchange', () => {
    mainData.onhashchange();
});
let bodyElement = document.querySelector('#body');
if (bodyElement.firstChild != null) {
    console.log('读取缓存')
    pageDispatcher.dispatch();
}

let mutConfig = {
    attributes: false,
    childList: true,
    subtree: false
};
mut(bodyElement, mutConfig, function () {
    console.log('on mut')
    pageDispatcher.dispatch();
})


// test.init();