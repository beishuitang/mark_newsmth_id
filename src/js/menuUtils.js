import Vue from "vue/dist/vue.esm";
import Menu from '@/components/Menu';
import { addTransition } from './commonUtils'
import config from "../config/config";
export default {
    init: function () {
        let menu = document.querySelector('#menu')
        menu.setAttribute('v-show', 'menuConfig.showMenu');
        let left_adv = menu.querySelector('#left_adv');
        if (left_adv != null) {
            left_adv.remove();
        }
        addTransition(menu, 'slide-left');
        let m = Vue.extend(Menu);
        new m({
            el: menu.parentNode,
            propsData: { menuConfig: config.menuConfig }
        });
    }
}
