<template>
  <div>
    <form @submit.prevent="modify(1)">
      <input type="text" v-model.trim="tagName" :placeholder="currentTags" />
      <span>({{currentScore(reasonUrl)}})</span>
      <button type="submit">赞美👍</button>
      <button type="button" @click.prevent="modify(-1)">鄙视👎</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TagModifier",
  props: {
    msg: String,
    reasonUrl: String,
    tags: Object
  },
  data: function() {
    return {
      tagName: "",
      myTags: this.tags
    };
  },
  computed: {
    // TODO 转移到article
    currentTags: function() {
      let str = "";
      for (const tagName in this.myTags) {
        if (Object.prototype.hasOwnProperty.call(this.myTags, tagName)) {
          const tag = this.myTags[tagName];
          if (Object.prototype.hasOwnProperty.call(tag, this.reasonUrl)) {
            str = str + tagName + " ";
          }
        }
      }
      return str;
    }
  },
  methods: {
    // TODO 响应式更新？
    currentScore: function name(url) {
      let tagName = this.tagName;
      let result = 0;
      let myTags = this.myTags;
      try {
        result = myTags[tagName][url].score;
      } catch {
        console.log();
      }
      return result;
    },
    modify: function(step) {
      let tag = {};
      tag[this.reasonUrl] = { score: step };
      let myTags = {};
      myTags[this.tagName] = tag;
      this.$emit("modify", myTags);
    }
  }
};
</script>

<style scoped>
</style>
