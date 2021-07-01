<template>
  <div class="room-chat">
    <h3>Sala de chat</h3>
  </div>
</template>

<script>
import VueSocketIO from "vue-socket.io";
import Vue from "vue";

export default {
  name: "RoomChat",
  props: {
    nameUser: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      nameRoom: "",
      users: [],
    };
  },
  created() {
    const existValues = this.checkExistValues();

    if (existValues) {
      this.connectionSocket();
      this.listenersSockets();
    }
  },
  methods: {
    checkExistValues() {
      this.nameRoom = this.$route.params.nombreSala;
      if (!this.nameRoom || !this.nameUser) {
        this.$router.push({
          name: "Home",
        });
        return false;
      }
      return true;
    },
    connectionSocket() {
      Vue.use(
        new VueSocketIO({
          debug: true,
          connection: "http://192.168.1.50:3000/",
        })
      );
    },
    listenersSockets() {
      this.$socket.emit(
        "entryChat",
        { name: this.nameUser, room: this.nameRoom },
        (data) => {
          this.users = data;
        }
      );
    },
  },
};
</script>
