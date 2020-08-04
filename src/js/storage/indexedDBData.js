import config from '../../config/config'
import localforage from "localforage"
export default {
    modifyStore: null,
    articleStore: null,
    topicInfoStore: null,
    modifyBuffer: {},

    init: function () {
        this.articleStore = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "article" });
        this.modifyStore = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "modify" });
        this.topicInfoStore = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "topic" });
        this.modifyStore.getItem(this.modifyTime).then((value) => {
            this.modifyBuffer = value ? value : {}
        })
        console.log('init indexedDBData');
        console.log(this);
    }
}