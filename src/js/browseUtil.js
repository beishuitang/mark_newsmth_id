import Vue from 'vue/dist/vue.esm'
import QuickBrowse from '../components/QuickBrowse'
import eventUtil from './eventUtil'
import mainData from './mainData'
export default {
    browseButton: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        let qb = Vue.extend(QuickBrowse);
        new qb({
            el: div,
            propsData: {
                mainData: mainData
            }
        })
    },
    init: function () {
        eventUtil.bottomUpCallback = function () {
            if (mainData.mainHash != 'article') {
                return;
            }
            let currentPageEl = document.querySelector(".page-select");
            let nextPageEl = currentPageEl.nextElementSibling;
            if (nextPageEl != null) {
                nextPageEl.querySelector("a").click();
            } else {
                // let el = currentPageEl.querySelector("a");
                let el = document.createElement('a');
                el.href = mainData.linksBeforeTopic[0];
                el.click();
            }

        }
    }
}