<template>
    <div>
      <h1>Listado de Datos</h1>
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: [], // Aquí almacenaremos los datos del backend
      };
    },
    mounted() {
      const url = 'http://localhost:9090/obligaciones/listado';
      const username = 'subtel';
      const password = 'euj4Y9SDauR25X';
  
      const headers = {
        Authorization: 'Basic ' + btoa(username + ":" + password),
      };
  
      axios.get(url, { headers })
        .then(response => {
          this.data = response.data; // Almacenamos los datos en la variable "data"
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    },
  };
  </script>
  
  <style>
  /* Estilos adicionales si es necesario */
  </style>
  