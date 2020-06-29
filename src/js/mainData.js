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
    // forageData
    modify: null,
    article: null,
    modifyBuffer: {},

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
        // TODO 无用？
        this.simplifyConfig = config.simplifyConfig;

        // forageData
        this.article = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "article" });
        this.modify = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "modify" });

        // modifyTime modifyBuffer
        this.modifyTime = localStorage.getItem(config.storageKeys.STORAGE_MODIFY_TIME);
        if (this.modifyTime == null) {
            this.createNewModifyBuffer();
        }
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
    onMut: function () {
        window.scroll(0, this.pageYOffsetData[this.currentPage]);
    },
    createNewModifyBuffer: function () {
        this.modifyTime = new Date().getTime().toString();
        this.modifyBuffer = {};
        localStorage.setItem(config.storageKeys.STORAGE_MODIFY_TIME, this.modifyTime);
    },
    saveUsersData: function () {
        let newUsersData = {};
        Object.keys(this.usersData).forEach(userId => {
            let user = this.usersData[userId];
            if (Object.keys(user.tags).length != 0) {
                newUsersData[userId] = user;
            }
        });
        localStorage.setItem(config.storageKeys.STORAGE_USERS_DATA, JSON.stringify(newUsersData));
    },
    getUsersData: function () {
        return JSON.parse(localStorage.getItem(config.storageKeys.STORAGE_USERS_DATA));
    },
    saveModify: function (modifyTime, modify) {
        // this.modify.setItem(this.modifyTime, this.modifyBuffer);
        this.modify.setItem(modifyTime, modify);
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
    mergeModify: function (user, modify) {
        // Object.assign(user, update);
        if (Object.prototype.hasOwnProperty.call(modify, 'state')) {
            Object.keys(modify.state).forEach(key => {
                user.state[key] = modify.state[key];
            });
        }
        if (Object.prototype.hasOwnProperty.call(modify, 'tags')) {
            Object.keys(modify.tags).forEach(tagName => {
                Object.keys(modify.tags[tagName]).forEach(reasonUrl => {
                    if (!Object.prototype.hasOwnProperty.call(user.tags, tagName)) {
                        Vue.set(user.tags, tagName, {});
                    }
                    if (!Object.prototype.hasOwnProperty.call(user.tags[tagName], reasonUrl)) {
                        Vue.set(user.tags[tagName], reasonUrl, { score: 0 });
                    }
                    let s = modify.tags[tagName][reasonUrl].score;
                    let reason = user.tags[tagName][reasonUrl];
                    reason.score += s;
                    if (reason.score == 0) {
                        Vue.delete(user.tags[tagName], reasonUrl);
                    }
                    if (Object.keys(user.tags[tagName]).length == 0) {
                        Vue.delete(user.tags, tagName);
                    }
                    user.score += s;
                });
            });
        }
    },
    mergeModifyToBuffer: function (userId, modify) {
        if (!Object.prototype.hasOwnProperty.call(this.modifyBuffer, userId)) {
            this.modifyBuffer[userId] = this.getEmptyUser();
        }
        this.mergeModify(this.modifyBuffer[userId], modify);
    },
    mergeModifies: function (modifies, ifImport) {
        Object.keys(modifies).forEach(userId => {
            this.checkUser(userId);
            this.mergeModify(this.usersData[userId], modifies[userId]);
            if (!ifImport) {
                // 本地添加数据
                this.mergeModifyToBuffer(userId, modifies[userId]);
            }
        });
        this.saveUsersData();
        this.saveModify(this.modifyTime, this.modifyBuffer);
    },
    acceptImportModifies: function (importModifies) {
        this.modify.keys().then((keys) => {
            let inputKeys = Object.keys(importModifies);
            inputKeys.forEach((inputKey) => {
                if (!keys || !keys.includes(inputKey)) {
                    this.mergeModifies(importModifies[inputKey], true);
                    this.saveModify(inputKey, importModifies[inputKey]);
                }
            });
        }
        ).catch(function (err) {
            console.log(err);
        });
    },
    acceptImportArticles: function (importArticles) {
        this.article.keys().then(
            (keys) => {
                Object.keys(importArticles).forEach((inputKey) => {
                    if (!keys || !keys.includes(inputKey)) {
                        this.saveArticle({
                            url: inputKey,
                            content: importArticles[inputKey]
                        });
                    }
                })
            }).catch(function (err) {
                console.log(err);
            });
    },
    acceptModify: function (ModifyData) {
        this.mergeModifies(ModifyData, false);
    },
    saveArticle: function (article) {
        this.article.setItem(article.url, article.content);
    },
    getArticle: function (url, callback) {
        localforage.getItem(url, callback)
    },
    getModifies: function (callback) {
        this.createNewModifyBuffer();
        let modifies = {}
        this.modify.iterate(function (value, key) {
            modifies[key] = value;
        }).then(function () {
            callback(modifies);
        }).catch(function (err) {
            console.log(err);
        });
    },
    getArticles: function (callback) {
        let articles = {}
        this.article.iterate(function (value, key) {
            articles[key] = value;
        }).then(function () {
            callback(articles);
        }).catch(function (err) {
            console.log(err);
        });
    }
}