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
        <div class="room-chat__box__main__messages">
          <div v-for="message in messages" :key="message.date">
            <div v-if="message.name === 'Administrador'" class="message_admin">
              {{ message.message }}
            </div>
          </div>
        </div>
        <div class="room-chat__box__main__actions">
          <input
            class="room-chat__box__main__actions__input"
            type="text"
            placeholder="Escribe un mensaje"
          />
          <button>
            <span class="material-icons"> send </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      messages: [],
    };
  },
  created() {
    const existValues = this.checkExistValues();

    if (existValues) {
      this.listenersSockets();
    }
  },
  destroyed() {
    this.$socket.emit("disconnect", null);
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
    listenersSockets() {
      this.sockets.subscribe("listUsers", (data) => {
        console.log(data);
        this.users = data;
      });
      this.sockets.subscribe("createMessage", (data) => {
        this.messages.push(data);
      });
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
  display: flex;
  flex-direction: column;
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
.room-chat__box__main__messages {
  position: relative;
  height: 80%;
}
.room-chat__box__main__actions {
  display: flex;
  margin-top: auto;
  gap: 8px;
  padding: 15px;
  width: 100%;
}
.room-chat__box__main__actions__input {
  height: 38px;
  width: 100%;
  margin-right: 8px;
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
.message_admin {
  display: flex;
  justify-content: center;
  color: #70757a;
  font-size: 0.9em;
  padding: 10px;
}
</style>
