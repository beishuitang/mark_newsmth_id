<template>
  <div id="setting" v-if="settingConfig.show" style="width: fit-content;height: fit-content">
    <span @click="settingConfig.show=!settingConfig.show" style="float:right">关闭</span>
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
      <div>
        <h3>标注</h3>
        <div>
          分数低于
          <input
            type="number"
            name="foldThreshold"
            id="foldThreshold"
            v-model="markConfig.foldThreshold"
            style="width:2rem"
          />
          的id会被自动折叠
        </div>
      </div>
      <!-- <div>
        <h3>文章列表</h3>
        <div>
          返回空文章列表时，最多自动刷新
          <input type="number" v-model="boardConfig.refreshTimes" style="width:2rem" />
          次
        </div>
      </div> -->
      <div>
        <h3>备份</h3>
        <backup></backup>
      </div>
    </div>
  </div>
</template>
<script>
import Backup from "./Backup";
export default {
  name: "Setting",
  components: { Backup },
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
      markConfig: this.config.markConfig,
      boardConfig: this.config.boardConfig,
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
  margin: auto;
  background-color: bisque;
  padding: 1rem;
  z-index: 1;
}
label {
  margin-right: 1rem;
  display: inline-block;
}
</style>