<template>
  <div>
    <input type="file" id="newsmth_backup" accept="application/json" />
    <button @click="handleFiles">导入数据</button>
    <button @click="saveBackup">导出数据</button>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import config from "@/config/config";
import mainData from "@/js/mainData";
export default {
  name: "Backup",
  props: [],
  data: function() {
    return {};
  },
  methods: {
    handleFiles: function handleFiles() {
      var files = document.getElementById("newsmth_backup").files; //获取读取的File对象
      if (files.length == 0) {
        alert("这位地青，你还没选择文件呢");
        return;
      }
      var selectedFile = files[0];
      var name = selectedFile.name; //读取选中文件的文件名
      var size = selectedFile.size; //读取选中文件的大小
      console.log("文件名:" + name + "大小：" + size);
      var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
      reader.readAsText(selectedFile); //读取文件的内容
      reader.onload = function() {
        console.log("读取结果：", this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        let json = JSON.parse(this.result);
        mainData.mergeInputModifies(result.modifies);
        mainData.mergeInputArticles(result.articles);
      };
    },
    saveBackup: function() {
      function save(backup) {
        var blob = new Blob([JSON.stringify(backup)], {
          type: "text/plain;charset=utf-8"
        });
        let date = new Date();
        let fileName =
          "newsmth_backup_" +
          date.getFullYear() +
          "-" +
          date.getMonth() +
          "-" +
          date.getDate() +
          ".json";
        FileSaver.saveAs(blob, fileName);
        mainData.updateModifyTime();
      }
      let backup = {
        config: config,
        usersData: mainData.usersData,
        modifies: {},
        articles: {}
      };
      mainData.getArticles(function(articles) {
        backup.articles = articles;
        mainData.getModifies(function(modifies) {
          backup.modifies = modifies;
          save(backup);
        });
      });
    }
  }
};
</script>

<style></style>