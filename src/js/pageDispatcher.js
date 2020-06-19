import mainData from './mainData'
import pageArticleFunction from './pages/pageArticleFunction'
import pageBoardFunction from './pages/pageBoardFunction'
export default {
    dispatch: function () {
        switch (mainData.mainHash) {
            case 'article':
                pageArticleFunction();
                break;

            case 'board':
                pageBoardFunction();
                break;
            default:
                break;
        }
    }
}