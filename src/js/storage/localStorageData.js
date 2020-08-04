// import config from '../../config/config'
export default {
    modifyTime: '0',
    usersData: {},
    init: function () {
        let usersData = localStorage.getItem(config.storageKeys.STORAGE_USERS_DATA);
        if (usersData != null) {
            this.usersData = JSON.parse(usersData);
        }
        Object.values(this.usersData).forEach((user) => {
            this.reComputeScore(user);
        })
        // this.modifyTime = localStorage.getItem(config.storageKeys.STORAGE_MODIFY_TIME);
        // if (this.modifyTime == null) {
        //     this.createNewModifyBuffer();
        // }

        console.log('init localStorageData');
        console.log(this);
    },
    reComputeScore: function (user) {
        let tags = user.tags;
        let score = 0;
        Object.values(tags).forEach(tag => {
            Object.values(tag).forEach(reason => {
                score += reason.score;
            })
        });
        user.score = score;
    },
    // createNewModifyBuffer: function () {
    //     // TODO 先保存数据
    //     this.modifyTime = new Date().getTime().toString();
    //     this.modifyBuffer = {};
    // },


}