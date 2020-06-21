import Vue from "vue/dist/vue.esm";
import Menu from '@/components/Menu';
import config from "../config/config";
export default {
    init: function () {
        let menu = document.querySelector('#menu')
        let left_adv = menu.querySelector('#left_adv');
        if (left_adv != null) {
            left_adv.remove();
        }
        let m = Vue.extend(Menu);
        let newMenu = document.createElement('menu');
        document.querySelector('body').insertBefore(newMenu, menu);
        new m({
            el: newMenu,
            propsData: { menuConfig: config.menuConfig }
        });

        newMenu = document.querySelector('#menu');
        let length = menu.children.length;
        for (let index = 0; index < length; index++) {
            newMenu.appendChild(menu.firstChild);
        }
        menu.remove();
    }
}
