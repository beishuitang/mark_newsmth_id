import { sessionData } from './mainData'
import pageArticleFunction from './pages/pageArticleFunction'
export default {
    dispatch: function () {
        switch (sessionData.mainHash) {
            case 'article':
                pageArticleFunction();
                break;

            default:
                break;
        }
    }
}