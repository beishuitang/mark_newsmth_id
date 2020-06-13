<template>
  <a>
    <span>{{tagName}}</span>
  </a>
</template>

<script>
export default {
  name: "TagReasons",
  props: {
    msg: String,
    tagName: String,
    tag: Object
  },
  computed: {}
};
</script>

<style scoped>
</style>
