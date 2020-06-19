<script>
import Vue from "vue/dist/vue.esm";
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
    userId: String,
    user: Object
  },
  data: function() {
    return {
      show: this.user.state.showUser,
      showContent: this.user.state.showContent,
      // showTags: false,
      // TODO 响应式更新
      showTags: this.user.state.showTags,
      showModifier: false,
      simplify: true,
      simplifyConfig: Vue.$simplifyConfig
    };
  },
  computed: {
    article: function() {
      return { url: this.articleUrl, content: this.articleContent };
    },
    articleContent: function() {
      return this.$el.querySelector(".a-content p").innerHTML;
    }
  },
  methods: {
    // TODO modify对象滚动
    modifyTag: function(tags) {
      let usersData = {};
      usersData[this.userId] = { tags: tags };
      mainData.acceptModify(usersData);
      mainData.saveArticle(this.article);
    },
    // modifyState: function(state) {
    //   let modify = this.main_data.get_modify_sample();
    //   modify.type = 2;
    //   modify.user.id = this.user_id;
    //   modify.user.state = state;
    //   main_data.on_modify(modify, this.article);
    // },
    switchModifier: function() {
      this.showModifier = !this.showModifier;
    },
    switchTags: function() {
      this.showTags = !this.showTags;
    }
  }
};
</script>

<style></style>
