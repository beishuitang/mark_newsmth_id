<template>
  <div>
    <span>{{tagName}} ({{reason.score}})</span>
    <a :href="href" target="_blank">{{href}}</a>
    <p v-html="content"></p>
  </div>
</template>

<script>
import mainData from "@/js/mainData";
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
    mainData.article.getItem(this.reasonUrl).then(value => {
      this.content = value;
    });
  },
  computed: {
    href: function() {
      let arr = this.reasonUrl.split("/");
      return "#!article/" + arr[0] + "/" + arr[1];
    }
  }
};
</script>

<style scoped>
div {
  border: double;
}
</style>
