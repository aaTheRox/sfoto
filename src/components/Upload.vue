<template>
  <div class="columns is-centered">
    <div class="upload-box" @dragover.prevent @drop="handleOnDrop">
      <h1>
        <i @click="$refs.upload.click()" class="fas fa-cloud-upload-alt"></i>
        <input ref="upload" @change="handleFileName" class="file-input is-hidden" type="file">
      </h1>
      <span>{{ file_name }}</span>

      <div class="field has-text-centered">
        <br>
        <button @click="handleUpload" class="button is-success is-large">Subir</button>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "upload",

  data() {
    return {
      file_name: "Elige un archivo...",
      file: null,
      message: ""
    };
  },

  methods: {
    handleFileName(e) {
      this.file = this.$refs.upload.files[0];
      this.file_name = this.$refs.upload.files[0].name;
    },
    handleOnDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      this.file = e.dataTransfer.files;
      this.file_name = e.dataTransfer.files[0].name;
      //this.handleUpload();
    },
    handleUpload() {
      let formData = new FormData();

      parent = this;
      if (parent.file !== null) {
        axios
          .post("/upload.php", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function() {
            parent.message = "La foto se ha subido correctamente.";
          })
          .catch(function() {
            parent.message = "Algo ha fallado.";
          });
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 4em;
  color: #275f70;
}
.upload-box {
  padding: 20px;
  border: 3px dashed #cef3ff;
  width: 100%;
  text-align: center;
}
</style>
