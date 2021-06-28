<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import VueSocketIO from "vue-socket.io";
import Vue from "vue";

export default {
  name: "Home",
  created() {
    Vue.use(
      new VueSocketIO({
        debug: true,
        connection: "http://192.168.1.50:3000/",
      })
    );
  },
  components: {
    HelloWorld,
  },
};
</script>
