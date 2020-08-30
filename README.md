## 忆水木 --水木社区浏览器脚本

### 主要功能：
#### 1. 标注id：
+ 浏览帖子时随手对id言论进行标注记录，
+ 实时显示id标注信息，方便关注/区分/绕行/骂战等等
+ 低于设置分值（默认为-5）的id自动折叠，可双击切换折叠/展开

#### 2. 配适手机：
+ m.newsmth.net的简洁界面
+ nForum的全面功能
+ app的操作体验

#### 3. 其他功能：
+ 精简文章显示，隐藏不常用信息，双击文章切换精简/完整模式
+ 快速阅读，上下划动到顶/底后,继续划动直接翻页
+ 进入同一主题后直接转到上次阅读位置
+ 区分显示已读/未读
+ 保存密码（非私人设备慎用）
<!-- + 草稿箱，预防敏感词 -->

### 适用范围：所有支持自定义脚本的浏览器,包括但不限于：
+ pc平台：火狐、chrome、edge、qq浏览器等支持油猴插件的浏览器
+ android: via浏览器（推荐）、x浏览器、yandex、firefox
+ ios: alook浏览器（未测试）

### 安装方法：
#### via浏览器:
1. 依次点击: 设置 脚本 右上+号 新建

2. 域名处填入： www.newsmth.net

3. 代码处填入以下代码：

```  
(function () {
    'use strict';
    if (window.mark_newsmth_id) {
        return;
    } else {
        window.mark_newsmth_id = true;
    }
    function add_script(src, el) {
        let sc = document.createElement('script');
        sc.charset = 'UTF-8';
        sc.src = src;
        sc.type = 'text/javascript';
        document.querySelector(el).appendChild(sc);
    };
    let href = 'https://cdn.jsdelivr.net/gh/beishuitang/mark_newsmth_id/dist/mark_newsmth_id.umd.min.js';
    add_script(href, 'body');
})();
```

#### yandex和firefox等支持油猴插件的浏览器:
1. 安装tampermonkey插件  
火狐浏览器参考: https://jingyan.baidu.com/article/39810a23469526b636fda6a3.html  
其他支持插件的浏览器类似
  
2. 安装脚本
点击链接:  
https://cdn.jsdelivr.net/gh/beishuitang/mark_newsmth_id/src/mark_newsmth_id.user.js
在弹出的页面点击install安装即可  
ps:外网比较慢，可能需要稍等或者多试几次

### 使用方法：
+ 安装完成后直接用浏览器打开 www.newsmth.net/nForum/#!mainpage 如果显示不正常请稍等或多刷新几次
+ 左划：显示已标注信息/隐藏菜单，右划：显示菜单/隐藏标注信息
+ 顶部继续下划转到上一页/上一级页面，底部继续上划转到下一页/上一级页面
+ 双击文章切换精简/完整模式，双击标题处切换折叠/展开模式
+ 菜单底部有选项按钮，点击显示设置选项

 ### 有意见建议可联系我  
 邮箱:beishuitang@163.com 

