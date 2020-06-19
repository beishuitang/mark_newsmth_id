import Vue from 'vue/dist/vue.esm'
import config from '../config/config'
import localforage from "localforage"

export default {
    // session data
    pageYOffsetData: {},
    prePage: location.hash,
    currentPage: location.hash,
    mainHash: '',
    mainpagePart: {},
    picturesXOffset: 0,
    reg: /#!(\w+)(\/|$)/,

    // storage data
    modifyTime: '0',
    usersData: {},
    simplifyConfig: {
        'a-u-sex': true,
        'ico-pos-reply': true,
        'ico-pos-template': false,
        'a-func-forward': false,
        'a-func-docross': false,
        'a-addfavor': false,
        'ico-pos-search': false,
        'ico-pos-user': false,
        'a-pos': true,
        'ico-pos-edit': true
    },
    // forageData
    modifyBuffer: {},
    // http://www.newsmth.net/nForum/#!article/Occupier/1575679?p=10
    // reg: /(article\/[\w|.]+\/\d+)(\?p=(\d+))?/,

    init: function () {
        // sessionData
        let m = location.hash.match(this.reg);
        this.mainHash = m[1];

        // storageData
        let usersData = localStorage.getItem(config.storageKeys.STORAGE_USERS_DATA);
        if (usersData != null) {
            this.usersData = JSON.parse(usersData);
        }
        Object.values(this.usersData).forEach((user) => {
            this.reComputeScore(user);
        })
        let simplifyConfig = localStorage.getItem(config.storageKeys.STORAGE_SIMPLIFY_CONFIG);
        if (simplifyConfig != null) {
            this.simplifyConfig = JSON.parse(simplifyConfig);
        }
        // TODO
        Vue.$simplifyConfig = this.simplifyConfig;
        // 每天只添加一次
        let modifyTimeFromStorage = localStorage.getItem(config.storageKeys.STORAGE_MODIFY_TIME);
        if (modifyTimeFromStorage != null && (new Date() - new Date(parseInt(modifyTimeFromStorage))) < 24 * 60 * 60 * 1000) {
            this.modifyTime = modifyTimeFromStorage;
        } else {
            this.modifyTime = new Date().getTime().toString();
            localStorage.setItem(config.storageKeys.STORAGE_MODIFY_TIME, this.modifyTime);
        }

        // forageData
        this.article = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "article" });
        this.modify = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "modify" });
        this.modify.getItem(this.modifyTime).then((value) => {
            this.modifyBuffer = value ? value : {}
        })

    },
    onhashchange: function () {
        if (this.mainHash === 'mainpage') {
            let container = document.querySelector('#pictures>div>ul');
            this.picturesXOffset = container.scrollLeft;
        }
        this.mainHash = location.hash.match(this.reg)[1];
        this.prePage = this.currentPage;
        this.currentPage = location.hash.replace(/\?p=1$/, '');
        this.pageYOffsetData[this.prePage] = window.pageYOffset;
    },

    save: function () {
        localStorage.setItem(config.storageKeys.STORAGE_USERS_DATA, JSON.stringify(this.usersData));
        this.modify.setItem(this.modifyTime, this.modifyBuffer);
    },
    getEmptyUser: function () {
        return {
            score: 0,
            state: {
                showUser: true,
                showContent: true,
                showTags: true,
            },
            tags: {}
        }
    },
    checkUser: function (userId) {
        if (!Object.prototype.hasOwnProperty.call(this.usersData, userId)) {
            this.usersData[userId] = this.getEmptyUser();
        }
        return this.usersData[userId];
    },
    reComputeScore: function (user) {
        let tags = user.tags;
        let score = 0;
        Object.values(tags).forEach(tag => {
            Object.values(tag).forEach(reason => {
                score += reason.score;
            })
        });
        user.score = score;
    },
    mergeUpdate: function (user, update) {
        // Object.assign(user, update);
        if (Object.prototype.hasOwnProperty.call(update, 'state')) {
            Object.keys(update.state).forEach(key => {
                user.state[key] = update.state[key];
            });
        }
        if (Object.prototype.hasOwnProperty.call(update, 'tags')) {
            Object.keys(update.tags).forEach(tagName => {
                Object.keys(update.tags[tagName]).forEach(reasonUrl => {
                    if (!Object.prototype.hasOwnProperty.call(user.tags, tagName)) {
                        Vue.set(user.tags, tagName, {});
                    }
                    if (!Object.prototype.hasOwnProperty.call(user.tags[tagName], reasonUrl)) {
                        Vue.set(user.tags[tagName], reasonUrl, { score: 0 });
                    }
                    let s = update.tags[tagName][reasonUrl].score;
                    let reason = user.tags[tagName][reasonUrl];
                    reason.score += s;
                    user.score += s;
                });

            });
        }
    },
    mergeUpdates: function (updates) {
        Object.keys(updates).forEach(userId => {
            this.mergeUpdate(this.usersData[userId], updates[userId]);
            if (!Object.prototype.hasOwnProperty.call(this.modifyBuffer, userId)) {
                this.modifyBuffer[userId] = this.getEmptyUser();
            }
            this.mergeUpdate(this.modifyBuffer[userId], updates[userId]);
        });
        this.save();
    },
    acceptModify: function (ModifyData) {
        this.mergeUpdates(ModifyData);
        // forageData.saveModify(ModifyData);
    },
    saveArticle: function (article) {
        this.article.setItem(article.url, article.content);
    },
    getArticle: function (url, callback) {
        localforage.getItem(url, callback)
    },
}