<script>
import UserScore from "./UserScore";
import TagModifier from "./TagModifier";
import UserTags from "./UserTags";
import ModifierSwitch from "./ModifierSwitch";
import ShowSwitch from "./ShowSwitch";
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
      show: this.user.show,
      showContent: this.user.showContent,
      showTags: this.user.showTags,
      showModifier: true
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
    // modifyTag: function(tags) {
    // let modify = this.main_data.get_modify_sample();
    // modify.type = 0;
    // modify.user.id = this.user_id;
    // modify.user.tags = tags;
    // main_data.on_modify(modify, this.article);
    // },
    // modifyState: function(state) {
    // let modify = this.main_data.get_modify_sample();
    // modify.type = 2;
    // modify.user.id = this.user_id;
    // modify.user.state = state;
    // main_data.on_modify(modify, this.article);
    // },
    switchModifier: function() {
      this.showModifier = !this.showModifier;
    }
  }
};
</script>

<style></style>
