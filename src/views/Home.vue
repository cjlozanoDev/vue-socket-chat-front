<template>
  <div class="home">
    <h1>Chat Vue js + VueSocketIO</h1>
    <div class="home__form">
      <FormEntryChat />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VueSocketIO from "vue-socket.io";
import Vue from "vue";
import FormEntryChat from "../components/FormEntryChat.vue";

export default {
  name: "Home",
  components: {
    FormEntryChat,
  },
  created() {
    Vue.use(
      new VueSocketIO({
        debug: true,
        connection: "http://192.168.1.50:3000/",
      })
    );
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
