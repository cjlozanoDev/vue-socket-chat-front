<template>
  <div class="form-entry-chat">
    <p>Entrar al chat</p>
    <form @submit.prevent="sendInfo">
      <p>
        <input type="text" placeholder="Nombre de usuario" />
      </p>
      <p>
        <input type="text" placeholder="Sala de chat" />
      </p>
      <p>
        <input class="input_submit" type="submit" value="Entrar al chat" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormEntryChat",
};
</script>

<style scoped>
.form-entry-chat {
  background: #fff;
  width: 100%;
  border: 1px solid #2c3e50;
}
input {
  height: 40px;
  width: 80%;
}
.input_submit {
  background: #2c3e50;
  color: #fff;
  font-size: 1em;
}
@media (min-width: 768px) {
  .form-entry-chat {
    width: 400px;
  }
}
</style>
