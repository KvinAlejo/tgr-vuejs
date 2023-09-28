<template>
  <div class="mb-2 mt-2 m text-center">
    <div v-if="autStore.user" class="user-panel">

      <a>{{ autStore.authUser }}</a> 
        <img :src="autStore.picture" alt="Usuario" height="50" width="50">
        <li><a @click="autStore.logout" class="px-4 py-2 bg-cyan-600 text-white rounded">Salir</a></li>

    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/auth";

const autStore = useUserStore()

</script>

<style scoped>

</style>
