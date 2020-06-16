import pageArticle from './pages/pageArticle';
import { sessionData } from './mainData';
export default {
    init: function () {

    },
    onMut: function () {
        switch (sessionData.mainHash) {
            case 'article':
                pageArticle.onMut();
                break;

            default:
                break;
        }
    },
    onHashChange: function () {

    }
}