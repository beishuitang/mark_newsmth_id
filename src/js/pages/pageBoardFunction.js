import config from '../../config/config'
import { splitName, relayTableAll } from '../commonUtils'
export default function () {
    let bodyEl = document.getElementById('body');
    let tableEl = bodyEl.querySelector('table');
    let userEls = document.querySelectorAll('#body table .title_12');
    if (config.onMobile && tableEl != null) {
        splitName(userEls);
        relayTableAll(tableEl, [[3, 2]], [0, 2, 4, 5, 6, 7, 8]);
        // splitTableAll(tableEl, [[1, 8]], [0, 4, 5, 6, 8]);
        userEls.forEach((el) => {
            el.style = 'width:8rem;text-align:center';
        })
    }
}