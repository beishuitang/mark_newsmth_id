import { storageData } from '@/js/mainData'
export default function () {
    console.log('article simplify')
    let articles = document.querySelectorAll('table.article')
    for (let index = 0; index < articles.length; index++) {
        const article = articles[index];
        let a_body = article.querySelector('.a-body');
        let a_bottom = article.querySelector('.a-bottom')
        let p = article.querySelector('.a-body .a-content>p');
        let pClone = p.cloneNode(false);
        let a_func = article.querySelector('.a-head .a-func');
        article.setAttribute('v-if', 'show')
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
    }
}