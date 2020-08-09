// import localforage from 'localforage'
import Vue from 'vue/dist/vue.esm'
import config from '../config/config'
import mainData from '../js/mainData'
// import Backup from '../components/Backup'
import Panel from '../components/tags/Panel'
export default {
    init: function () {
        console.log('test')
        config.init();
        mainData.init();
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(Panel))({
            el: div,
            propsData: {
                usersData: mainData.usersData,
                panelConfig: config.panelConfig
            }
        })

        let add = document.createElement('button');
        add.innerText = 'add'
        document.querySelector('body').appendChild(add);
        add.onclick = function () {
            let json = {
                "url3": {
                    "id": "jack", "tags": {
                        "sb": { "score": -5 },
                        "sb3": { "score": 5 }
                    },
                    "p": "p2",
                    "m": new Date().getTime()
                },
                "url4": {
                    "id": "jacek",
                    "tags": {
                        "sb": { "score": -1 },
                        "nb": { "score": 1 }
                    },
                    "p": "p2",
                    "m": new Date().getTime()
                }
            }
            mainData.mergeMarks(json)
        }
        let clear = document.createElement('button');
        clear.innerText = 'clear'
        document.querySelector('body').appendChild(clear);
        clear.onclick = function () {
            localStorage.clear();
            mainData.markStore.clear();
        }
    }
}