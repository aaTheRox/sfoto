<template>
    <div class="columns is-centered">
      <div class="column is-4">

      <h1 class="title">Iniciar sesión</h1>
      <form>
        <div class="field">
          <label for="Email">Correo electrónico</label>
          <input autocomplete="off" autofocusa id="Email" v-model="email" type="text" class="input">
        </div>

        <div class="field">
          <label for="Password">Contraseña</label>
          <input id="Password" v-model="password" type="password" class="input">
        </div>

        <div class="field">
          <button class="button is-light">Iniciar sesión</button>
          <p>No tienes cuenta? <a href="#">Registrarse</a></p>
        </div>

      </form>
      </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

