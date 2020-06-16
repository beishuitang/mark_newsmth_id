export default {
  PREFIX_STR: "smth_id_mark_",
  storageKeys: {
    STORAGE_USERS_DATA: 'users_data',
    STORAGE_MAINPAGE: 'mainpage',
    STORAGE_FRAME: 'frame',
    STORAGE_FONT_SIZE: "font_size",
    STORAGE_HAND: 'hand',
  },
  init: function () {
    for (const key in this.storage_keys) {
      if (Object.prototype.hasOwnProperty.call(this.storage_keys, key)) {
        const storage_key = this.storage_keys[key];
        this.storage_keys[key] = this.prefix_str + storage_key;
      }
    }
  }
};
