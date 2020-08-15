import config from '../../config/config'
import mainData from "../mainData";
import tagStore from '@/js/tagStore'
import pageArticleSimplify from './pageArticleSimplify'
import browseUtil from '../browseUtil'
export default function () {
    console.log('page article function')
    // pageArticleSimplify();
    // nForum/#!article/Reader/6974
    let reg = /#!article\/([\w.]+)\/(\d+)($|\?)/
    let m = location.hash.match(reg);
    let board = m[1];
    let topicId = m[2];
    let singleArticle = tagStore.getVueSubClass('SingleArticle');
    let articles = document.querySelectorAll('.article');
    for (let index = 0; index < articles.length; index++) {
        const articleElement = articles[index];
        fnArticle(articleElement);
    }
    function fnArticle(articleElement) {
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

        let userScoreEl = tagStore.getUserScoreElement();
        let tagModifierEl = tagStore.getTagModifierElement();
        let userTags = tagStore.getUserTagsElement();
        let modifierSwitch = tagStore.getModifierSwitchElement();
        a_func.appendChild(modifierSwitch);
        a_content.insertBefore(tagModifierEl, a_content.firstChild);
        a_content.insertBefore(userTags, a_content.firstChild);
        a_u_name.appendChild(userScoreEl);

        // mobile function
        if (config.onMobile) {
            let li = document.createElement('li');
            li.appendChild(a_u_sex);
            li.appendChild(a_u_name);
            a_func.insertBefore(li, a_func.firstChild);
            a_func.appendChild(a_pos);
            a_bottom.lastElementChild.appendChild(a_func_info);
        }
        // simplify
        pageArticleSimplify(articleElement);
        let funcConfig = config.simplifyConfig.func;
        let li_a = a_func.querySelectorAll('li>a');
        for (let index = 0; index < li_a.length; index++) {
            const a = li_a[index];
            if (Object.prototype.hasOwnProperty.call(funcConfig, a.innerText)) {
                a.parentNode.setAttribute('v-show', `!simplify || simplifyConfig.func['${a.innerText}']`);
            }
        }
        // timeStamp
        browseUtil.readTimestamp(articleElement)
        // vue
        let p_el = articleElement.querySelector('.a-body .a-content>p');
        articleElement.setAttribute('v-show', 'state.showUser')
        a_head.setAttribute('v-on:dblclick', 'switchShowContent')
        a_body.setAttribute('v-show', 'showContent')
        a_body.querySelector('.a-u-img').setAttribute('v-show', '!simplify')
        a_bottom.setAttribute('v-show', '!simplify')
        // vue function
        let articleId = a_post.href.substring(a_post.href.lastIndexOf('/'))
        let userId = a_u_name.querySelector('a').innerText;
        mainData.checkUser(userId);
        new singleArticle({
            el: articleElement,
            propsData: {
                articleUrl: board + '/' + topicId + articleId,
                articleContent: p_el.innerHTML,
                userId: userId,
                user: mainData.usersData[userId],
                simplifyConfig: config.simplifyConfig
            }
        });
    }
    let likes = document.querySelectorAll('.add_like');
    if (likes.length == 2) {
        likes[1].onclick = function () {
            likes[0].click();
        }
    }
}