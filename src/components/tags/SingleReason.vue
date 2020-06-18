<template>
  <div>
    <span>{{tagName}} ({{reason.score}})</span>
    <a :href="href">{{href}}</a>
    <p v-html="content"></p>
  </div>
</template>

<script>
import { forageData } from "@/js/mainData";
export default {
  name: "TagReasons",
  props: {
    msg: String,
    reason: Object,
    reasonUrl: String,
    tagName: String
  },
  data: function() {
    return {
      content: ""
    };
  },
  mounted: function() {
    forageData.article.getItem(this.reasonUrl).then(value => {
      this.content = value;
    });
  },
  computed: {
    href: function() {
      return this.reasonUrl;
    }
  }
};
</script>

<style scoped>
</style>
