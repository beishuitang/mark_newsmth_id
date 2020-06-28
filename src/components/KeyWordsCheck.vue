<template>
  <!-- <transition name="slide-left"> -->
  <div>
    <button @click="check">check</button>
    <div>
      <ul>
        <li v-for="keyword in matchedKeywords" :key="keyword" :keyword="keyword">
          <span>{{keyword}}</span>
        </li>
      </ul>
    </div>
    <div>
      <span></span>
    </div>
  </div>
  <!-- </transition> -->
</template>
<script>
import keyWordsUtil from "../js/keyWordsUtil";
export default {
  name: "KeyWordsCheck",
  props: ["textEl", "buttonEl"],
  data: function() {
    return {
      matchedKeywords: [],
      keyWordsUtil: keyWordsUtil
    };
  },
  methods: {
    check: function() {
      this.matchedKeywords.splice(0, this.matchedKeywords.length);
      let result = this.keyWordsUtil.checkKeyWord(this.textEl.value);
      result.forEach(keyword => {
        this.matchedKeywords.push(keyword);
      });
    }
  }
};
</script>

<style scoped>
</style>