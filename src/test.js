import localforage from 'localforage'
import config from './config/config'
export default {
    init: function () {
        console.log('ffffffff')
        this.article = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "article" });
        this.modify = localforage.createInstance({ name: config.PROJECT_NAME, storeName: "modify" });
        console.log(this.article)
        console.log(this.modify)
        this.article.setItem('a', 'aaa')
        this.modify.setItem('b', 'bbb')
    }
}