<template>
  <div class="room-chat">
    <h3>Sala de chat</h3>
  </div>
</template>

<script>
export default {
  name: "RoomChat",
  created() {
    if (!this.$route.params.nombreSala) {
      this.$router.push({
        name: "Home",
      });
    }
  },
};
</script>
