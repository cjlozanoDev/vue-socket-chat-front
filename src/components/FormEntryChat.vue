<template>
  <div class="form-entry-chat">
    <p>Entrar al chat</p>
    <span class="text-info-field">
      *El nombre de usuario y la sala son obligatorios
    </span>
    <form @submit.prevent="sendInfo">
      <p>
        <input v-model="name" type="text" placeholder="Nombre de usuario" />
      </p>
      <p>
        <input v-model="roomName" type="text" placeholder="Sala de chat" />
      </p>
      <p>
        <input class="input_submit" type="submit" value="Entrar al chat" />
      </p>
      <div v-if="errors.length">
        <b> Por favor corrija el(los) siguiente(s) error(es): </b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormEntryChat",
  data() {
    return {
      name: null,
      roomName: null,
      errors: [],
    };
  },
  methods: {
    sendInfo() {
      if (this.checkForm()) {
        this.$emit("send-info", { name: this.name, roomName: this.roomName });
      }
    },
    checkForm() {
      this.errors = [];
      if (!this.name || this.name === "") {
        this.errors.push("El nombre es obligatorio");
      }
      if (!this.roomName || this.roomName === "") {
        this.errors.push("El nombre de sala es obligatorio");
      }
      return this.errors.length ? false : true;
    },
  },
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
.text-info-field {
  font-size: 0.8em;
  font-weight: bold;
}
ul {
  text-align: left;
}

@media (min-width: 768px) {
  .form-entry-chat {
    width: 400px;
  }
}
</style>
