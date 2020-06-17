import Vue from 'vue'
import config from '../config/config'
import localforage from "localforage"

export var sessionData = {
    pageYOffsetData: {},
    prePage: location.hash,
    currentPage: location.hash,
    mainHash: '',
    mainpagePart: {},
    picturesXOffset: 0,
    reg: /#!(\w+)(\/|$)/,
    init: function () {
        let m = location.hash.match(this.reg);
        this.mainHash = m[1];
        // window.addEventListener('hashchange', () => {
        //     this.onhashchange();
        // });
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
    onBodyMutation: function () {
        // if (Object.prototype.hasOwnProperty.call(this.pageYOffsetData, this.currentPage)) {
        //     window.scrollTo(0, this.pageYOffsetData[this.currentPage]);
        // }
        // if (this.mainHash === 'mainpage') {
        //     this.restoreMainpagePart();
        // }
    },
    restoreMainpagePart: function () {
        // let container = document.querySelector('#pictures>div>ul');
        // container.scrollLeft = this.picturesXOffset;
        // for (const key in this.mainpagePart) {
        //     if (Object.prototype.hasOwnProperty.call(this.mainpagePart, key)) {
        //         const part = this.mainpagePart[key];
        //         switch_part_state(part);
        //         console.log(part);
        //     }
        // }
    }
}
export var storageData = {
    // usersData: {},
    usersData: {
        'langman': {
            score: 3,
            state: {
                showUser: true,
                showContent: true,
                showTags: true,
            },
            tags:
            {
                'sb': {
                    'url1': { score: -1 },
                    'url2': { score: -5 }
                },
                'nb': {
                    'url3': { score: 1 },
                    'url4': { score: 2 }
                },
            }
        }
    },
    init: function () {
        let usersData = localStorage.getItem(config.storageKeys.STORAGE_USERS_DATA);
        if (usersData != null) {
            this.usersData = JSON.parse(usersData);
        }
        Object.values(this.usersData).forEach((user) => {
            this.reComputeScore(user);
        })
    },
    save: function () {
        localStorage.setItem(config.storageKeys.STORAGE_USERS_DATA, JSON.stringify(this.usersData));
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
                        Vue.set(user.tags, tagName, update.tags[tagName]);
                    } else if (!Object.prototype.hasOwnProperty.call(user.tags[tagName], reasonUrl)) {
                        Vue.set(user.tags[tagName], reasonUrl, update.tags[tagName][reasonUrl]);
                    } else {
                        let s = update.tags[tagName][reasonUrl].score;
                        let reason = user.tags[tagName][reasonUrl];
                        reason.score += s;
                        user.score += s;
                    }
                });

            });
        }
    },
    mergeUpdates: function (updates) {
        Object.keys(updates).forEach(userId => {
            this.mergeUpdate(this.usersData[userId], updates[userId]);
        });
        this.save();
    },
    onhashchange: function () {
        // let m = location.hash.match(this.reg);
        // if (m != null) {
        //     this.savePageNumber(m);
        // }
    },
    onBodyMutation: function () {
    },
    acceptModify: function (usersDataModify) {
        this.mergeUpdates(usersDataModify);
    }

}
export var forageData = {
    // http://www.newsmth.net/nForum/#!article/Occupier/1575679?p=10
    // TODO
    reg: /(article\/[\w|.]+\/\d+)(\?p=(\d+))?/,
    init: function () {
        //     window.addEventListener('hashchange', () => {
        //         this.onhashchange();
        //     });
    },
    onhashchange: function () {
        // let m = location.hash.match(this.reg);
        // if (m != null) {
        //     this.savePageNumber(m);
        // }
    },
    onBodyMutation: function () {
        // this.restorePageNumber();
    },
    saveArticle: function (article) {
        localforage.setItem(article.url, article.content);
    },
    savePageNumber: function (m) {
        localforage.setItem(config.PRIFIX_STR + m[1], m[3] ? m[3] : 1);
    },
    restorePageNumber: function () {
        let aLinks = document.querySelectorAll('#body a');
        for (let index = 0; index < aLinks.length; index++) {
            const aLink = aLinks[index];
            let m = aLink.href.match(this.reg);
            if (m != null && m[2] == null) {
                localforage.getItem(config.PRIFIX_STR + m[1]).then(function (pageNumber) {
                    aLink.href = aLink.href + '?p=' + (pageNumber ? pageNumber : 1);
                });
            }
        }
    }
}
export default {
    usersData: {},
    sessionData: sessionData,
    storageData: storageData,
    forageData: forageData,
    init: function () {
        this.sessionData.init();
        this.storageData.init();
        this.forageData.init();
    },
    onhashchange: function () {
        this.sessionData.onhashchange();
        this.storageData.onhashchange();
        this.forageData.onhashchange();
    },
    onBodyMutation: function () {
        this.sessionData.onBodyMutation();
        this.storageData.onBodyMutation();
        this.forageData.onBodyMutation();
    }
}