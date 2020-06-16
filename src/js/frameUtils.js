import Vue from 'vue/dist/vue.esm';
import config from "../config/config";
import { mut } from "./commonUtils";
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
    keepBodyWidth: function () {
        let body = document.querySelector("body");
        body.style.width = 'auto';
        mut(body, {
            attributes: true,
            childList: false,
            subtree: false
        }, function () {
            if (body.style.width != 'auto') {
                body.style.width = 'auto';
            }
        })
    },
    loadCss: function () {
        this.addId();
        this.addMeta();
        this.loadFontSize();
        this.keepBodyWidth();
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
    // init_frame_parts: function () {
    //     storage_data.frame_parts.forEach((part) => {
    //         switch_part_state(part);
    //     });
    // },
    initDom: function () {
        new (Vue.extend(TopHead))({ el: '#top_head' });
        new (Vue.extend(BotFoot))({ el: '#bot_foot' });
        this.copyNav();
        // TODO
        // this.init_frame_parts();
    }
}
