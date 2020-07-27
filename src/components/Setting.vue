<template>
  <div id="setting" v-if="setting.show" style="width: fit-content;height: fit-content">
    <div>
      <h3>菜单</h3>
      <label>
        保存密码
        <input type="checkbox" v-model="menu.autoFillPassword" />
      </label>
      <h3>精简模式</h3>
      <label>
        开启
        <input type="checkbox" v-model="simplify.simplify" />
      </label>
      <div>
        <label v-for="(value, name) in simplify.func" :key="name">
          {{name}}
          <input type="checkbox" v-model="simplify.func[name]" />
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Setting",
  props: {
    msg: String,
    config: Object,
  },
  data: function () {
    return {
      setting: this.config.setting,
      menu: this.config.menu,
      simplify: this.config.simplify,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#setting {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: bisque;
}
label {
  margin-right: 1rem;
}
</style>