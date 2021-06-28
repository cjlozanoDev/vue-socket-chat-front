<template>
  <div>
    <p>Entrar al chat</p>
    <form @submit.prevent="sendInfo">
      <p>
        <input type="text" placeholder="Nombre de usuario" />
      </p>
      <p>
        <input type="text" placeholder="Sala de chat" />
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormEntryChat",
};
</script>
