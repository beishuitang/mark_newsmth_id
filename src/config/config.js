export default {
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
  },
  menuConfig: {
    hand: 'left',
    showMenu: false,
  },
  simplifyConfig: {
    simplify: true,
    'a-u-sex': true,
    'ico-pos-reply': true,
    'ico-pos-template': false,
    'a-func-forward': false,
    'a-func-docross': false,
    'a-addfavor': false,
    'ico-pos-search': false,
    'ico-pos-user': false,
    'a-pos': true,
    'ico-pos-edit': true
  },
  init: function () {
    for (const key in this.storage_keys) {
      if (Object.prototype.hasOwnProperty.call(this.storage_keys, key)) {
        const storage_key = this.storage_keys[key];
        this.storage_keys[key] = this.prefix_str + storage_key;
      }
    }
    let simplifyConfig = localStorage.getItem(this.storageKeys.STORAGE_SIMPLIFY_CONFIG);
    if (simplifyConfig != null) {
      this.simplifyConfig = JSON.parse(simplifyConfig);
    }
    window.smthConfig = this;
  }
};
