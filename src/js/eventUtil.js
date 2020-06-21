import config from '../config/config'
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
    initMenuAction: function () {
        let menuConfig = config.menuConfig;
        this.listenTouchDirection(document.querySelector('body'), false, false, function () {
            if (menuConfig.hand == 'left' && menuConfig.showMenu != true) {
                menuConfig.showMenu = true;
            } else if (menuConfig.hand != 'left' && menuConfig.showMenu != false) {
                menuConfig.showMenu = false;
            }
        }, false, function () {
            if (menuConfig.hand != 'left' && menuConfig.showMenu != true) {
                menuConfig.showMenu = true;
            }
            if (menuConfig.hand == 'left' && menuConfig.showMenu != false) {
                menuConfig.showMenu = false;
            }
        });

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
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;
        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].clientX;
                    startY = event.touches[0].clientY;
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
                    } else {                                    //认定为垂直方向滑动
                        if (spanY > 30) {         //向下
                            if (downCallback)
                                downCallback();
                        } else if (spanY < -30) {//向上
                            if (upCallback)
                                upCallback();
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
