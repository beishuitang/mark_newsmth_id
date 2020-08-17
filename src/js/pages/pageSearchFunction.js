import config from '../../config/config'
import mainData from '../mainData'
import { splitName, relayTableAll } from '../commonUtils'
import browserUtil from '../browseUtil'
export default function () {
    let sReg = /nForum\/#!s\/(\w+)\?/
    let m = mainData.currentPageHref.match(sReg);
    if (m[1] == 'article') {
        let bodyEl = document.getElementById('body');
        let tableEl = bodyEl.querySelector('table');
        let userEls = document.querySelectorAll('#body table .title_12');
        if (config.onMobile && tableEl != null) {
            splitName(userEls);
            relayTableAll(tableEl, [[4, 3]], [0, 1, 3, 5, 6, 7]);
        }
        let topicTrs = document.querySelectorAll('.board-list>tbody>tr');
        mainData.topicLinks.splice(0, mainData.topicLinks.length);
        for (let index = 0; index < topicTrs.length; index++) {
            let topic_el = topicTrs[index].querySelector('.title_9>a');
            let pos_el = topicTrs[index].querySelectorAll('.middle')[0];
            let pos = parseInt(pos_el.innerHTML);
            browserUtil.addVisitedLinkStyle(topic_el, pos)
        }
    }
}