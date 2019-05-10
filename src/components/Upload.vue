<template>
<div class="columns is-centered">

<div class="column is-4">
 <div class="file has-name is-danger">
    <label class="file-label">
      <input class="file-input" type="file" ref="file" @change="uploadFile()">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">Choose a file…</span>
      </span>
      <span class="file-name">{{ file_name }}</span>
    </label>

  </div>

   <div class="field has-text-centered">
       <br>
      <button class="button is-success is-large ">Subir</button>
  </div>
 </div>

 

</div>

</template>

<script>
export default {
  name: 'upload',

  data() {
    return {
      file_name: 'Elige un archivo...'
    };
  },

  methods: {
      uploadFile() {
        this.file_name = this.$refs.file.files[0].name;
      }
  }
};
</script>
