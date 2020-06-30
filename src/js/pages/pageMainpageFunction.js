import config from '../../config/config'
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
    if (config.onMobile) {
        moveSlider();
    }
}
