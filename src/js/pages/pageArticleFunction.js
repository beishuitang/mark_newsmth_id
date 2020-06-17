// import Vue from 'vue/dist/vue.esm'
import { storageData } from "../mainData";
import tagStore from '@/js/tagStore'
export default function () {
    // nForum/#!article/Reader/6974
    let reg = /#!article\/([\w.]+)\/(\d+)($|\?)/
    let m = location.hash.match(reg);
    let board = m[1];
    let topicId = m[2];
    let singleArticle = tagStore.getVueSubClass('SingleArticle');
    let articles = document.querySelectorAll('.article');
    for (let index = 0; index < articles.length; index++) {
        const articleElement = articles[index];
        let userScoreEl = tagStore.getUserScoreElement();
        let tagModifierEl = tagStore.getTagModifierElement();
        let userTags = tagStore.getUserTagsElement();
        let modifierSwitch = tagStore.getModifierSwitchElement();

        let a_head = articleElement.querySelector('.a-head');
        let a_body = articleElement.querySelector('.a-body');
        let a_bottom = articleElement.querySelector('.a-bottom');
        let a_content = a_body.querySelector('.a-content');
        let a_func = a_head.querySelector('.a-func');
        let a_pos = a_head.querySelector('.a-pos');
        let a_u_name = a_head.querySelector('.a-u-name');
        let a_u_sex = a_head.querySelector('.a-u-sex');
        let a_func_info = a_bottom.querySelector('.a-func-info');

        let a_post = a_head.querySelector('.a-post');
        // mobile function
        let li = document.createElement('li');
        li.appendChild(a_u_sex);
        li.appendChild(a_u_name);
        a_func.insertBefore(li, a_func.firstChild);
        a_func.appendChild(a_pos);
        a_bottom.lastElementChild.appendChild(a_func_info);

        // tag function
        a_func.appendChild(modifierSwitch);
        a_content.insertBefore(tagModifierEl, a_content.firstChild);
        a_content.insertBefore(userTags, a_content.firstChild);
        a_u_name.appendChild(userScoreEl);
        let articleId = a_post.href.substring(a_post.href.lastIndexOf('/'))
        let userId = a_u_name.querySelector('a').innerText;
        storageData.checkUser(userId);
        new singleArticle({
            el: articleElement,
            propsData: { articleUrl: board + '/' + topicId + articleId, userId: userId, user: storageData.usersData[userId] }
        });
    }
}