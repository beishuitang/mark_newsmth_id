import Vue from 'vue/dist/vue.esm'
import config from "../config/config";
import Panel from '../components/tags/Panel'
import mainData from './mainData'
export default {
    init: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(Panel))({
            el: div,
            propsData: {
                usersData: mainData.usersData,
                panelConfig: config.panelConfig
            }
        })
    },
}