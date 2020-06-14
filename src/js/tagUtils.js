export default {
    getUserTagsElement: function () {
        let element = document.createElement('user-tags');
        element.setAttribute(':tags', 'user.tags');
        return element;
    },
    getModifierSwitchElement: function () {
        let element = document.createElement('modifier-switch');
        element.setAttribute('v-on:click.native', 'switch-modifier');
        return element;
    },
    getTagModifierElement: function () {
        let element = document.createElement('tag-modifier');
        element.setAttribute(':tags', 'user.tags');
        element.setAttribute(':reason-url', 'articleUrl');
        // element.setAttribute('v-on:modify', 'tagModify');
        element.setAttribute('v-if', 'showModifier');
        return element;
    },
    getUserScoreElement: function () {
        let element = document.createElement('user-score');
        element.setAttribute(':user', 'user');
        return element;
    },
}