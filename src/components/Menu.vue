<script>
export default {
  name: "Menu",
  props: ["menuConfig"],
  data: function() {
    return {
      // showMenu: this.menuConfig.showMenu
      // showMenu: config.showMenu ? config.showMenu : false
    };
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
