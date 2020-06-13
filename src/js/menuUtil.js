import Vue from "vue/dist/vue.esm";
import Menu from '@/components/Menu';
export default {
    init: function () {
        let menu = document.querySelector('#menu')
        menu.setAttribute('v-show', 'showMenu');
        menu.querySelector('#left_adv').remove();
        let m = Vue.extend(Menu);
        new m().$mount(menu);
    }
}
