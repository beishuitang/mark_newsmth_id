<template>
  <div v-show="show()" @click="nextPage">
    <!-- <a :href="href" id="next_page"></a> -->
  </div>
</template>

<script>
export default {
  name: "QuickBrowse",
  props: {
    mainData: Object
  },
  data: function() {
    return {
      href: "",
      linksBeforeTopic: this.mainData.linksBeforeTopic,
      topicLinks: this.mainData.topicLinks
    };
  },
  methods: {
    show: function() {
      return true;
    },
    nextPage: function() {
      console.log("next page");
      switch (this.mainData.mainHash) {
        case "article":
          this.articlePage();
          break;

        case "board":
          this.boardPage();
          break;
        default:
          break;
      }
    },
    articlePage: function() {
      let currentPageEl = document.querySelector(".page-select");
      let nextPageEl = currentPageEl.nextElementSibling;
      if (nextPageEl != null) {
        // this.href = nextPageEl.querySelector("a").href;
        nextPageEl.querySelector("a").click();
      } else if (this.topicLinks.length > 0) {
        let el = currentPageEl.querySelector("a");
        el.href = this.topicLinks.pop();
        console.log(el.href);
        // "https://www.newsmth.net/nForum/article/ChildEducation/1251928?p=5";
        el.click();
      }
    },
    boardPage: function() {
      let currentPageEl = document.querySelector(".page-select");
      // let nextPageEl = currentPageEl.nextElementSibling;
      // if (nextPageEl != null) {
      // this.href = nextPageEl.querySelector("a").href;
      // nextPageEl.querySelector("a").click();
      // } else if (this.topicLinks.length > 0) {
      let el = currentPageEl.querySelector("a");
      el.href = this.topicLinks.pop();
      // "https://www.newsmth.net/nForum/article/ChildEducation/1251928?p=5";
      el.click();
    }
    // }
  },
  computed: {}
};
</script>

<style scoped>
#html #html_body div {
  position: fixed;
  height: 4rem;
  width: 4rem;
  right: 3rem;
  bottom: 5rem;
  z-index: 2;
  background-color: #598ede;
  border-radius: 50%;
  opacity: 0.5;
}
</style>