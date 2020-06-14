<template>
  <a>
    <span>{{tagName}}</span>
    ({{tagScore}})
  </a>
</template>

<script>
export default {
  name: "ShowSwitch",
  props: {
    msg: String,
    tagName: String,
    tag: Object
  },
  computed: {
    tagScore: function() {
      let result = 0;
      for (const reasonUrl in this.tag) {
        if (Object.prototype.hasOwnProperty.call(this.tag, reasonUrl)) {
          const reason = this.tag[reasonUrl];
          result += reason.score;
        }
      }
      return result;
    }
  }
};
</script>

<style scoped>
</style>
