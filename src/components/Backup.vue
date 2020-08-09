<template>
  <div>
    <button @click="showImport=!showImport">导入备份</button>
    <button @click="prepareBackup">导出备份</button>
    <div v-if="showImport">
      <input type="file" id="newsmth_backup" accept="text/plain" />
      <button @click="handleFiles">导入数据</button>
    </div>
    <div v-if="showExport">
      <button @click="copyToClipboard">{{dataPrepared?'复制到剪切板':'准备数据中'}}</button>
      <button :disabled="!dataPrepared" @click="saveBackup">{{dataPrepared?'下载':'准备数据中'}}</button>
      <textarea id="copytextarea" v-model="backup" readonly></textarea>
    </div>
  </div>
</template>
<script>
import FileSaver from "file-saver";
// import config from "@/config/config";
import mainData from "@/js/mainData";
export default {
  name: "Backup",
  props: [],
  data: function () {
    return {
      showImport: true,
      showExport: true,
      dataPrepared: false,
      backup: "",
    };
  },
  methods: {
    prepareBackup: function () {
      this.showExport = !this.showExport;
      if (this.showExport) {
        mainData.getAllMarks((marks) => {
          this.backup = JSON.stringify(marks);
          this.dataPrepared = true;
        });
      }
    },
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
      // TODO同时读取多个文件
      reader.readAsText(selectedFile); //读取文件的内容
      reader.onload = function () {
        // console.log("读取结果：", this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        let json = JSON.parse(this.result);
        mainData.mergeMarks(json);
      };
    },
    saveBackup: function () {
      var blob = new Blob([this.backup], {
        type: "text/plain;charset=utf-8",
      });
      let date = new Date();
      let fileName =
        "newsmth_backup_" +
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        ".txt";
      FileSaver.saveAs(blob, fileName);
    },
    copyToClipboard: function () {
      var copyTextarea = document.querySelector("#copytextarea");
      copyTextarea.focus();
      copyTextarea.select();
      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copying text command was " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
    },
  },
};
</script>

<style></style>