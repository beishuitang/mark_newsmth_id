<template>
  <a>
    <span>{{tagName}}</span>
    ({{tagScore}})
  </a>
</template>

<script>
export default {
  name: "SingleTag",
  props: {
    msg: String,
    tagName: String,
    tag: Object
  },
  data: function() {
    return {
      myTag: this.tag
    };
  },
  computed: {
    tagScore: function() {
      let result = 0;
      Object.values(this.myTag).forEach(reason => {
        result += reason.score;
      });
      return result;
    }
  }
};
</script>

<style scoped>
</style>
