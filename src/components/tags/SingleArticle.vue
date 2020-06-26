<script>
import UserScore from "./UserScore";
import TagModifier from "./TagModifier";
import UserTags from "./UserTags";
import ModifierSwitch from "./ModifierSwitch";
import ShowSwitch from "./ShowSwitch";
import mainData from "../../js/mainData";
export default {
  name: "SingleArticle",
  components: {
    UserScore,
    TagModifier,
    UserTags,
    ModifierSwitch,
    ShowSwitch
  },
  props: {
    articleUrl: String,
    articleContent: String,
    userId: String,
    user: Object,
    simplifyConfig: Object
  },
  data: function() {
    return {
      state: this.user.state,
      showModifier: false
    };
  },
  computed: {
    article: function() {
      return { url: this.articleUrl, content: this.articleContent };
    }
    // articleContent: function() {
    //   return this.$el.querySelector(".a-content p").innerHTML;
    // }
  },
  methods: {
    // TODO modify对象滚动
    modifyTag: function(tags) {
      let usersData = {};
      usersData[this.userId] = { tags: tags };
      mainData.acceptModify(usersData);
      mainData.saveArticle(this.article);
    },
    modifyConfig: function(key) {
      let usersData = { state: {} };
      usersData.state[key] = this.state[key];
      mainData.acceptModify(usersData);
      mainData.saveArticle(this.article);
    },
    switchModifier: function() {
      this.showModifier = !this.showModifier;
    },
    switchTags: function() {
      this.state.showTags = !this.state.showTags;
      this.modifyConfig("showTags");
    },
    switchShowContent: function() {
      this.state.showContent = !this.state.showContent;
      this.modifyConfig("showContent");
    }
  }
};
</script>

<style></style>
