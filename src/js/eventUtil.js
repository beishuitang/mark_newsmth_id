import config from '../config/config'
import mainData from '../js/mainData'
export default {
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    initAction: function () {
        this.listenTouchDirection(
            document.querySelector('body'),
            false,
            this.rightCallback.bind(this),
            this.leftCallback.bind(this),
            this.bottomUpCallback.bind(this),
            this.topDownCallback.bind(this),
        );
    },
    topBottomCallback: function (ifDown) {
        // if (mainData.mainHash != 'article') {
        //     return;
        // }
        let currentPageEl = document.querySelector(".page-select");
        let pageEl;
        if (ifDown) {
            pageEl = currentPageEl ? currentPageEl.nextElementSibling : null;
        } else {
            pageEl = currentPageEl ? currentPageEl.previousElementSibling : null;
        }
        if (pageEl != null) {
            pageEl.querySelector("a").click();
        } else {
            // let el = currentPageEl.querySelector("a");
            let el = document.createElement('a');
            let linksBefore = mainData.linksBefore;
            if (linksBefore.length != 0) {
                el.href = linksBefore[0];
                el.click();
            }
        }
    },
    bottomUpCallback: function () {
        this.topBottomCallback(true);
    },
    topDownCallback: function () {
        this.topBottomCallback(false);
    },
    leftRightCallback: function (ifLeft) {
        let menuConfig = config.menuConfig;
        let panelConfig = config.panelConfig;
        let leftShow = menuConfig.showMenu;
        let rightShow = panelConfig.showPanel;
        menuConfig.showMenu = !ifLeft && !rightShow;
        panelConfig.showPanel = ifLeft && !leftShow;
    },
    leftCallback: function () {
        this.leftRightCallback(true);
    },
    rightCallback: function () {
        this.leftRightCallback(false);
    },

    preventDblclickDefault: function () {
        document.querySelector('#body').addEventListener('mousedown', function (event) {
            if (event.detail > 1) {
                event.preventDefault();
            }
        }, false);
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param rightCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     * @param bottomUpCallback  从底部向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param topDownCallback   从顶部向下滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, rightCall, leftCall, bottomUpCall, topDownCall) {
        // target = document.querySelector('body');
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        this.addHandler(target, "keyup", handleTouchEvent);
        this.addHandler(target, "keydown", handleTouchEvent);
        var startX;
        var startY;
        var bottom = false;
        var top = false;
        function handleTouchEvent(event) {
            function allowUpDownAction() {
                return !config.panelConfig.showPanel;
            }
            function allowLeftRightAction() {
                var path = event.path;
                path = path ? path : [];
                let result = true;
                path.forEach(element => {
                    let id = element.id;
                    if (id === 'pictures') {
                        result = false;
                    }
                });
                return result;
            }
            function leftCallback() {
                allowLeftRightAction() && leftCall();
            }
            function rightCallback() {
                allowLeftRightAction() && rightCall();
            }
            function bottomUpCallback() {
                allowUpDownAction() && bottomUpCall();
            }
            function topDownCallback() {
                allowUpDownAction() && topDownCall();
            }
            function focusOnInput() {
                return ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(document.activeElement.nodeName);
            }
            switch (event.type) {
                case 'keydown':
                    if (focusOnInput()) {
                        break;
                    }
                    bottom = (window.scrollY + window.innerHeight + 2) > document.body.clientHeight;
                    top = window.scrollY < 1;
                    break;
                case 'keyup':
                    if (focusOnInput()) {
                        break;
                    }
                    if (leftCallback && event.keyCode == 37) {
                        leftCallback();
                    }
                    if (rightCallback && event.keyCode == 39) {
                        rightCallback();
                    }
                    if (top && event.keyCode == 38) {
                        topDownCallback();
                    } else if (bottom && event.keyCode == 40) {
                        bottomUpCallback();
                    }
                    break;
                case "touchstart":
                    bottom = (window.scrollY + window.innerHeight + 2) > document.body.clientHeight;
                    top = window.scrollY < 1;
                    startX = event.touches[0].clientX;
                    startY = event.touches[0].clientY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].clientX - startX;
                    var spanY = event.changedTouches[0].clientY - startY;

                    if (2 * Math.abs(spanX) < Math.abs(spanY)) {   //认定为垂直方向滑动
                        if (spanY > 30) {         //向下
                            if (top)
                                topDownCallback();
                        } else if (spanY < -30) {//向上
                            if (bottom)
                                bottomUpCallback();
                        }
                    }
                    if (2 * Math.abs(spanY) < Math.abs(spanX)) {      //认定为水平方向滑动
                        if (spanX > 30) {         //向右
                            if (rightCallback) {
                                rightCallback();
                            }
                        } else if (spanX < -30) { //向左
                            if (leftCallback) {
                                leftCallback();
                            }
                        }
                    }
                    break;
                case "touchmove":
                    //阻止默认行为
                    if (isPreventDefault)
                        event.preventDefault();
                    break;

            }
        }

    }
};
