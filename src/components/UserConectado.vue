<template>
    <div @click="showUser = !showUser" class="cursor-pointer">
      <img :src="logoSrc" alt="Usuario" height="50" width="50">
      <!-- Puedes agregar estilos adicionales según tus necesidades -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      logoSrc: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        showUser: false,
      };
    },
  };
  </script>
  