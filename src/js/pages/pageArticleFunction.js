import { storageData } from "../mainData";
import tagStore from '@/js/tagStore'
// import pageArticleSimplify from "./pageArticleSimplify";
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
        // simplify
        let p = articleElement.querySelector('.a-body .a-content>p');
        let pClone = p.cloneNode(false);
        articleElement.setAttribute('v-if', 'show')
        a_body.setAttribute('v-if', 'showContent')
        Object.keys(storageData.simplifyConfig).forEach(key => {
            let target = a_func.querySelector('.' + key)
            // console.log(key)
            // console.log(target)
            if (target != null) {
                target.parentNode.setAttribute('v-if', `simplifyConfig["${key}"]`);
            }
        });
        a_bottom.setAttribute('v-if', '!simplify')
        pClone.setAttribute('v-if', 'simplify')
        p.setAttribute('v-if', '!simplify')
        p.setAttribute('v-on:dblclick', 'simplify=!simplify')
        pClone.setAttribute('v-on:dblclick', 'simplify=!simplify')
        let childNodes = p.childNodes;
        let replyChecked = false;
        let endChecked = false;
        let preBR = false;
        for (let index = 6; index < childNodes.length; index++) {
            const childNode = childNodes[index];
            let div = document.createElement('div');
            let fontNode = childNode.cloneNode(true);
            div.style = 'max-height:3rem;overflow:hidden';
            if (endChecked) {
                if (childNode.nodeName == 'A') {
                    pClone.appendChild(childNode.cloneNode(true));
                }
            } else if (childNode.nodeName == '#text' && childNode.nodeValue == ' -- ') {
                pClone.appendChild(childNode.cloneNode(true));
                endChecked = true;
                // TODO 
            } else if (childNode.nodeName == 'FONT' && childNode.classList.length > 0) {
                if (!replyChecked) {
                    pClone.appendChild(div);
                    preBR = false;
                }
                div.appendChild(fontNode);
                replyChecked = true;
            } else if (childNode.nodeName == 'BR') {
                if (!preBR == true) {
                    pClone.appendChild(childNode.cloneNode(true));
                }
                preBR = true;
            } else if (childNode.nodeName == '#text' && childNode.nodeValue.match(/[^\s]/) == null) {
                pClone.appendChild(childNode.cloneNode(true));
            } else {
                preBR = false;
                pClone.appendChild(childNode.cloneNode(true));
            }
        }
        p.parentNode.insertBefore(pClone, p.nextSibling);

        // vue function
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