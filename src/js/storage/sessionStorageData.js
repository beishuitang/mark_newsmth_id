import config from '../../config/config'
export default {
    pageYOffsetData: {},
    prePageHref: location.href,
    preMainHash: '',
    mainpagePart: {},
    picturesXOffset: 0,
    linksBefore: [],
    topicLinks: [],
    init: function () {
        let sessionConfig = JSON.parse(sessionStorage.getItem(config.PROJECT_NAME + '_data'));
        if (sessionConfig != null) {
            Object.assign(this, sessionConfig);
        }
        console.log('init sessionStorageData');
        console.log(this);
    }
}