<template>
  <a href="javascript:void(0);">
    <span>({{user.score}})</span>
  </a>
</template>

<script>
export default {
  name: "UserScore",
  props: {
    msg: String,
    user: Object
  }
};
</script>

<style scoped>
</style>
