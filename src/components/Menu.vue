<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "Menu",
  props: ["config"],
  data: function() {
    return {
      showMenu: false
      // showMenu: config.showMenu ? config.showMenu : false
    };
  },
  components: {}
};
</script>

<style>
</style>
