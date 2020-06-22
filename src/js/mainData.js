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
        // TODO
        this.simplifyConfig = config.simplifyConfig;
        Vue.$simplifyConfig = this.simplifyConfig;
        // 每天只添加一次
        let modifyTimeFromStorage = localStorage.getItem(config.storageKeys.STORAGE_MODIFY_TIME);
        if (modifyTimeFromStorage != null && (new Date() - new Date(parseInt(modifyTimeFromStorage))) < 24 * 60 * 60 * 1000) {
            this.modifyTime = modifyTimeFromStorage;
        } else {
            // this.modifyTime = new Date().getTime().toString();
            // localStorage.setItem(config.storageKeys.STORAGE_MODIFY_TIME, this.modifyTime);
            this.updateModifyTime();
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
    onMut: function () {
        window.scroll(0, this.pageYOffsetData[this.currentPage]);
    },
    updateModifyTime: function () {
        this.modifyTime = new Date().getTime().toString();
        localStorage.setItem(config.storageKeys.STORAGE_MODIFY_TIME, this.modifyTime);
    },
    saveUsersData: function () {
        localStorage.setItem(config.storageKeys.STORAGE_USERS_DATA, JSON.stringify(this.usersData));
    },
    saveModify: function () {
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
                    user.score += s;
                });
            });
        }
    },
    mergeModifies: function (modifies) {
        Object.keys(modifies).forEach(userId => {
            this.mergeModify(this.usersData[userId], modifies[userId]);
            if (!Object.prototype.hasOwnProperty.call(this.modifyBuffer, userId)) {
                this.modifyBuffer[userId] = this.getEmptyUser();
            }
            this.mergeModify(this.modifyBuffer[userId], modifies[userId]);
        });
        this.saveUsersData();
        this.saveModify();
    },
    mergeInputModifies: function (inputModifies) {
        this.modify.keys().then(
            function (keys) {
                Object.keys(inputModifies).forEach((inputKey) => {
                    if (!keys.includes(inputKey)) {
                        this.mergeModifies(inputModifies[inputKey]);
                    }
                });
            }
        ).catch(function (err) {
            console.log(err);
        });
    },
    mergeInputArticles: function (inputArticles) {
        this.article.keys().then(
            function (keys) {
                Object.keys(inputArticles).forEach((inputKey) => {
                    if (!keys.includes(inputKey)) {
                        this.saveArticle(inputArticles[inputKey]);
                    }
                })
            }).catch(function (err) {
                console.log(err);
            });
    },
    acceptModify: function (ModifyData) {
        this.mergeModifies(ModifyData);
        // forageData.saveModify(ModifyData);
    },
    saveArticle: function (article) {
        this.article.setItem(article.url, article.content);
    },
    getArticle: function (url, callback) {
        localforage.getItem(url, callback)
    },
    getModifies: function (callback) {
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