<template>
  <div>
    <form @submit.prevent="modify(-1)">
      <input type="text" v-model.trim="tagName" :placeholder="currentTags" />
      <span>({{currentScore}})</span>
      <button type="button" @click.prevent="modify(1)">赞</button>
      <button type="submit">踩</button>
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
      Object.keys(this.tags).forEach(tagName => {
        if (
          Object.prototype.hasOwnProperty.call(
            this.tags[tagName],
            this.reasonUrl
          )
        ) {
          str = str + tagName + " ";
        }
      });
      return str;
    },
    currentScore: function() {
      let tagName = this.tagName;
      let result = 0;
      let tags = this.tags;
      try {
        result = tags[tagName][this.reasonUrl].score;
      } catch {
        console.log();
      }
      return result;
    }
  },
  methods: {
    // TODO 响应式更新？
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
