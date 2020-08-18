export default {
  onMobile: false,
  PROJECT_NAME: 'mark_newsmth_id',
  PREFIX_STR: "smth_id_mark_",
  storageKeys: {
    STORAGE_USERS_DATA: 'users_data',
    STORAGE_MAINPAGE: 'mainpage',
    STORAGE_FRAME: 'frame',
    STORAGE_FONT_SIZE: "font_size",
    STORAGE_HAND: 'hand',
    STORAGE_SIMPLIFY_CONFIG: 'simplify_config',
    STORAGE_MODIFY_TIME: 'modify_time',
    STORAGE_PASSWORD: 'pass',
    STORAGE_ID: 'id',
    STORAGE_CONFIG: 'config',
  },
  settingConfig: {
    show: false
  },
  menuConfig: {
    hand: 'left',
    showMenu: false,
    autoFillPassword: true
  },
  panelConfig: {
    showPanel: false,
  },
  frameConfig: {
    showHead: true,
    showFoot: false
  },
  mainpageConfig: {
    section: [
      { main: '#top10', title: 'h3', name: '十大热门', state: 2 },
      { main: '.b_recommend', title: 'h3', name: '精彩原创', state: 1 },
      { main: '#tg_slider', title: 'h4', name: '水木团购', state: 0 },
      { main: '.b_sectop10', title: 'h3', name: '十大副本', state: 0 },
      { main: '#hotspot', title: 'h3', name: '近期热帖', state: 0 },
      { main: '#pictures', title: 'h3', name: '精彩贴图', state: 2 },
      { main: '.b_section.block', title: 'h3', name: '分区十大', state: 2 },
      { main: '#ranking .boards.rec_boards', title: 'h4', name: '推荐版面', state: 1 },
      { main: '#ranking .boards.hot_boards', title: 'h4', name: '人气排行', state: 2 },
      { main: '#ranking .boards.new_boards', title: 'h4', name: '新开版面', state: 1 },
    ],
    others: [
      { main: '.w_section .boards', name: 'boards', state: 0 },
      { main: '#about', name: 'about', state: 0 },
      { main: '#legal', name: 'legal', state: 0 },
    ]
  },
  simplifyConfig: {
    simplify: true,
    func: {
      '回复': true,
      '模版回复': false,
      '转寄': false,
      '转载': false,
      '关注': false,
      '搜索': false,
      '只看此ID': false,
      '编辑': false,
      '删除': false,
      '推荐': false,
      '标记': true,
    },
  },
  markConfig: {
    foldThreshold: -5,
  },
  boardConfig: {
    refreshTimes: 5,
  },
  init: function () {
    if (navigator.userAgent.match(/(Mobile)|(Android)/)) {
      this.onMobile = true;
    }

    for (const key in this.storageKeys) {
      if (Object.prototype.hasOwnProperty.call(this.storageKeys, key)) {
        const storage_key = this.storageKeys[key];
        this.storageKeys[key] = this.PREFIX_STR + storage_key;
      }
    }
    let storageConfig = JSON.parse(localStorage.getItem(this.storageKeys.STORAGE_CONFIG));
    if (storageConfig != null) {
      Object.assign(this, storageConfig);
    }
    window.smthConfig = this;
  }
};
