<template>
  <div>
    <single-reason
      v-for="(reason, reasonUrl) in tag"
      :tagName="tagName"
      :reason="reason"
      :reasonUrl="reasonUrl"
      :key="reasonUrl"
    ></single-reason>
  </div>
</template>

<script>
import SingleReason from "./SingleReason";
export default {
  name: "TagReasons",
  props: {
    msg: String,
    tag: Object,
    tagName: String
  },
  components: {
    SingleReason
  }
};
</script>

<style scoped>
</style>
