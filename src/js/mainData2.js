import config from '../config/config'

export default {
    init: function () {
    },
    onhashchange: function () {
    },
    onBeforeUnload: function () {
    },
    onMut: function () {
    },
    saveUsersData: function () {
    },
    getUsersData: function () {
    },
    saveModify: function (modifyTime, modify) {
    },
    checkUser: function (userId) {
        if (!Object.prototype.hasOwnProperty.call(this.usersData, userId)) {
            this.usersData[userId] = this.getEmptyUser();
        }
        return this.usersData[userId];
    },
    saveArticle: function (article, callback) {
        this.article.setItem(article.url, article.content, callback);
    },
    getArticle: function (url, callback) {
        this.article.getItem(url, callback)
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
    },
    saveTopicInfo: function (topicUrl, topicInfo, callback) {
        this.topicInfo.setItem(topicUrl, topicInfo, callback);
    },
    getTopicInfo: function (topicUrl, callback) {
        this.topicInfo.getItem(topicUrl, callback)
    },

}