export default function (articleElement) {

    let p = articleElement.querySelector('.a-body .a-content>p');
    let pClone = document.createElement('div');
    p.setAttribute('v-show', '!simplify')
    p.setAttribute('v-on:dblclick', 'simplified=!simplified')
    pClone.setAttribute('v-show', 'simplify')
    pClone.setAttribute('v-on:dblclick', 'simplified=!simplified')
    p.parentNode.insertBefore(pClone, p.nextSibling);
    let referenceDiv = document.createElement('div');
    referenceDiv.classList.add('webkit-line-clamp');
    let childNodes = p.childNodes;

    let endChecked = false;
    // let replyChecked = false;
    for (let index = 6; index < childNodes.length; index++) {
        const childNode = childNodes[index];
        let childNodeClone = childNode.cloneNode(true);
        if (endChecked) {
            if (childNode.nodeName == 'A' && childNode.querySelector('img') != null) {
                pClone.appendChild(childNodeClone);
            }
        } else if (childNode.nodeName == '#text' && childNode.nodeValue == ' -- ') {
            pClone.appendChild(childNodeClone);
            endChecked = true;
        } else if (childNode.nodeName == '#text' && childNode.nodeValue.match(/^ 【\s?在.*的大作中提到:\s?】/) != null) {
            referenceDiv.appendChild(childNodeClone);
            referenceDiv.appendChild(document.createElement('br'));
            if (referenceDiv.parentNode == null) {
                pClone.appendChild(referenceDiv);
            }
        } else if (childNode.nodeName == 'FONT') {
            if (childNode.innerText.startsWith(':')) {
                if (childNode.nodeName == 'FONT' && childNode.querySelector('a>img') != null) {
                    pClone.appendChild(childNodeClone);
                } else if (childNode.nodeName == 'FONT' && childNode.querySelector('a') != null) {
                    let font = childNode.querySelector('font');
                    if (font != null && font.color == 'blue' && font.innerText.match(/^附件/)) {
                        pClone.appendChild(childNodeClone);
                    }
                } else {
                    referenceDiv.appendChild(childNodeClone);
                }
            } else if (childNode.innerText.startsWith('※')) {
                continue;
            } else {
                pClone.appendChild(childNodeClone);
            }
        } else {
            pClone.appendChild(childNodeClone);
        }
    }
    let els = pClone.childNodes
    let hasBr = false;
    if (els.length > 2) {
        for (let index = els.length - 1; index > 0; index--) {
            const el = els[index];
            if (el.nodeName == 'BR') {
                if (hasBr || els[index - 1].nodeName == 'DIV') {
                    el.remove();
                }
                hasBr = true;
            } else if (el.nodeName == '#text' && el.nodeValue.match(/[^\s]/)) {
                hasBr = false;
            }
        }
    }
}