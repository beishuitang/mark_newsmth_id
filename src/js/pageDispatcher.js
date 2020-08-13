import mainData from './mainData'
import pageArticleFunction from './pages/pageArticleFunction'
import pageBoardFunction from './pages/pageBoardFunction'
import pageMainpageFunction from './pages/pageMainpageFunction'
import pageSearchFunction from './pages/pageSearchFunction'
export default {
    dispatch: function () {
        switch (mainData.mainHash) {
            case 'article':
                pageArticleFunction();
                break;
            case 's':
                pageSearchFunction();
                break;
            case 'board':
                pageBoardFunction();
                break;
            case 'mainpage':
                pageMainpageFunction();
                break;
            default:
                break;
        }
    }
}