<template>
    <div class="p-3 text-gray-600 font-extrabold">
        <!-- Campos de entrada -->
        <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-5 px-12 lg:px-24 shadow-xl mb-10">
            <h2 class="text-xl font-bold mb-4 text-center">Carga/Descarga</h2>
            <div class="p-1 grid grid-cols-2 md:grid-cols-3 gap-3 formulario">
                <div class="mb-2">
                    <label class="block mb-1" for="folio">Folio:</label>
                    <input type="text" id="folio" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" v-model="folio"
                        @input="onInputFolio" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="fechaEmision">Fecha de Emisión:</label>
                    <input type="date" id="fechaEmision" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="fechaEmision" />
                </div>
                <div class="mb-2 flex items-end">
                    <CargaDescargaC :folio="folio" :fechaEmision="fechaEmision" :fechaVencimiento="fechaVencimiento"
                        :rut="rut" ref="busqueda" @data-fetched="handleDataFetched" />
                    <button @click="activarBusqueda" class="px-4 py-2 mb-1 bg-amber-400 text-white rounded">Buscar</button>
                </div>

                <div class="mb-2">
                    <label class="block mb-1" for="rut">Rut:</label>
                    <input type="text" id="rut" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" v-model="rut"
                        @input="onInputRut" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="fechaVencimiento">Fecha de Vencimiento:</label>
                    <input type="date" id="fechaVencimiento" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="fechaVencimiento" />
                </div>
                <div class="mb-2 flex items-end">
                    <button @click="limpiar" class="px-4 py-2 mb-1 bg-sky-700 text-white rounded">Limpiar</button>
                </div>
                <!-- Select de Carga/Descarga -->
                <div class="mb-2 col-span-2 md:col-span-1">
                    <label class="block mb-2">Carga/Descarga:</label>
                    <select v-model="cargaDescarga" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
                        <option value="null">Seleccione</option>
                        <option value="carga">Carga</option>
                        <option value="descarga">Descarga</option>
                    </select>

                </div>

                <!-- Modal de envio descarga -->
                <transition name="fade">
                    <div>
                        <button @click="obsModal = true" v-if="cargaDescarga === 'descarga'"
                            class="mt-8 px-4 py-2 bg-sky-400 text-white rounded">Ingreso de Observación</button>

                        <!-- Indicador visual -->
                        <span v-if="observacionIngresada" class="ml-2 text-green-500">✔️</span>

                        <div v-if="obsModal" class="modal">
                            <div class="modal-content">
                                <div class="bg-white py-2 lg:px-6 shadow-xl mb-4">
                                    <h2 class="text-xl font-bold mb-4 text-center">Ingreso de observación de descarga</h2>
                                    <input type="text" v-model="obsText">
                                    <div class="grid gap-1 grid-cols-2">
                                        <div class="mb-4 mt-6 ml-28 text-center">
                                            <button @click="guardarObservacion"
                                                class="px-8 py-2 bg-sky-400 text-white rounded">Guardar</button>
                                        </div>
                                        <div class="mb-4 mt-6 ml-28 text-center">
                                            <button @click="obsModal = false"
                                                class="px-8 py-2 bg-amber-400 text-white rounded">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <!-- Botón de Enviar a TGR -->
                <div class="mb-2 flex items-end">
                    <button @click="enviarTGR" class="px-4 py-2 mt-5 mt-12 bg-sky-700 text-white rounded"
                        :disabled="loadingEnviarTGR">
                        <span v-if="loadingEnviarTGR">Enviando...</span>
                        <span v-else>Enviar a TGR</span>
                    </button>
                </div>

                <!-- Botón de buscar pendientes -->
                <div class="mb-2">
                    <CargaDescargaC ref="pendientes" @data-fetched="handleDataFetched" />
                    <button @click="activarPendientes" class="px-4 py-2 mt-5 mt-12 bg-sky-700 text-white rounded"
                        :disabled="loadingPendientes">
                        <span v-if="loadingPendientes">Enviando...</span>
                        <span v-else>Buscar pendientes</span>
                    </button>
                </div>

            </div>
        </div>

        <!-- Grilla con los Datos -->
        <div class="table-container">
            <h1>Listado de Datos</h1>
            <table v-if="data">
                <thead>
                    <tr>
                        <th>Enviar</th>
                        <th>Folio</th>
                        <th>RUT</th>
                        <th>F. Vencimiento</th>
                        <th>Fecha de Emisión</th>
                        <th>Monto UTM</th>
                        <th>Tipo</th>
                        <th>Monto Total</th>
                        <th>Meses</th>
                        <th>Marca</th>
                        <th>Glosa de Status</th>
                        <th>Status</th>
                        <th>Estado</th>
                        <th>Estado TGR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" :key="item.idCobroGravamen">
                        <td><input type="checkbox" :checked="isSelected(item)" @change="toggleSelection(item)" /></td>
                        <td>{{ item.folio }}</td>
                        <td>{{ item.rut }}</td>
                        <td>{{ item.fechaVencimiento }}</td>
                        <td>{{ item.fechaEmision }}</td>
                        <td>{{ item.montoUtm }}</td>
                        <td>{{ item.tipo }}</td>
                        <td>{{ item.montoTotal }}</td>
                        <td>{{ item.meses }}</td>
                        <td>{{ item.marca }}</td>
                        <td>{{ item.glosaStatus }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.estado }}</td>
                        <td>
                            <button class="mt-2 px-2 py-2 mb-1 bg-sky-700 text-white rounded" :disabled="loadingEstado"
                                v-on:click.stop="verEstadoTGR(item.rutaM1)">Ver Estado TGR
                                <!-- <span v-if="loadingEstado">Cargando...</span>
                                <span v-else>Ver Estado TGR</span> -->
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else>No hay datos disponibles</p>
        </div>
        <transition name="fade">
            <div class="modal" :class="{ 'show': showModal }" v-if="showModal">
                <div class="modal-content">
                    <div class="bg-white py-2 lg:px-6 shadow-xl mb-4">
                        <h2 class="text-xl font-bold mb-4 text-center">Estado TGR</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID TGR</th>
                                    <th>ETAPA</th>
                                    <th>Estado TGR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--tr v-for="items in datamodal" :key="items.data.obligacion.id"-->
                                <tr v-for="(tgr, index) in datamodal " :key="index">
                                    <td>{{ tgr.obligacion.id }}</td>
                                    <td>{{ tgr.etapa }}</td>
                                    <td>{{ tgr.estado.nombreEstado }}</td>
                                    <!--td>{{ estadoTGR }}</td-->
                                </tr>
                            </tbody>
                        </table>
                        <div class="mb-4 mt-6 ml-28 text-center">
                            <button @click="showModal = false"
                                class="px-8 py-2 bg-amber-400 text-white rounded">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import CargaDescargaC from '../components/CargaDescargaC.vue';
