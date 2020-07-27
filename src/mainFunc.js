import config from './config/config'
import frameUtils from './js/frameUtils';
import menuUtils from './js/menuUtils';
import eventUtils from './js/eventUtil'
import { mut, removeAd } from './js/commonUtils'
import mainData from './js/mainData'
import pageDispatcher from './js/pageDispatcher'
import browseUtil from './js/browseUtil'
import settingUtil from './js/settingUtil'

export default function () {
    config.init();
    mainData.init();
    settingUtil.init();
    if (config.onMobile) {
        frameUtils.loadCss();
        frameUtils.initDom();
        menuUtils.init();
        eventUtils.preventDblclickDefault();
        browseUtil.init();
        eventUtils.initAction();
    }
    window.addEventListener('hashchange', () => {
        mainData.onhashchange();
    });
    function actionOnMut() {
        mainData.onMut();
        pageDispatcher.dispatch();
        if (config.onMobile) {
            removeAd();
            frameUtils.onMut();
            menuUtils.onMut();
        }
        window.scroll(0, mainData.pageYOffsetData[mainData.currentPageHash]);
    }
    let bodyElement = document.querySelector('#body');
    if (bodyElement.firstChild != null) {
        console.log('读取缓存')
        actionOnMut();
    }

    let mutConfig = {
        attributes: false,
        childList: true,
        subtree: false
    };
    mut(bodyElement, mutConfig, function () {
        console.log('on mut')
        actionOnMut();
    })
}