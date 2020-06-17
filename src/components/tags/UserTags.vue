<template>
  <div>
    <single-tag
      v-for="(tag, tagName) in tags"
      :tagName="tagName"
      :tag="tag"
      :key="tagName"
      @click.native="switchSelected(tagName)"
    ></single-tag>

    <tag-reasons
      v-for="(tagName) in selected"
      :tagName="tagName"
      :tag="tags[tagName]"
      :key="tagName+'Reason'"
    ></tag-reasons>
  </div>
</template>

<script>
import SingleTag from "./SingleTag";
import TagReasons from "./TagReasons";
export default {
  name: "UserTags",
  props: {
    msg: String,
    tags: Object
  },
  data: function() {
    return {
      selected: []
    };
  },
  computed: {},
  components: {
    SingleTag,
    TagReasons
  },
  methods: {
    switchSelected: function(tagName) {
      console.log(tagName);
      let index = this.selected.indexOf(tagName);
      if (index === -1) {
        this.selected.push(tagName);
      } else {
        this.selected.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
</style>
