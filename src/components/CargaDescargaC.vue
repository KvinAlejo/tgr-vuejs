<template>
    <!-- Aquí puedes colocar la estructura del componente si es necesario -->
</template>
  
<script>
import axios from 'axios';
import { BASE_URL, JSON_CONTENT_TYPE, BUSQUEDA, AUTHORIZATION, PENDIENTES } from '../properties'

export default {
    props: {
        folio: String,
        fechaEmision: String,
        fechaVencimiento: String,
        rut: String,
    },
    methods: {
        cambiarFormatoFechaBusqueda(fecha) {
            if (fecha) {
                const partesFecha = fecha.split('-'); // Divide la fecha en partes
                if (partesFecha.length === 3) {
                    // Si la fecha tiene tres partes (año, mes, día), cámbialas de lugar
                    const dia = partesFecha[2];
                    const mes = partesFecha[1];
                    const anio = partesFecha[0];
                    return `${dia}-${mes}-${anio}`;
                }
            }
            return fecha;
        },
        formatearFechaPendientes(fecha) {
            if (fecha) {
                const fechaObj = new Date(fecha);
                const dia = fechaObj.getDate();
                const mes = fechaObj.getMonth() + 1; // Sumar 1 porque los meses en JavaScript van de 0 a 11
                const anio = fechaObj.getFullYear();
                return `${dia}-${mes}-${anio}`;
            }
            return fecha;
        },

        realizarBusquedaCarga(folio, fechaEmision, fechaVencimiento, rut) {
            this.buscarCarga(folio, fechaEmision, fechaVencimiento, rut);
        },
        buscar() {
            // Crear un objeto para almacenar los parámetros de búsqueda
            let data = JSON.stringify({
                folio: this.folio,
                fechaEmision: this.cambiarFormatoFechaBusqueda(this.fechaEmision), // Cambia el formato de fecha
                fechaVencimiento: this.cambiarFormatoFechaBusqueda(this.fechaVencimiento), // Cambia el formato de fecha
                rut: this.rut
            });

            // Realizar la solicitud HTTP con los parámetros de búsqueda en formato JSON
            let config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${BASE_URL}${BUSQUEDA}`,
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': AUTHORIZATION,
                    "Access-Control-Allow-Origin": "*",
                },
                data: data
            };

            console.log(" config " + config)

            axios.request(config)
                .then((response) => {
                    // Transformar las fechas en el array de objetos
                    const formattedData = response.data.map(item => {
                        for (const key in item) {
                            if (item.hasOwnProperty(key) && typeof item[key] === 'string' && key.includes('fecha')) {
                                item[key] = this.formatearFechaPendientes(item[key].replace(/"/g, '')); // Remover las comillas dobles
                            }
                        }
                        return item;
                    });

                    // Emitir el evento con los datos obtenidos
                    this.$emit('data-fetched', formattedData);
                })
                .catch((error) => {
                    console.log("Error obteniendo las obligaciones pendientes " + error);
                });
        },
        buscarCarga(folio, fechaEmision, fechaVencimiento, rut) {
            // Crear un objeto para almacenar los parámetros de búsqueda
            let data = JSON.stringify({
                folio,
                fechaEmision,
                fechaVencimiento,
                rut
            });

            // Realizar la solicitud HTTP con los parámetros de búsqueda en formato JSON
            let config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${BASE_URL}${BUSQUEDA}`,
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': AUTHORIZATION,
                    "Access-Control-Allow-Origin": "*",
                },
                data: data
            };

            console.log(" config " + config)

            axios.request(config)
                .then((response) => {
                    // Transformar las fechas en el array de objetos
                    const formattedData = response.data.map(item => {
                        for (const key in item) {
                            if (item.hasOwnProperty(key) && typeof item[key] === 'string' && key.includes('fecha')) {
                                item[key] = this.formatearFechaPendientes(item[key].replace(/"/g, '')); // Remover las comillas dobles
                            }
                        }
                        return item;
                    });

                    // Emitir el evento con los datos obtenidos
                    this.$emit('data-fetched', formattedData);
                })
                .catch((error) => {
                    console.log("Error obteniendo las obligaciones pendientes " + error);
                });
        },
        buscarPendientes() {
            let config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${BASE_URL}${PENDIENTES}`,
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': AUTHORIZATION,
                }
            };

            axios.request(config)
                .then((response) => {
                    // Transformar las fechas en el array de objetos
                    const formattedData = response.data.map(item => {
                        for (const key in item) {
                            if (item.hasOwnProperty(key) && typeof item[key] === 'string' && key.includes('fecha')) {
                                item[key] = this.formatearFechaPendientes(item[key].replace(/"/g, '')); // Remover las comillas dobles
                            }
                        }
                        return item;
                    });

                    // Emitir el evento con los datos obtenidos
                    this.$emit('data-fetched', formattedData);
                })
                .catch((error) => {
                    console.log("Error obteniendo las obligaciones pendientes " + error);
                });

        }
    },
};
</script>
  
<style scoped>
/* Agrega estilos si es necesario */
</style>
  