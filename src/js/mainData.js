import Vue from 'vue/dist/vue.esm'
import config from '../config/config'
import localforage from "localforage"

export default {
    // session data
    pageYOffsetData: {},
    prePageHref: location.href,
    currentPageHref: location.href,
    mainHash: '',
    preMainHash: '',
    mainpagePart: {},
    picturesXOffset: 0,
    reg: /#!(\w+)(\/|$)/,
    articleReg: /(article\/[\w|.]+\/\d+)(\?p=(\d+))?/,
    linksBefore: [],
    topicLinks: [],
    topicTimestamp: {},
    // storage data
    modifyTime: '0',
    usersData: {},
    // forageData
    markStore: null,
    topicInfoStore: null,

    init: function () {
        let sessionConfig = JSON.parse(sessionStorage.getItem(config.PROJECT_NAME + '_config'));
        if (sessionConfig != null) {
            Object.assign(this, sessionConfig);
        }
        // sessionData
        let m = location.hash.match(this.reg);
        this.mainHash = m ? m[1] : '';
        // storageData
        let usersData = localStorage.getItem(config.storageKeys.STORAGE_USERS_DATA);
        if (usersData != null) {
            this.usersData = JSON.parse(usersData);
        }
        Object.values(this.usersData).forEach((user) => {
            this.reComputeScore(user);
        })
        window.mainData = this;
        // forageData
        this.markStore = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "mark" });
        this.topicInfoStore = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "topic" });
    },
    onhashchange: function () {
        if (this.mainHash === 'mainpage') {
            let container = document.querySelector('#pictures>div>ul');
            this.picturesXOffset = container.scrollLeft;
        }
        this.preMainHash = this.mainHash;
        this.mainHash = location.hash.match(this.reg)[1];
        this.prePageHref = this.currentPageHref;
        this.currentPageHref = location.href;
        // this.currentPageHref = location.href.replace(/\?p=1$/, '');
        this.pageYOffsetData[this.prePageHref] = window.pageYOffset;
        if (this.mainHash != this.preMainHash) {
            if (this.linksBefore.length > 0 && this.currentPageHref == this.linksBefore[0]) {
                this.linksBefore.shift();
            } else {
                this.linksBefore.unshift(this.prePageHref);
            }
        }
        this.saveTopicInfo(this.prePageHref);
    },
    onBeforeUnload: function () {
        sessionStorage.setItem(config.PROJECT_NAME + '_config', JSON.stringify({
            pageYOffsetData: this.pageYOffsetData,
            prePageHref: this.prePageHref,
            preMainHash: this.preMainHash,
            picturesXOffset: this.picturesXOffset,
            linksBefore: this.linksBefore,
            topicLinks: this.topicLinks,
        }));
        this.saveTopicInfo(this.currentPageHref);
    },
    onMut: function () {
        // this.saveTopicInfo(this.currentPageHref);
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
        return this.usersData;
    },
    getEmptyUser: function () {
        return {
            score: 0,
            // TODO 改为二进制表示
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
    acceptModify: function (modify) {
        this.mergeModifyToMarkStore(modify);
        this.mergeModifyToUsersData(modify);
    },
    mergeModifyToMarkStore: function (modify) {
        this.markStore.getItem(modify.url, (err, oldMark) => {
            let mark = oldMark ? oldMark : { id: modify.id, tags: {}, p: modify.p, };
            mark.m = modify.m;
            let tags = mark.tags;
            let oldScore = tags[modify.tagName] ? tags[modify.tagName].score : 0;
            tags[modify.tagName] = { score: oldScore + modify.step }
            if (tags[modify.tagName].score == 0) {
                delete tags[modify.tagName];
            }
            this.markStore.setItem(modify.url, mark);
        })
    },
    mergeModifyToUsersData: function (modify) {
        let tags = this.usersData[modify.id].tags;
        let tagName = modify.tagName;

        if (!Object.prototype.hasOwnProperty.call(tags, tagName)) {
            Vue.set(tags, tagName, {});
        }
        if (!Object.prototype.hasOwnProperty.call(tags[tagName], modify.url)) {
            Vue.set(tags[tagName], modify.url, { score: 0 });
        }
        let reason = tags[tagName][modify.url];
        reason.score += modify.step;
        if (reason.score == 0) {
            Vue.delete(tags[tagName], modify.url);
        }
        if (Object.keys(tags[tagName]).length == 0) {
            Vue.delete(tags, tagName);
        }
        this.usersData[modify.id].score += modify.step;
        this.saveUsersData();
    },
    getArticle: function (url, callback) {
        this.markStore.getItem(url, (err, mark) => {
            callback(err, mark.p)
        })
    },
    getAllMarks: function (callback) {
        let marks = {}
        this.markStore.iterate(function (value, key) {
            marks[key] = value;
        }).then(function () {
            callback(marks);
        }).catch(function (err) {
            console.log(err);
        });
    },
    mergeMarks: function (marks) {
        Object.keys(marks).forEach((url) => {
            this.markStore.getItem(url, (err, oldMark) => {
                oldMark = oldMark ? oldMark : { tags: {}, m: 0 };
                if (marks[url].m > oldMark.m) {
                    let modifies = this.getModifiesFromMarksDiff(url, oldMark, marks[url]);
                    modifies.forEach((modify) => {
                        this.checkUser(modify.id);
                        this.mergeModifyToUsersData(modify);
                    })
                    this.markStore.setItem(url, marks[url]);
                }
            })
        })
    },
    saveTopicInfo: function (pageHref) {
        let m = pageHref.match(this.articleReg);
        let a_names = document.querySelectorAll('#body>.b-content>a');
        if (m != null && a_names.length > 0) {
            let artile_els = document.querySelectorAll('#body table.article')
            let article_timestamp = parseInt(artile_els[artile_els.length - 1].getAttribute('article_timestamp'))
            let pos = parseInt(a_names[a_names.length - 1].name.substr(1));
            this.getTopicInfo(m[1], (err, info) => {
                if (!info || info.pos <= pos || info.t < article_timestamp) {
                    this.topicInfoStore.setItem(m[1], {
                        p: parseInt(m[3] ? m[3] : '1'),
                        pos: pos,
                        pageYOffset: window.pageYOffset,
                        t: article_timestamp
                    });
                }
            })
        }
    },
    getTopicInfo: function (topicUrl, callback) {
        this.topicInfoStore.getItem(topicUrl, callback)
    },
    getModifiesFromMarksDiff: function (url, oldMark, newMark) {
        let modifies = [];
        function addModify(tagName, step) {
            let modify = { id: newMark.id, m: newMark.m, p: newMark.p, url: url }
            modify.tagName = tagName;
            modify.step = step;
            modifies.push(modify);
        }
        Object.keys(newMark.tags).forEach((tagName) => {
            let oldStep = oldMark.tags[tagName] ? oldMark.tags[tagName].score : 0;
            addModify(tagName, newMark.tags[tagName].score - oldStep);
        });
        Object.keys(oldMark.tags).forEach((tagName) => {
            if (!Object.prototype.hasOwnProperty.call(newMark.tags, tagName)) {
                addModify(tagName, 0 - oldMark.tags[tagName].score);
            }
        });
        return modifies;
    }

}