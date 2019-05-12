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
      <div v-if="isUploading" class="field">
          <span v-if="uploadPercentage !== 100">Subiendo imagen... </span>
          <progress class="progress is-small is-primary"  max="100" :value.prop="uploadPercentage">{{uploadPercentage}} %</progress>
      </div>

      <div class="field">
          <img :src="RESULT_IMG" alt="">
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
      message: "",
      uploadPercentage: 0,
      isUploading: false,
      RESULT_IMG: ''
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
    this.uploadPercentage = 0;
      let formData = new FormData();
      formData.append("upload", this.file);
      parent = this;

      if (parent.file !== null) {
        this.isUploading = true;
        axios
          .post(`http://localhost/api/upload.php`, formData, {
            onUploadProgress: function(progressEvent) {
              this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
            }.bind(this)
          })
          .then(res => {
            console.log(res);
            this.message = res.data.RESPONSE;
            this.RESULT_IMG = res.data.UPLOADED_PATH;
            this.isUploading = false;

          })
          .catch(e => {
            console.log(e);
            this.isUploading = false;
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
  margin-top: 50px;
  padding: 20px;
  border: 3px dashed #cef3ff;
  width: 100%;
  text-align: center;
}
</style>
