import Vue from 'vue/dist/vue.esm'
import QuickBrowse from '../components/QuickBrowse'
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
    },
    addVisitedLinkStyle: function (a_el, pos) {
        pos = pos ? pos : 0;
        let a_href = a_el.href;
        let m = a_href.match(mainData.articleReg);
        if (!m) {
            return;
        }
        mainData.getTopicInfo(m[1], (err, info) => {
            if (!info) {
                return;
            }
            if (info.p != 1) {
                a_href += `?p=${info.p}`;
            }
            a_el.href = a_href;
            let href = a_href.replace('nForum/', 'nForum/#!')
            mainData.pageYOffsetData[href] = info.pageYOffset;
            mainData.topicTimestamp[m[1]] = info.t;
            if (pos > info.pos) {
                mainData.topicLinks.push(a_href);
                if (info.pos !== -1) {
                    a_el.style['font-style'] = 'italic';
                }
            } else {
                a_el.style.color = 'currentcolor'
            }
        })
    },
    readTimestamp: function (articleElement) {
        let m = mainData.currentPageHref.match(mainData.articleReg);
        if (!m) {
            return;
        }
        let p_el = articleElement.querySelector('.a-body .a-content>p');
        let p_timeStr = p_el.childNodes[4].data;
        let timeStr = p_timeStr.match(/\((.+)\)/)[1];
        let timestamp = new Date(timeStr).getTime()
        articleElement.setAttribute('article_timestamp', timestamp)
        let t0 = mainData.topicTimestamp[m[1]]
        t0 = t0 ? t0 : 0;
        if (timestamp <= t0) {
            articleElement.classList.add('readed')
        } else {
            mainData.topicTimestamp[m[1]] = timestamp;
        }
    }
}