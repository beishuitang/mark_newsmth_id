export default {
    keyWords: [],
    keyWordsTree: { end: false },
    delimeter: '/',
    init: function () {
        // TODO 清除空字符等
        this.buildTree();
    },
    check: function (subtree, str, index, shift) {
        if (subtree.end == true) {
            return str.substr(index, shift);
        }
        let pos = index + shift;
        if (pos == str.length || !Object.prototype.hasOwnProperty.call(subtree, str[pos])) {
            return false;
        }
        return this.check(subtree[str[pos]], str, index, shift + 1);
    },
    checkKeyWord: function (keyWord) {
        let result = [];
        for (let index = 0; index < keyWord.length; index++) {
            let m = this.check(this.keyWordsTree, keyWord, index, 0);
            if (m) {
                result.push(m);
            }
        }
        return result;
    },
    addChar: function (subtree, str, index) {
        let char = str[index];
        if (!Object.prototype.hasOwnProperty.call(subtree, char)) {
            subtree[char] = { end: false };
        }
        if (index == str.length - 1) {
            subtree[char].end = true;
        } else {
            this.addChar(subtree[char], str, index + 1)
        }
    },
    buildTree: function () {
        this.keyWords.forEach((keyWord) => {
            this.addChar(this.keyWordsTree, keyWord, 0);
        })
    }
}