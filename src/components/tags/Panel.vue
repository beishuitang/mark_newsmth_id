<template>
  <transition name="slide-right">
    <div
      style="height:100%;min-width:13rem"
      class="smth_mark_id_panel"
      v-show="panelConfig.showPanel"
    >
      <div>
        <div class="boder" v-for="(userData,id) in filtedUsersData" :key="id">
          <h3>{{id}} ({{userData.score}})</h3>
          <UserTags :tags="userData.tags"></UserTags>
        </div>
        <br />
      </div>
      <div class="search">
        <input type="text" placeholder="搜索" v-model="searchText" />
        <select v-model.number="panelConfig.scoreFilter" style="height:2rem">
          <option disabled>id评分</option>
          <option value="1">非正</option>
          <option value="0">全部</option>
          <option value="-1">非负</option>
        </select>
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
  data: function () {
    return {
      searchText: "",
    };
  },
  computed: {
    filtedUsersData: function () {
      let result = {};
      let reg = new RegExp(this.searchText, "ig");
      Object.keys(this.usersData).forEach((key) => {
        let userData = this.usersData[key];
        if (userData.score * this.panelConfig.scoreFilter < 0) {
          return;
        }
        let tags = userData.tags;
        if (Object.keys(tags).length !== 0) {
          if (key.match(reg)) {
            result[key] = userData;
          } else {
            Object.keys(tags).forEach((tagName) => {
              if (tagName.match(reg)) {
                result[key] = userData;
              }
            });
          }
        }
      });
      return result;
    },
  },
};
</script>

<style scoped>
.smth_mark_id_panel {
  position: fixed;
  bottom: 0;
  background-color: bisque;
  right: 0;
  overflow-y: scroll;
  z-index: 1;
}

.boder {
  border: double;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
.search {
  position: fixed;
  bottom: 0;
}
.slide-right-enter-active {
  right: -100%;
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
  right: -100%;
}
</style>
