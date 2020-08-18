// ==UserScript==
// @name         mark_newsmth_id
// @namespace    https://github.com/beishuitang/mark_newsmth_id 
// @version      0.2
// @description  水木标注工具
// @author       tiewuzi
// @match        http*://www.newsmth.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function add_script(src, el) {
        let sc = document.createElement('script');
        sc.charset = 'UTF-8';
        sc.src = src;
        sc.type = 'text/javascript';
        document.querySelector(el).appendChild(sc);
    };
    let href = 'https://cdn.jsdelivr.net/beishuitang/mark_newsmth_id/src/dist/mark_newsmth_id.umd.min.js'
    add_script(href, 'body');
})();