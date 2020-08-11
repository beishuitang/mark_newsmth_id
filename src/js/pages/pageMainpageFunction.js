import config from '../../config/config'
import browseUtil from '../browseUtil'
export default function () {
    function moveSlider() {
        let slider = document.querySelector('#slider');
        if (slider == null) {
            return;
        }
        let a_links = slider.querySelectorAll('.pic>a');
        let ul = document.querySelector('#pictures ul');
        let li = ul.firstChild;
        for (let index = 0; index < a_links.length; index++) {
            const a_link = a_links[index];
            let a_href = a_link.href;
            let a_title = a_link.title;
            let s_index = a_title.indexOf(']') + 1;
            let li_board = a_title.slice(0, s_index);
            let li_title = a_title.slice(s_index);
            let li_board_href = a_href.slice(0, a_href.lastIndexOf('/')).replace('article', 'board');
            let img_src = a_link.firstChild.src;
            let new_li = li.cloneNode(true);
            let li_a = new_li.querySelectorAll('a');
            li_a[0].href = a_href;
            li_a[0].firstChild.src = img_src;
            li_a[1].href = li_board_href;
            li_a[1].innerText = li_board;
            li_a[2].href = a_href;
            li_a[2].innerText = li_title;
            ul.insertBefore(new_li, li);
        }
        slider.remove();
    }
    function initSection() {
        let sections = config.mainpageConfig.section.concat(config.mainpageConfig.others);
        for (let index = 0; index < sections.length; index++) {
            const sectionInfo = sections[index];
            let els = document.querySelectorAll(sectionInfo.main);
            for (let i = 0; i < els.length; i++) {
                const el = els[i];
                let title_el = el.querySelector(sectionInfo.title);
                // console.log(title_el)
                if (title_el != null) {
                    title_el.ondblclick = function () {
                        for (let m = 0; m < el.children.length; m++) {
                            const child_el = el.children[m];
                            if (title_el !== child_el) {
                                if (child_el.classList.contains('hidden_item')) {
                                    child_el.classList.remove('hidden_item');
                                } else {
                                    child_el.classList.add('hidden_item');
                                }
                            }
                        }
                    }
                }
                switch (parseInt(sectionInfo.state)) {
                    case 0:
                        el.style.display = 'none';
                        break;
                    case 1:
                        title_el.ondblclick()
                        break;
                    default:
                        break;
                }
            }
        }
    }
    if (config.onMobile) {
        moveSlider();
        initSection();
        let a_links = document.querySelectorAll('#mp_wrapper a');
        for (let index = 0; index < a_links.length; index++) {
            const a_link = a_links[index];
            browseUtil.addVisitedLinkStyle(a_link);
        }
    }
}
