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
        document.querySelector('.board-list>thead>tr>.middle').innerText = '[评分/like数]主题(已读/全部)';
        mainData.topicLinks.splice(0, mainData.topicLinks.length);
        for (let index = 0; index < topicTrs.length; index++) {
            let topic_el = topicTrs[index].querySelector('.title_9>a');
            let middle_els = topicTrs[index].querySelectorAll('.middle');
            let score = middle_els[0].innerHTML;
            let like = middle_els[1].innerHTML;
            let pos = middle_els[2].innerHTML;
            let topic_p1 = document.createElement('a');
            topic_p1.href = topic_el.href;
            topic_p1.innerHTML = `[${score}${score + like == '' ? ' ' : '/'}${like}]`;
            topic_el.parentNode.insertBefore(topic_p1, topic_el);
            browserUtil.addVisitedLinkStyle(topic_el, parseInt(pos))
        }
    }
}