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
    },
    addVisitedLinkStyle: function (a_el, pos, a_wrapper) {
        console.log(a_wrapper)
        let a_href = a_el.href;
        let m1 = a_href.match(mainData.articleReg);
        mainData.getTopicInfo(m1[1], (err, inputInfo) => {
            let info = inputInfo ? inputInfo : { p: 1, pos: -1 };
            a_href += `?p=${info.p}`;
            a_el.href = a_href;
            if (pos > info.pos) {
                mainData.topicLinks.push(a_href);
                if (info.pos !== -1) {
                    a_el.style['font-style'] = 'italic';
                }
            } else {
                a_el.style.color = 'currentcolor'
            }
        })

    }
}