import Vue from 'vue/dist/vue.esm'
import config from "../config/config";
import Setting from '../components/Setting'
export default {
    init: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(Setting))({
            el: div,
            propsData: {
                config: config
            }
        })
    },
}