import Vue from 'vue/dist/vue.esm'
import UserScore from '@/components/tags/UserScore'
import SingleArticle from '@/components/tags/SingleArticle'
export default {
    components: {
        SingleArticle: SingleArticle,
        UserScore: UserScore,
    },
    subClassStore: {},
    getVueSubClass: function (componentName) {
        if (Object.prototype.hasOwnProperty.call(this.components, componentName)) {
            if (!Object.prototype.hasOwnProperty.call(this.subClassStore, componentName)) {
                this.subClassStore[componentName] = Vue.extend(this.components[componentName])
            }
        } else {
            console.error('tagStore.js: 该组件未注册');
        }
        return this.subClassStore[componentName];
    },
    getUserTagsElement: function () {
        let element = document.createElement('user-tags');
        element.setAttribute(':tags', 'user.tags');
        element.setAttribute('v-if', 'state.showTags');
        return element;
    },
    getModifierSwitchElement: function () {
        let element = document.createElement('modifier-switch');
        element.setAttribute('v-on:click.native', 'switchModifier');
        element.setAttribute('v-if', '!simplify || simplifyConfig.func["标记"]');
        return element;
    },
    getTagModifierElement: function () {
        let element = document.createElement('tag-modifier');
        element.setAttribute(':tags', 'user.tags');
        element.setAttribute(':reason-url', 'articleUrl');
        element.setAttribute('v-on:modify', 'modifyTag');
        element.setAttribute('v-if', 'showModifier');
        return element;
    },
    getUserScoreElement: function () {
        let element = document.createElement('user-score');
        element.setAttribute('v-on:click.native', 'switchTags');
        element.setAttribute(':user', 'user');
        return element;
    },
}