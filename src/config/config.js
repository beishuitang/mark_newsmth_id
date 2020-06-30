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
    STORAGE_ID: 'id'
  },
  menuConfig: {
    hand: 'left',
    showMenu: false,
    autoFillPassword: false
  },
  simplifyConfig: {
    simplify: true,
    // 'a-u-sex': true,
    'ico-pos-reply': true,
    'ico-pos-template': false,
    'a-func-forward': false,
    'a-func-docross': false,
    'a-addfavor': false,
    'ico-pos-search': false,
    'ico-pos-user': false,
    // 'a-pos': true,
    // 'ico-pos-edit': false
    showModifierSwitch: true
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
    let simplifyConfig = localStorage.getItem(this.storageKeys.STORAGE_SIMPLIFY_CONFIG);
    if (simplifyConfig != null) {
      this.simplifyConfig = JSON.parse(simplifyConfig);
    }
    window.smthConfig = this;
  }
};
