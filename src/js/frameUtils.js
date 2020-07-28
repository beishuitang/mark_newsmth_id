import Vue from 'vue/dist/vue.esm';
import config from "../config/config";
import TopHead from '../components/TopHead';
import BotFoot from '../components/BotFoot';
export default {
    addId: function () {
        document.getElementsByTagName('body')[0].setAttribute('id', "html_body")
        document.getElementsByTagName('html')[0].setAttribute('id', "html")
    },
    addMeta: function () {
        let metaEl = document.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width, initial-scale=1.0')
        document.getElementsByTagName('head')[0].appendChild(metaEl);
    },
    loadFontSize: function () {
        let fontSize = localStorage.getItem(config.storageKeys.STORAGE_FONT_SIZE);
        if (fontSize != null) {
            document.querySelector("html").style.fontSize = fontSize;
        }
    },
    loadCss: function () {
        this.addId();
        this.addMeta();
        this.loadFontSize();
    },
    getGobackEl: function () {
        let a = document.createElement('a');
        a.innerHTML = '&nbsp;&nbsp;>>>>&nbsp;&nbsp;返回顶部 '
        a.onclick = function () {
            window.scroll(0, 0);
        };
        return a;
    },
    copyNav: function () {
        let nav = document.querySelector('#notice').cloneNode(true);
        document.querySelector('#main').appendChild(nav);
    },
    copyNavContent: function () {
        let notice = document.querySelectorAll("#notice");
        notice[1].innerHTML = notice[0].innerHTML;
        notice[1].firstChild.appendChild(this.getGobackEl());
    },
    onMut: function () {
        this.copyNavContent();
    },
    // init_frame_parts: function () {
    //     storage_data.frame_parts.forEach((part) => {
    //         switch_part_state(part);
    //     });
    // },
    initDom: function () {
        document.querySelector('#top_head').setAttribute('v-show', 'frameConfig.showHead');
        new (Vue.extend(TopHead))({
            el: '#top_head',
            propsData: { frameConfig: config.frameConfig }
        });
        let backup = document.createElement('backup');
        document.querySelector('#bot_info').appendChild(backup);
        document.querySelector('#bot_foot').setAttribute('v-show', 'frameConfig.showFoot');
        new (Vue.extend(BotFoot))({
            el: '#bot_foot',
            propsData: { frameConfig: config.frameConfig }
        });

        // let span = document.createElement('span');
        // span.setAttribute('id', 'backup')
        // document.querySelector('#bot_info').appendChild(span);
        // new (Vue.extend(Backup))({ el: '#backup' });
        this.copyNav();
        // TODO
        // this.init_frame_parts();
    }
}
