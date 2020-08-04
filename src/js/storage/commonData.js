export default {
    currentPageHref: location.href,
    mainHash: '',
    mainHashReg: /#!(\w+)(\/|$)/,
    articleReg: /(article\/[\w|.]+\/\d+)(\?p=(\d+))?/,
    init: function () {
        let m = location.hash.match(this.mainHashReg);
        this.mainHash = m ? m[1] : '';
        console.log('init commonData');
        console.log(this);
    }

}