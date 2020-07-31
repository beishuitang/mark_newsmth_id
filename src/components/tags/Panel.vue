<template>
  <transition name="slide-right">
    <div class="smth_mark_id_panel" v-show="panelConfig.showPanel">
      <div class="boder" v-for="(userData,id) in usersData" :key="id">
        <h3>{{id}}</h3>
        <UserTags :tags="userData.tags"></UserTags>
      </div>
    </div>
  </transition>
</template>

<script>
import UserTags from "./UserTags";
export default {
  name: "Panel",
  components: { UserTags },
  props: {
    msg: String,
    usersData: Object,
    panelConfig: Object,
  },
};
</script>

<style scoped>
.smth_mark_id_panel {
  position: fixed;
  bottom: 0;
  background-color: bisque;
  right: 0;
  max-height: 100%;
  overflow-y: scroll;
  z-index: 1;
}

.boder {
  border: double;
}
.slide-right-enter-active {
  right: -10rem;
  transition: all 0.5s;
}
.slide-right-leave-active {
  right: 0;
  transition: all 0.5s;
}

.slide-right-enter-to,
.slide-right-leave {
  right: 0;
}
.slide-right-enter,
.slide-right-leave-to {
  right: -10rem;
}
</style>
