<template>
  <div id="setting" v-if="settingConfig.show" style="width: fit-content;height: fit-content">
    <div>
      <div>
        <h3>显示</h3>
        <label>
          顶部
          <input type="checkbox" v-model="frameConfig.showHead" />
        </label>
        <label>
          底部
          <input type="checkbox" v-model="frameConfig.showFoot" />
        </label>
      </div>
      <div>
        <h3>菜单</h3>
        <label>
          保存密码
          <input type="checkbox" v-model="menuConfig.autoFillPassword" />
        </label>
      </div>
      <div>
        <h3>精简模式</h3>
        <label>
          开启精简模式
          <input type="checkbox" v-model="simplifyConfig.simplify" />
        </label>
        <div v-if="simplifyConfig.simplify">
          <label v-for="(value, name) in simplifyConfig.func" :key="name">
            {{name}}
            <input type="checkbox" v-model="simplifyConfig.func[name]" />
          </label>
        </div>
      </div>
      <div>
        <h3>首页</h3>
        <div>
          <label v-for="(value, index) in mainpageConfig.section" :key="index">
            {{value.name}}
            <select v-model="value.state">
              <option value="2">全显示</option>
              <option value="1">仅标题</option>
              <option value="0">全隐藏</option>
            </select>
          </label>
        </div>
        <div>
          <label v-for="(value, index) in mainpageConfig.others" :key="index">
            {{value.name}}
            <select v-model="value.state">
              <option value="2">显示</option>
              <option value="0">隐藏</option>
            </select>
          </label>
        </div>
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
      settingConfig: this.config.settingConfig,
      menuConfig: this.config.menuConfig,
      simplifyConfig: this.config.simplifyConfig,
      mainpageConfig: this.config.mainpageConfig,
      frameConfig: this.config.frameConfig,
    };
  },
  watch: {
    config: {
      handler: function () {
        localStorage.setItem(
          this.config.storageKeys.STORAGE_CONFIG,
          JSON.stringify(this.config)
        );
      },
      deep: true,
    },
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
  padding: 1rem;
}
label {
  margin-right: 1rem;
  display: inline-block;
}
</style>