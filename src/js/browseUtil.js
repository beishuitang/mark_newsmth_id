import Vue from 'vue/dist/vue.esm'
import QuickBrowse from '../components/QuickBrowse'
import mainData from './mainData'
export default {
    init: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        let qb = Vue.extend(QuickBrowse);
        new qb({
            el: div,
            propsData: {
                mainData: mainData
            }
        })
    }
}