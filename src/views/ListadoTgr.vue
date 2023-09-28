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
  mounted() {
    // Configuración de la solicitud
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:9090/obligaciones/listado',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic c3VidGVsOmV1ajRZOVNEYXVSMjVY'
      }
    };


    // Realizar la solicitud
    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style>
/* Estilos adicionales si es necesario */
</style>
