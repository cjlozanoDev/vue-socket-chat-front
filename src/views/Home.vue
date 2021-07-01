<template>
  <div class="home">
    <h1>Chat Vue js + VueSocketIO</h1>
    <div class="home__form">
      <FormEntryChat @send-info="sendInfo" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FormEntryChat from "../components/FormEntryChat.vue";

export default {
  name: "Home",
  components: {
    FormEntryChat,
  },
  methods: {
    sendInfo({ name, roomName }) {
      this.$router.push({
        name: "RoomChat",
        params: {
          nombreSala: roomName,
          nameUser: name,
        },
      });
    },
  },
};
</script>

<style scoped>
.home {
  background: #42b983;
  height: 100%;
  padding: 20px;
}
.home__form {
  display: flex;
  justify-content: center;
}
</style>
