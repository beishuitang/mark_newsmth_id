<script>
import UserScore from "./UserScore";
import TagModifier from "./TagModifier";
import UserTags from "./UserTags";
import ModifierSwitch from "./ModifierSwitch";
import ShowSwitch from "./ShowSwitch";
import mainData from "../../js/mainData";
import config from "../../config/config";
export default {
  name: "SingleArticle",
  components: {
    UserScore,
    TagModifier,
    UserTags,
    ModifierSwitch,
    ShowSwitch,
  },
  props: {
    articleUrl: String,
    articleContent: String,
    userId: String,
    user: Object,
    simplifyConfig: Object,
  },
  data: function () {
    return {
      state: this.user.state,
      showModifier: false,
      simplified: this.simplifyConfig.simplify,
      switchScore: false,
    };
  },
  computed: {
    simplify: function () {
      return this.simplified && this.simplifyConfig.simplify;
    },
    showContent: function () {
      return this.switchScore
        ? !this.originShowContent
        : this.originShowContent;
    },
    originShowContent: function () {
      return this.user.score >= config.markConfig.foldThreshold;
    },
  },
  methods: {
    // TODO modify对象滚动
    modifyTag: function (modify) {
      modify.url = this.articleUrl;
      modify.p = this.articleContent;
      modify.id = this.userId;
      modify.m = new Date().getTime();
      mainData.acceptModify(modify);
    },
    modifyConfig: function (key) {
      let usersData = { state: {} };
      usersData.state[key] = this.state[key];
      mainData.acceptModify(usersData);
      mainData.saveArticle(this.article);
    },
    switchModifier: function () {
      this.showModifier = !this.showModifier;
    },
    switchTags: function () {
      this.state.showTags = !this.state.showTags;
      this.modifyConfig("showTags");
    },
    switchShowContent: function () {
      this.switchScore = !this.switchScore;
    },
  },
};
</script>

<style></style>
