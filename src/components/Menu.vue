<template>
  <transition name="slide-left">
    <aside id="menu" v-show="menuConfig.showMenu">
      <slot></slot>
    </aside>
  </transition>
</template>
<script>
export default {
  name: "Menu",
  props: ["menuConfig"],
  data: function() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  left: 0;
  transition: all 0.5s;
}
.slide-left-enter,
.slide-left-leave-to {
  left: -10rem;
}
</style>