import { BASE_URL, JSON_CONTENT_TYPE, CARGA, DESCARGA, AUTHORIZATION, ESTADO } from '../properties'

export default {
    components: {
        CargaDescargaC
    },
    data() {
        return {
            folio: "", // Inicializa el valor de folio en el componente padre
            fechaEmision: null,
            fechaVencimiento: null,
            rut: "",
            showModal: false,
            obsModal: false,
            carga: false,
            descarga: false,
            cargaDescarga: 'null', // Inicializa la variable con el valor 'null'
            data: [],
            datamodal: [], // Inicializar la propiedad data como un arreglo vacío
            selectedRows: [],  // Inicializar la propiedad selectedRows como un arreglo vacío
            estadoTGR: "",
            loadingEstado: false,
            loadingEnviarTGR: false,
            rutaM1: null,
            obsText: '',
            loadingPendientes: false,
            observacionIngresada: false,
        };
    },
    methods: {
        onInputFolio(event) {
            const input = event.target;
            input.value = input.value.replace(/\D/g, ''); // Remover caracteres no numéricos
            this.folio = input.value; // Actualizar el valor de folio en el componente
        },
        onInputRut(event) {
            const input = event.target;
            input.value = input.value.replace(/\D/g, '');
            this.rut = input.value;
        },
        cambiarFormatoFecha(fecha) {
            if (fecha) {
                const dateObj = new Date(fecha);
                const dia = dateObj.getDate().toString().padStart(2, '0');
                const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const anio = dateObj.getFullYear();
                return `${dia}-${mes}-${anio}`;
            }
            return '';
        },
        handleDataFetched(data) {

            for (const key in data) {
                if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
                    data[key] = data[key].replace(/"/g, ''); // Elimina las comillas dobles
                }
            }

            //Recorremos el objeto data y convertimos el formato de las fechas
            for (const key in data) {
                if (data.hasOwnProperty(key) && typeof data[key] === 'string' && key.includes('fecha')) {
                    data[key] = this.cambiarFormatoFecha(data[key]);
                }
            }

            this.data = data;
            // Verificar si 'data' es un objeto JSON
            if (data && typeof data === 'object') {
                for (const key in data) {
                    if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
                        // Reemplazar las comillas dobles en las cadenas de texto
                        data[key] = data[key].replace(/"/g, '');
                    }
                }

                // Verificar si 'data' es un arreglo
                if (Array.isArray(data)) {
                    // Recorrer el arreglo y eliminar comillas de las cadenas de texto
                    data = data.map(item => {
                        if (typeof item === 'string') {
                            return item.replace(/"/g, '');
                        }
                        return item;
                    });
                }

                // Actualizar la propiedad 'data'
                this.data = data;
                console.log('despues de todo:', data);
            } else {
                this.data = [];
            }
        },
        toggleSelection(item) {
            if (this.isSelected(item)) {
                this.selectedRows = this.selectedRows.filter(selectedItem => selectedItem.idCobroGravamen !== item.idCobroGravamen);
            } else {
                this.selectedRows.push(item);
            }
        },
        isSelected(item) {
            return this.selectedRows.some(selectedItem => selectedItem.idCobroGravamen === item.idCobroGravamen);
        },
        activarBusqueda() {
            if (!this.folio && !this.fechaEmision && !this.rut && !this.fechaVencimiento) {
                Swal.fire({
                    title: 'Campos Vacíos',
                    text: 'Por favor, ingrese al menos un dato antes de buscar',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert('Por favor, ingrese al menos un dato antes de buscar.');
                return; // Detener el proceso si no se han ingresado datos
            } else {
                this.$refs.busqueda.buscar(); // Llamar al método buscar en el componente hijo
            }

        },
        activarPendientes() {
            this.$refs.pendientes.buscarPendientes()
            this.limpiar();
        },
        limpiar() {
            this.folio = '';
            this.fechaEmision = '';
            this.rut = '';
            this.fechaVencimiento = '';
            this.carga = false;
            this.descarga = false;
            this.cargaDescarga = 'null';
        },
        limpiarDescarga() {
            this.observacionIngresada = false;
            this.obsText = '';
            this.cargaDescarga = 'null';
        },
        limpiarSelectedRows() {
            this.selectedRows = []; // Asigna un array vacío para limpiar selectedRows
        },
        guardarObservacion() {
            const obsText = this.obsText.toString(); // Convertir a cadena de texto

            if (obsText.trim() === "") {
                Swal.fire({
                    text: 'Debe ingresar una nota para la descarga',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert('Debe ingresar una nota para la descarga')
                this.observacionIngresada = false;
                this.obsModal = true;
            } else {
                // Después de guardar la observación con éxito, establece observacionIngresada en true
                this.observacionIngresada = true;
                this.obsModal = false;
                this.observacion = obsText; // Asignar el valor a la propiedad observacion
            }
        },
        async verEstadoTGR(rutaM1) {
            const cleanValue = (value) => {
                if (typeof value === 'string') {
                    return value.replace(/["']/g, ''); // Elimina comillas dobles y simples
                }
                return value;
            };

            rutaM1 = cleanValue(rutaM1); // Aplicar limpieza al valor de rutaM1

            console.log(rutaM1);
            this.rutaM1 = rutaM1;

            if (rutaM1 === undefined || rutaM1 === 'null') {
                Swal.fire({
                    text: 'Aun no tiene estado en TGR',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert("Aun no tiene estado en TGR");
            } else {
                this.loading = true;
                await this.obtenerEstadoTGR(rutaM1);
                this.loading = false;
                this.showModal = true;
            }
        },
        async obtenerEstadoTGR(rutaM1) {
            if (rutaM1 === 'null') {
                Swal.fire({
                    text: 'Aun no tiene estado en TGR',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert("Aun no tiene estado en TGR");
                return; // Sale de la función si rutaM1 es null
            }
            try {
                const response = await fetch(`${BASE_URL}${ESTADO}${rutaM1}`, {
                    method: "GET", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": JSON_CONTENT_TYPE,
                        'Authorization': AUTHORIZATION
                    },
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                });
                this.datamodal = await response.json();
                console.log("despues del axios")
                console.log(this.datamodal)
                if (this.datamodal && this.datamodal.data && this.datamodal.data.estado && this.datamodal.data.estado.nombreEstado) {
                    this.estadoTGR = this.datamodal.data.estado.nombreEstado;
                } else {
                    console.log("El campo nombreEstado no está presente en la respuesta JSON");
                    Swal.fire({
                        text: 'No ha sido cargada o descargada',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                    //alert("No ha sido cargada o descargada")
                    this.showModal = false; // Cierra el modal
                }
            } catch (error) {
                console.log("Error al obtener el estado TGR:" + error);
                Swal.fire({
                    text: 'No ha sido cargada o descargada',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                //alert("Error al obtener el estado TGR");
                this.showModal = false; // cierra el modal
            }
        },
        enviarTGR() {
            if (this.selectedRows.length > 0) {
                console.log('Filas seleccionadas:', this.selectedRows);
                // Aquí puedes realizar la lógica para enviar los datos seleccionados a TGR
                // Puedes recorrer this.selectedRows y obtener los valores que necesitas para el envío

                if (this.cargaDescarga !== 'null') {
                    // Realizar el envío según la selección
                    if (this.cargaDescarga === 'carga') {
                        // Realizar la lógica para enviar a carga
                        this.enviarCarga();

                    } else if (this.cargaDescarga === 'descarga') {
                        //this.obsModal = true;
                        // this.enviarObservacion(this.obsText);
                        // Realizar la lógica para enviar a descarga
                        this.enviarDescarga(this.rutaM1);
                    }
                }
                else {
                    Swal.fire({
                        text: 'Seleccione una opción antes de enviar a TGR',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    });
                    //alert('Seleccione una opción antes de enviar a TGR');
                }
            } else {
                Swal.fire({
                    text: 'No se han seleccionado filas.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert('No se han seleccionado filas.');
            }
        },
        async enviarCarga() {
            // Lógica para enviar a carga
            if (this.selectedRows.length > 0) {
                console.log('Filas seleccionadas:', this.selectedRows);
                // Activar el estado de carga
                this.loadingEnviarTGR = true;

                let folio = "";
                let fechaEmision = "";
                let fechaVencimiento = "";
                let rut = "";

                // Aquí iteramos por las filas seleccionadas y hacemos la solicitud axios para cada una
                this.selectedRows.forEach((item) => {
                    const data = JSON.stringify(item).replace(/'/g, '');
                    console.log('Data sin comillas simples:', data);
                    const config = {
                        method: 'POST', // Cambiar el método de 'post' a 'get'
                        maxBodyLength: Infinity,
                        url: `${BASE_URL}${CARGA}`,
                        headers: {
                            'Content-Type': JSON_CONTENT_TYPE,
                            'Authorization': AUTHORIZATION,
                            "Access-Control-Allow-Origin": "*",
                        },
                        data: data
                    };
                    axios.request(config)
                        .then((response) => {
                            console.log(JSON.stringify(response.data));
                            if (response.data === "Obligacion cargada") {
                                Swal.fire({
                                    title: 'Carga Exitosa',
                                    text: 'La Obligación ha sido cargada correctamente',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                });
                                //alert("La Obligación ha sido cargada correctamente");
                                const parsedData = JSON.parse(data);
                                folio = parsedData.folio;
                                fechaEmision = parsedData.fechaEmision;
                                fechaVencimiento = parsedData.fechaVencimiento;
                                rut = parsedData.rut;
                                // Emitir evento para invocar la búsqueda en el componente hijo
                                this.$refs.busqueda.realizarBusquedaCarga(folio, fechaEmision, fechaVencimiento, rut);
                                this.limpiarSelectedRows();
                            } else {
                                (response.data === "La obligacion ha sido cargada anteriormente")
                                Swal.fire({
                                    title: 'Cargada Anteriormente',
                                    text: 'La obligacion ha sido cargada anteriormente',
                                    icon: 'warning',
                                    confirmButtonText: 'Aceptar'
                                });
                                //alert("La obligacion ha sido cargada anteriormente");
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                // Aquí accedemos al valor de la respuesta en caso de un error de respuesta
                                const responseData = error.response.data;
                                console.log(responseData); // Esto imprimirá "La obligacion ha sido cargada"
                                Swal.fire({
                                    text: responseData,
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                                //alert(responseData);
                                this.limpiarSelectedRows();
                            } else {
                                console.error("Error sin respuesta de servidor", error);
                            }

                        })
                        .finally(() => {
                            // Restablecer el estado de carga después de que la solicitud haya finalizado
                            this.loadingEnviarTGR = false;
                        });
                });
            } else {
                Swal.fire({
                    text: 'No se han seleccionado filas.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert('No se han seleccionado filas.');
            }
        },
        async enviarDescarga(rutaM1) {
            // Validar si rutaM1 es null
            if (rutaM1 === null) {
                Swal.fire({
                    text: 'Primero se debe ver el estado en TGR.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar'
                });
                //alert('Primero se debe ver el estado en TGR.');
                console.log(rutaM1);
                this.obsModal = false;
                this.limpiarDescarga();
                return; // Salir de la función
            }

            // Lógica para enviar a descarga
            if (this.selectedRows.length > 0) {
                console.log('Filas seleccionadas:', this.selectedRows);
                // Activar el estado de carga
                this.loadingEnviarTGR = true;

                // Obtener la observación de la propiedad observacion
                const observacion = this.observacion;

                // Aquí iteramos por las filas seleccionadas y hacemos la solicitud axios para cada una
                this.selectedRows.forEach((item) => {
                    const requestData = {
                        observacion: observacion, // Usar la observación obtenida anteriormente
                    };

                    const config = {
                        method: 'POST',
                        maxBodyLength: Infinity,
                        url: `${BASE_URL}${DESCARGA}${rutaM1}`,
                        headers: {
                            'Content-Type': JSON_CONTENT_TYPE,
                            'Authorization': AUTHORIZATION,
                            "Access-Control-Allow-Origin": "*",
                        },
                        data: JSON.stringify(requestData), // Envía solo el objeto requestData
                    };

                    axios.request(config)
                        .then((response) => {
                            console.log(JSON.stringify(response.data));
                            if (response.data === "Obligación descargada") {
                                Swal.fire({
                                    title: 'Descargada correctamente',
                                    text: 'La Obligación ha sido Descargada correctamente.',
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                });
                                //alert("La Obligación ha sido Descargada correctamente");
                                this.limpiarDescarga();
                            }
                            Swal.fire({
                                title: 'Descargada correctamente',
                                text: 'La Obligación ha sido Descargada correctamente.',
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            });
                            //alert("La Obligación ha sido Descargada correctamente");
                            this.limpiarDescarga();
                            this.limpiarSelectedRows();
                        })
                        .catch((error) => {
                            if (error.response) {
                                // Aquí accedemos al valor de la respuesta en caso de un error de respuesta
                                const responseData = error.response.data;
                                console.log(responseData); // Esto imprimirá "La obligacion ha sido cargada"
                                Swal.fire({
                                    text: 'La obligacion ha sido cargada',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                                //alert(responseData);
                            } else {
                                console.error("Error sin respuesta de servidor", error);
                            }
                            this.limpiarDescarga();
                            this.limpiarSelectedRows();

                        })
                        .finally(() => {
                            // Restablecer el estado de carga después de que la solicitud haya finalizado
                            this.loadingEnviarTGR = false;
                        });
                });
            } else {
                Swal.fire({
                    text: 'No se han seleccionado filas',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                //alert('No se han seleccionado filas.');
            }

        }
    }
};
</script>
  
<style scoped>
@media (max-width: 768px) {
    .formulario {
        padding-left: 20px;
        padding-right: 20px;
    }

    .pestanas {
        padding-left: 20px;
    }

    input {
        width: 100%;
    }

    select {
        width: 100%;
    }

}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /* Ancho al 100% del contenedor */
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fondo semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    width: 70%;
    /* Ancho personalizado para el contenido del modal */
    max-height: 80%;
    /* Altura máxima para el contenido del modal */
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    /* Agregar scrollbar si el contenido es largo */
}

/* Agrega aquí los estilos específicos para esta vista si es necesario */
.table-container {
    overflow-x: auto;
    max-width: 100%;
    padding: 2%;

}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 1px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    white-space: nowrap;
    /* Evita el salto de línea en el contenido */
    overflow: hidden;
    /* Oculta el contenido que desborda el ancho de la celda */
    text-overflow: ellipsis;
    /* Puedes eliminar esta línea si no deseas puntos suspensivos */
    /* max-width: 200px; Ajusta el valor según tus necesidades */
}

th {
    width: 0;
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

.contenido-formulario {
    margin-top: 20px;
    text-align: center;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    padding: 10px;
    /* margin-bottom: 15px; */
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 100%;
}

select {
    padding: 10px;
    /* margin-bottom: 15px; */
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 100%;
}

button {
    margin-right: 0px;
}
</style>
  