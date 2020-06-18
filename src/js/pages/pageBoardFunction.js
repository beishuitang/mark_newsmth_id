import { splitName, relayTableAll } from '../commonUtils'
export default function () {
    let bodyEl = document.getElementById('body');
    let tableEl = bodyEl.querySelector('table');
    let userEls = document.querySelectorAll('#body table .title_12');
    splitName(userEls);
    relayTableAll(tableEl, [[3, 2]], [0, 2, 4, 5, 6, 7, 8]);
}