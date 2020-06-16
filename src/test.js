import Vue from 'vue/dist/vue.esm';
import UserTags from '@/components/tags/UserTags';
import UserScore from './components/tags/UserScore'
import SingleTag from './components/tags/SingleTag'
import TagModifier from './components/tags/TagModifier'
import SingleArticle from './components/tags/SingleArticle'
import tagStore from './js/tagStore'
import pageArticleFunction from './js/pages/pageArticleFunction'
import { storageData } from './js/mainData';
// import SingleArticle from '@/components/tags/SingleArticle'
// import tagUtils from './js/tagUtils';
export default {
    usersData: {
        'langman': {
            score: 3,
            show: true,
            showContent: true,
            showTags: true,
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
        let userScoreEl = tagStore.getUserScoreElement();
        let tagModifierEl = tagStore.getTagModifierElement();
        let userTags = tagStore.getUserTagsElement();
        let modifierSwitch = tagStore.getModifierSwitchElement();
        let aContent = articleElement.querySelector('.a-body .a-content');
        let aHead = articleElement.querySelector('.a-head');
        let aFunc = aHead.querySelector('.a-func');
        let aPos = aHead.querySelector('.a-pos');

        let a_u_name = aHead.querySelector('.a-u-name');
        let a_u_sex = aHead.querySelector('.a-u-sex');
        let li = document.createElement('li');
        li.appendChild(a_u_sex);
        li.appendChild(a_u_name);
        aFunc.insertBefore(li, aFunc.firstChild);
        aFunc.appendChild(modifierSwitch);
        aFunc.appendChild(aPos);
        aContent.insertBefore(tagModifierEl, aContent.firstChild);
        aContent.insertBefore(userTags, aContent.firstChild);
        articleElement.querySelector('.a-u-name').appendChild(userScoreEl);
        new (Vue.extend(SingleArticle))({
            el: articleElement,
            propsData: { articleUrl: 'url3', userId: 'langman', user: this.usersData['langman'] }
        });

    },
    t8: function () {
        pageArticleFunction();
    },
    t9: function () {
        let reason = storageData.getAssignableReason();
        console.log(reason);
        reason.score = 1;
        reason.score = 4;
        console.log(reason);
        let newReason = { score: 4, s: 'gg' };
        Object.assign(reason, newReason);
        console.log(reason.score)
        console.log(JSON.stringify(reason));
    },
    test: function () {
        // this.t1()
        // this.t2()
        // this.t3()
        // this.t4()
        // this.t5()
        // this.t6()
        // this.t7()
        this.t8()
        // this.t9();
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