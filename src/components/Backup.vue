<template>
  <div>
    <button @click="showImport = !showImport">导入备份</button>
    <button @click="prepareBackup">导出备份</button>
    <input type="number" v-model="limit" style="width: 2rem" />
    <br />
    <br />
    <div v-if="showImport">
      <input type="file" id="newsmth_backup" accept="text/plain" />
      <button @click="handleFiles">导入数据</button>
    </div>
    <div v-if="showExport">
      <div>
        <button
          v-for="(singleData, index) in backup"
          v-bind:key="index"
          :disabled="!dataPrepared"
          :value="index"
          @click="copyToClipboard"
        >
          {{ dataPrepared ? "复制" : "准备数据中" }}{{ index }}
        </button>
      </div>
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
      showImport: false,
      showExport: false,
      dataPrepared: false,
      limit: 10,
      backupData: [],
    };
  },
  computed: {
    backup: function () {
      return this.dataPrepared ? this.backupData : [];
      // return this.dataPrepared ? JSON.stringify(this.backupData) : "{}";
    },
  },
  methods: {
    prepareBackup: function () {
      this.showExport = !this.showExport;
      if (this.showExport) {
        mainData.getAllMarks((marks) => {
          // this.backupData.marks = marks;
          let singleDataMarks = {};
          let singleData = { marks: singleDataMarks };
          let bundleDatas = [singleData];
          for (const key in marks) {
            if (Object.hasOwnProperty.call(marks, key)) {
              const mark = marks[key];
              if (Object.keys(singleDataMarks).length > this.limit) {
                // console.log(Object.keys);
                singleDataMarks = {};
                singleData = { marks: singleDataMarks };
                bundleDatas.push(singleData);
              }
              singleDataMarks[key] = mark;
            }
          }
          bundleDatas.forEach((singleData) => {
            this.backupData.push(JSON.stringify(singleData));
          });
          bundleDatas = [];
          // this.backupData = bundleDatas;
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
        try {
          let json = JSON.parse(this.result);
          mainData.mergeMarks(json.marks);
          alert("导入成功");
        } catch (e) {
          alert("导入失败，请检查输入内容是否完整");
        }
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
    copyToClipboard: function (e) {
      console.log(e.target.value);
      navigator.clipboard.writeText(this.backup[e.target.value]);
      // var copyTextarea = document.querySelector("#copytextarea");
      // copyTextarea.focus();
      // copyTextarea.select();
      // try {
      //   var successful = document.execCommand("copy");
      //   var msg = successful ? "复制成功" : "复制失败";
      //   alert(
      //     msg + "! 粘贴到文件后请检查是否粘贴完整（通常是以连续几个大括号结尾）"
      //   );
      // } catch (err) {
      //   alert("Oops, unable to copy");
      // }
    },
  },
};
</script>

<style></style>