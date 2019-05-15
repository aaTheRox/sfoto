<template>
<div>
  <div v-if="message.length > 0" class="notification">
    <i class="fas fa-check"></i>&nbsp; {{ message }}
  </div>
<div v-if="isUploading" :style="{width: uploadPercentage + '%'}" class="loading"></div>
  <div v-if="!hasUploaded" class="columns multiline">
    <div class="column is-12 upload-box" @dragover.prevent @drop="handleOnDrop">
      <h1>
        <i @click="$refs.upload.click()" class="fas fa-cloud-upload-alt"></i>
      </h1>
      <input ref="upload" @change="handleFileName" class="file-input is-hidden" type="file">
      <span>{{ file_name }}</span>

      <div class="field has-text-centered">
        <br>
        <button :disabled="file_name==''" @click="handleUpload" class="button is-success is-large"><i class="fas fa-upload"></i>&nbsp; Subir archivos</button>
      </div>
      <div v-if="isUploading" class="field">
        <span v-if="uploadPercentage > 0">Subiendo imagen...</span>
        <!--<progress
          class="progress is-small is-primary"
          max="100"
          :value.prop="uploadPercentage"
        >{{uploadPercentage}} %</progress>-->
      </div>
    </div>
  </div>

  <div v-else>
    <div v-if="!error" class="columns">
      <div class="column is-12">
        <div class="field has-text-centered">
          <a target="_blank" :href="RESULT_IMG">
            <img class="preview" :src="RESULT_IMG" alt>
          </a>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-6 has-text-centered">
        <div class="field">
          <h3 class="custom-title">
            Puedes copiar el siguiente código para insertar tu imagen en un foro</h3>
          <input type="text" class="input has-text-centered" :value="'[IMG]' +RESULT_IMG+ '[/IMG]'">
        </div>

        <div class="field">
          <button @click="reset" class="button is-danger">
            <i class="fas fa-sync-alt"></i>&nbsp; Subir otra imagen
          </button>
        </div>
      </div>
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
      file_name: '',
      file: null,
      message: "",
      uploadPercentage: 0,
      isUploading: false,
      hasUploaded: false,
      RESULT_IMG: ""
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
      this.file = e.dataTransfer.files[0]
      this.file_name = e.dataTransfer.files[0].name;
    },
    handleUpload() {
      this.hasUploaded = false;
      this.uploadPercentage = 0;
      let formData = new FormData();
      formData.append("upload", this.file);
      parent = this;

      if (parent.file !== null) {
        this.isUploading = true;
        axios
          .post(`http://localhost/api/upload.php`, formData, {
            onUploadProgress: function(progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }.bind(this)
          })
          .then(res => {
            console.log(res.data);
           if(res.data.error) {
            this.error = true;
             this.message = res.data.RESPONSE;
             this.uploadPercentage = 0;
            } else {
            this.error = false;
              console.log(res);
            this.message = res.data.RESPONSE;
            this.RESULT_IMG = res.data.UPLOADED_PATH;
            this.isUploading = false;
            this.hasUploaded = true;
            this.uploadPercentage = 0;
            }
          })
          .catch(e => {
            console.log(e);
            this.message = res.data.RESPONSE;
            this.isUploading = false;
          });
      }
    },

    reset() {
      this.hasUploaded = false;
      this.message = "";
      this.RESULT_IMG = "";
    }
  }
};
</script>


<style>
/*error: #9a2d2d;
success: #049885;
grey: #292929;
*/
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
.preview {
  max-height: 500px;
  max-width: 600px;
}

h3.custom-title {
  font-size: 1.1em;
  margin-bottom: 10px;
  font-weight: bold;
}

.mtop-15 {
  margin-top: 15px;
}
.loading {
  width: 0;
  height: 4px;
  background: #049885;
  position: fixed;
  top: 0;
  clear: both;
  left: 0;
  z-index: 100;
  transition-duration: .3s;
  transition-delay: .3s;
}
</style>
