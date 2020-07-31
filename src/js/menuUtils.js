import Vue from "vue/dist/vue.esm";
import Menu from '@/components/Menu';
import config from "../config/config";
import { mut } from './commonUtils'
export default {
    init: function () {
        let menu = document.querySelector('#menu')

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
        // this.onMenuMut();
        mut(newMenu, { attributes: true, childList: false, subtree: false }, () => {
            this.onMenuMut();
        });
    },
    onMut: function () {
        config.menuConfig.showMenu = false;
    },
    onMenuMut: function () {
        this.savePassword();
        this.addSettingMenu();
    },
    addSettingMenu: function () {
        if (document.querySelector('#menu_setting') != null) {
            return;
        }
        let ul = document.querySelector('#menu #xlist>ul');
        let li = ul.querySelector('li').cloneNode(true);
        li.setAttribute('id', 'menu_setting');
        li.querySelector('ul').remove();
        li.querySelector('.toggler').style = 'background-position:-255px -20px';
        li.querySelector('a').innerText = '设置选项';
        li.onclick = function () {
            config.settingConfig.show = !config.settingConfig.show;
            config.menuConfig.showMenu = false;
        }
        ul.appendChild(li);
    },
    savePassword: function () {
        let ifAutoFillPassword = config.menuConfig.autoFillPassword;
        let u_id = document.querySelector('#u_login_id');
        let u_passwd = document.querySelector('#u_login_passwd');
        let u_login_submit = document.querySelector('#u_login_submit');
        let storageIdKey = config.storageKeys.STORAGE_ID;
        let storagePasswdKey = config.storageKeys.STORAGE_PASSWORD;
        if (!ifAutoFillPassword) {
            localStorage.setItem(storagePasswdKey, '');
            localStorage.setItem(storageIdKey, '');
        }
        if (ifAutoFillPassword && u_id != null && u_passwd != null && !u_id.getAttribute('watched')) {
            u_id.setAttribute('watched', true);
            u_id.value = localStorage.getItem(storageIdKey);
            u_passwd.value = localStorage.getItem(storagePasswdKey);
            u_login_submit.addEventListener('click', function () {
                localStorage.setItem(storagePasswdKey, u_passwd.value);
                localStorage.setItem(storageIdKey, u_id.value);
            })
        }
    },
}
