import config from '../../config/config'
import mainData from '../mainData'
import { splitName, relayTableAll } from '../commonUtils'
export default function () {
    let bodyEl = document.getElementById('body');
    let tableEl = bodyEl.querySelector('table');
    let userEls = document.querySelectorAll('#body table .title_12');
    if (config.onMobile && tableEl != null) {
        splitName(userEls);
        relayTableAll(tableEl, [[3, 2]], [0, 2, 4, 5, 6, 7, 8]);
        // splitTableAll(tableEl, [[1, 8]], [0, 4, 5, 6, 8]);
        // userEls.forEach((el) => {
        // el.style.width = '8rem';
        // el.style['text-align'] = 'center';
        // })
    }
    let topicTrs = document.querySelectorAll('.board-list>tbody>tr');
    // let topicTrs = document.querySelectorAll('.board-list .title_9>a');
    mainData.topicLinks.splice(0, mainData.topicLinks.length);
    for (let index = 0; index < topicTrs.length; index++) {
        let topicEl = topicTrs[index].querySelector('.title_9>a');
        let a_href = topicEl.href;
        let pos_el = topicTrs[index].querySelectorAll('.middle')[2];
        let pos = parseInt(pos_el.innerHTML);
        let m1 = a_href.match(mainData.articleReg);
        mainData.getTopicInfo(m1[1], (err, inputInfo) => {
            let info = inputInfo ? inputInfo : { p: 1, pos: -1 };
            if (pos > info.pos) {
                mainData.topicLinks.push(a_href += `?p=${info.p}`);
            } else {
                topicEl.style.color = 'currentcolor'
            }
        })
    }
}