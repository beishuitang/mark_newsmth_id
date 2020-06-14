import Vue from 'vue/dist/vue.esm';
import UserTags from '@/components/tags/UserTags';
import UserScore from './components/tags/UserScore'
import SingleTag from './components/tags/SingleTag'
import TagModifier from './components/tags/TagModifier'
import SingleArticle from './components/tags/SingleArticle'
import tagUtils from './js/tagUtils'
// import SingleArticle from '@/components/tags/SingleArticle'
// import tagUtils from './js/tagUtils';
export default {
    usersData: {
        'langman': {
            score: 3,
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
    t1: function () {
        let div1 = document.createElement('div');
        document.querySelector('body').appendChild(div1);
        new (Vue.extend(UserTags))({
            el: div1,
            propsData: { tags: this.usersData['langman'].tags }
        });
    },
    t2: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(UserScore))({
            el: div,
            propsData: { user: this.usersData['langman'] }
        });
    },
    t3: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(UserScore))({
            el: div,
            propsData: { user: this.usersData['langman'] }
        });
    },
    t4: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(SingleTag))({
            el: div,
            propsData: { tagName: 'sb', tag: this.usersData['langman'].tags['sb'] }
        });
    },
    t5: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        new (Vue.extend(TagModifier))({
            el: div,
            propsData: { reasonUrl: 'url3', tags: this.usersData['langman'].tags }
        });
    },
    t6: function () {
        let div = document.createElement('div');
        document.querySelector('body').appendChild(div);
        div.innerHTML = '<span>ggg<span><user-score :user="user"><user-score>'
        new (Vue.extend(SingleArticle))({
            el: div,
            propsData: { articleId: 345, userId: 'langman', user: this.usersData['langman'] }
        });
    },
    t7: function () {
        // location.pathname = '/nForum/'
        // location.hash = '#!article/Reader/697241';
        let articleElement = document.querySelector('.article');
        let userScoreEl = tagUtils.getUserScoreElement();
        let tagModifierEl = tagUtils.getTagModifierElement();
        let userTags = tagUtils.getUserTagsElement();
        let aContent = articleElement.querySelector('.a-body .a-content');
        aContent.insertBefore(tagModifierEl, aContent.firstChild);
        aContent.insertBefore(userTags, aContent.firstChild);
        articleElement.querySelector('.a-u-name').appendChild(userScoreEl);
        new (Vue.extend(SingleArticle))({
            el: articleElement,
            propsData: { articleUrl: 'url/sd', userId: 'langman', user: this.usersData['langman'] }
        });

    },
    test: function () {
        // this.t1()
        // this.t2()
        // this.t3()
        // this.t4()
        // this.t5()
        // this.t6()
        this.t7()
        // let articleElement = document.querySelector('.article');
        // let pElement = articleElement.querySelector('.a-content p');
        // pElement.parentNode.appendChild(tagUtils.getUserScore());
        // let singleArticle = Vue.extend(SingleArticle);
        // new singleArticle({
        //     el: articleElement,
        //     propsData: {
        //         articleId: 12345,
        //         userId: 'langman',
        //         user: this.usersData['langman']
        //     }
        // })

    },


}