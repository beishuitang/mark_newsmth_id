import Vue from "vue/dist/vue.esm";
import Menu from '@/components/Menu';
export default {
    init: function () {
        let menu = document.querySelector('#menu')
        menu.setAttribute('v-show', 'showMenu');
        let left_adv = menu.querySelector('#left_adv');
        if (left_adv != null) {
            left_adv.remove();
        }
        let m = Vue.extend(Menu);
        new m().$mount(menu);
    }
}
