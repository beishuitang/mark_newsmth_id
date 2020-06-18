import frameUtils from './js/frameUtils';
import menuUtils from './js/menuUtils';
import eventUtils from './js/eventUtil'
import { mut } from './js/commonUtils'
import { sessionData, storageData, forageData } from './js/mainData'
import pageDispatcher from './js/pageDispatcher'
// Vue.config.productionTip = false

// new Vue({
//   render: function (h) { return h(App) },
// }).$mount('#app')

frameUtils.loadCss();
frameUtils.initDom();
menuUtils.init();
sessionData.init();
storageData.init();
forageData.init();
eventUtils.preventDblclickDefault();
window.addEventListener('hashchange', () => {
    sessionData.onhashchange();
});
let bodyElement = document.querySelector('#body');
if (bodyElement.firstChild != null) {
    pageDispatcher.dispatch();
}

let mutConfig = {
    attributes: false,
    childList: true,
    subtree: false
};
mut(bodyElement, mutConfig, function () {
    pageDispatcher.dispatch();
})


// test.test();