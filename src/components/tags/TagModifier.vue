<template>
  <div>
    <form @submit.prevent="modify(1)">
      <button
        type="button"
        @click.prevent="modify(-1)"
      >测试👎</button>
      <input
        type="text"
        v-model.trim="tagName"
        :placeholder="currentTags"
      />
      <span>({{currentScore(reasonUrl)}})</span>
      <button type="submit">👍</button>
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
      tagName: ""
    };
  },
  computed: {
    // TODO 转移到article
    currentTags: function() {
      let str = "";
      for (const tagName in this.tags) {
        if (Object.prototype.hasOwnProperty.call(this.tags, tagName)) {
          const tag = this.tags[tagName];
          if (Object.prototype.hasOwnProperty.call(tag, this.reasonUrl)) {
            str = str + tagName + " ";
          }
        }
      }
      return str;
    }
  },
  methods: {
    currentScore: function name(url) {
      let tagName = this.tagName;
      let result = 0;
      let tags = this.tags;
      try {
        result = tags[tagName][url].score;
      } catch {
        console.log();
      }
      return result;
    },
    modify: function(step) {
      let tag = {};
      tag[this.reasonUrl] = { score: step };
      let tags = {};
      tags[this.tagName] = tag;
      this.$emit("modify", tags);
    }
  }
};
</script>

<style scoped>
</style>
