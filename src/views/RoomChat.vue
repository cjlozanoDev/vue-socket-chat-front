<template>
  <div class="room-chat">
    <h1>Chat sistema cj</h1>
    <div class="room-chat__box">
      <div class="room-chat__box__users">
        <div
          v-for="user in users"
          :key="user.id"
          class="room-chat__box__users_user"
        >
          <div class="avatar" />
          <span class="user_name"> {{ user.name }} </span>
        </div>
      </div>

      <div class="room-chat__box__main">
        <div class="room-chat__box__main__header">
          <span class="room-chat__box__main__header-title"> Sala de chat </span>
          <span class="room-chat__box__main__header-room-text">
            {{ nameRoom }}
          </span>
        </div>
        <div class="room-chat__box__main__messages"></div>
      </div>
    </div>
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

<style scoped>
.room-chat {
  background: #f4f6f9;
  height: 100%;
  padding: 20px;
}
.room-chat__box {
  position: relative;
  background: #fff;
  display: flex;
  width: 100%;
  height: 80%;
  border: 1px solid #eeeff0;
}
.room-chat__box__users {
  width: 200px;
  height: 100%;
  border: 1px solid #eeeff0;
  overflow-y: auto;
}
.room-chat__box__users_user {
  display: flex;
  align-items: center;
  padding: 5px;
}
.room-chat__box__main {
  width: 100%;
}
.room-chat__box__main__header {
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eeeff0;
}
.room-chat__box__main__header-title {
  font-size: 1.4em;
  margin-right: 10px;
}
.room-chat__box__main__header-room-text {
  white-space: nowrap;
  font-size: 1.1em;
}
.user_name {
  white-space: nowrap;
}
.avatar {
  background-image: url("http://i.stack.imgur.com/Dj7eP.jpg");
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
}
</style>
