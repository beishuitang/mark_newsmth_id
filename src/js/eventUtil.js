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
        let menuConfig = config.menuConfig;
        let panelConfig = config.panelConfig;
        this.listenTouchDirection(
            document.querySelector('body'),
            false,
            function () {
                if (panelConfig.showPanel == true) {
                    panelConfig.showPanel = false;
                } else {
                    menuConfig.showMenu = true;
                }
            },
            function () {
                if (menuConfig.showMenu == true) {
                    menuConfig.showMenu = false;
                } else {
                    panelConfig.showPanel = true;
                }
            },
            this.bottomUpCallback.bind(this),
            this.topDownCallback.bind(this),
        );

    },
    topBottomCallback: function (direction) {
        // if (mainData.mainHash != 'article') {
        //     return;
        // }
        let currentPageEl = document.querySelector(".page-select");
        let pageEl;
        if (direction) {
            pageEl = currentPageEl.nextElementSibling;
        } else {
            pageEl = currentPageEl.previousElementSibling
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
    listenTouchDirection: function (target, isPreventDefault, rightCallback, leftCallback, bottomUpCallback, topDownCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;
        var bottom;
        var top;
        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].clientX;
                    startY = event.touches[0].clientY;
                    bottom = (window.scrollY + window.innerHeight + 2) > document.body.clientHeight;
                    top = window.scrollY < 1;
                    break;
                case "touchend":
                    var path = event.path;
                    var touch_on_pictures = false;
                    path.forEach(element => {
                        let id = element.id;
                        if (id === 'pictures') {
                            touch_on_pictures = true;
                        }
                    });
                    if (touch_on_pictures) {
                        break;
                    }
                    var spanX = event.changedTouches[0].clientX - startX;
                    var spanY = event.changedTouches[0].clientY - startY;
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
                    } else if (2 * Math.abs(spanX) < Math.abs(spanY)) {   //认定为垂直方向滑动
                        if (spanY > 30) {         //向下
                            if (top)
                                topDownCallback();
                        } else if (spanY < -30) {//向上
                            if (bottom)
                                bottomUpCallback();
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
