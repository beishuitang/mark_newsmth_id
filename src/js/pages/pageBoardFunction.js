import config from '../../config/config'
import mainData from '../mainData'
import { splitName, relayTableAll } from '../commonUtils'
import browserUtil from '../browseUtil'
export default function () {
    let bodyEl = document.getElementById('body');
    let tableEl = bodyEl.querySelector('table');
    let userEls = document.querySelectorAll('#body table .title_12');
    let topicTrs = document.querySelectorAll('.board-list>tbody>tr');
    if (topicTrs.length == 1) {
        let i = sessionStorage.getItem('iReload');
        i = i ? parseInt(i) : 0;
        if (i < 5) {
            sessionStorage.setItem('iReload', i + 1);
            setTimeout(() => {
                window.location.reload(true);
            }, 500);
        }
    } else {
        sessionStorage.setItem('iReload', 0);
        if (config.onMobile && tableEl != null) {
            splitName(userEls);
            relayTableAll(tableEl, [[3, 2]], [0, 2, 4, 5, 6, 7, 8]);
        }
        mainData.topicLinks.splice(0, mainData.topicLinks.length);
        for (let index = 0; index < topicTrs.length; index++) {
            let topic_el = topicTrs[index].querySelector('.title_9>a');
            let pos_el = topicTrs[index].querySelectorAll('.middle')[2];
            let pos = parseInt(pos_el.innerHTML);
            browserUtil.addVisitedLinkStyle(topic_el, pos)
        }
    }
}