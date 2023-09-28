<template>
    <div class="relative flex min-h-screen">
        <!-- sidebar -->
        <div
            class="bg-gray-600 text-gray-300 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 md:relative md:-translate-x-0 transform -translate-x-full transition duration-300 ease-in-out">
            <router-link to="/creargravamen" class="flex items-center space-x-2 px-6">
                <img src="../assets/web-img/logo_subtel.png" alt="Imagen" height="100" width="120">
                <span class="text-2xl font-extrabold text-white">SUBTEL</span>
            </router-link>
            <nav>
                <router-link to="/creargravamen" href="creargravamen"
                    class="group flex items-center space-x-2 py-3 px-4 hover:bg-gray-400 rounded hover:text-gray-300 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span class="text-white group-hover:text-gray-200">Crear Gravamen</span>
                </router-link>
                <router-link to="consultareditargravamen"
                    class="group flex items-center space-x-2 py-3 px-4 hover:bg-gray-400 rounded hover:text-gray-300 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span class="text-white group-hover:text-gray-200">Consultar/Editar Gravamen</span>
                </router-link>
                <router-link to="cargadescarga"
                    class="group flex items-center space-x-2 py-3 px-4 hover:bg-gray-400 rounded hover:text-gray-300 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    <span class="text-white group-hover:text-gray-200">Cargar/Descargar</span>
                </router-link>
                <router-link to="generafolios"
                    class="group flex items-center space-x-2 py-3 px-4 hover:bg-gray-400 rounded hover:text-gray-300 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>

                    <span class="text-white group-hover:text-gray-200">Generar Folios</span>
                </router-link>
                <router-link to="recargaanual"
                    class="group flex items-center space-x-2 py-3 px-4 hover:bg-gray-400 rounded hover:text-gray-300 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                    <span class="text-white group-hover:text-gray-200">Recarga Anual</span>
                </router-link>
                <router-link to="utm"
                    class="group flex items-center space-x-2 py-3 px-4 hover:bg-gray-400 rounded hover:text-gray-300 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <span class="text-white group-hover:text-gray-200">UTM</span>
                </router-link>
            </nav>
        </div>
        <!-- Main content  -->
        <div class="flex-1 justify-start">
    <!-- Header -->
    <div v-if="autStore.user" class="bg-white shadow py-4 flex text-sky-600 font-extrabold justify-end">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-1">
            <img class="ml-24" :src="autStore.picture" alt="Usuario" height="50" width="50">
            <a class="mt-4">{{ autStore.authUser }}</a>
            <button @click="autStore.logout" class="mr-24 m-2 bg-cyan-600 text-white rounded justify-end">Salir</button>
        </div>
    </div>
    <!-- Content -->
    <router-view></router-view> <!-- Esto cargará la vista dependiendo de la URL actual -->
</div>

    </div>
</template>

<script setup>

import { useUserStore } from "../store/auth";

const autStore = useUserStore()

</script>

<style>

</style>