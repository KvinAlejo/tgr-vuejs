<template>
    <div class="p-3 text-gray-600 font-extrabold">
        <!-- Campos de entrada -->
        <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-5 px-12 lg:px-24 shadow-xl mb-10">
            <h2 class="text-xl lg:text-2xl font-bold mb-4 text-center">Consultar / Editar</h2>
            <div class="p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 formulario">
                <div class="mb-2">
                    <label class="block mb-1" for="folio">Folio:</label>
                    <input type="text" id="folio" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" v-model="folio"
                        @input="onInputFolio" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="fechaEmision">Fecha Emisión:</label>
                    <input type="date" id="fechaEmision" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="fechaEmision" />
                </div>
                <div class="mb-2 flex items-end">
                    <ConsultarEditarGravamenC :folio="folio" :fechaEmision="fechaEmision"
                        :fechaVencimiento="fechaVencimiento" :rut="rut" ref="busqueda" @data-fetched="handleDataFetched" />
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
            </div>
        </div>

        <!-- Grilla con los Datos -->
        <div class="table-container overflow-x-auto">
            <h1>Listado de Datos</h1>
            <table v-if="data">
                <thead>
                    <tr>
                        <th>Acción</th>
                        <!-- <th>ID</th> -->
                        <th>Folio</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Monto UTM</th>
                        <th>Tipo</th>
                        <!-- <th>Fecha de Creación</th> -->
                        <!-- <th>Usuario de Creación</th> -->
                        <!-- <th>Ruta M1</th> -->
                        <th>RUT</th>
                        <th>Fecha de Emisión</th>
                        <th>Monto Total</th>
                        <th>Meses</th>
                        <th>Marca</th>
                        <th>Estado</th>
                        <th>Glosa de Status</th>
                        <th>Status</th>
                        <!-- <th style="width:1%;">Enviado</th> -->
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="item in data" :key="data.folio"> -->
                    <tr v-for="item in data" :key="item.idCobroGravamen">
                        <!-- <td><input type="checkbox" :checked="isSelected(item)" @change="toggleSelection(item)" /></td> -->
                        <!-- <td><input type="checkbox" :checked="isSelected(data)" @change="toggleSelection(data)" /></td> -->
                        <!-- <td>{{ data.idCobroGravamen }}</td> -->
                        <td>
                            <!-- <button @click="showModal = true" @change="toggleSelection(item)">Editar</button> -->
                            <button @click="editItem(item)">Editar</button>
                        </td>
                        <td>{{ item.folio }}</td>
                        <td>{{ item.fechaVencimiento }}</td>
                        <td>{{ item.montoUtm }}</td>
                        <td>{{ item.tipo }}</td>
                        <!-- <td>{{ item.fechaCreacion }}</td> -->
                        <!-- <td>{{ item.usuarioCreacion }}</td> -->
                        <!-- <td>{{ item.rutaM1 }}</td> -->
                        <td>{{ item.rut }}</td>
                        <td>{{ item.fechaEmision }}</td>
                        <td>{{ item.montoTotal }}</td>
                        <td>{{ item.meses }}</td>
                        <td>{{ item.marca }}</td>
                        <td>{{ item.estado }}</td>
                        <td>{{ item.glosaStatus }}</td>
                        <td>{{ item.status }}</td>
                        <!-- Agrega más celdas aquí si es necesario -->
                    </tr>
                </tbody>
            </table>
            <!-- <p v-else>La longitud de los datos es {{ data.length }} y no hay datos disponibles.</p> -->
            <p v-else>No hay datos disponibles</p>
        </div>
        <transition name="fade">
            <div class="modal" v-if="showModal">
                <div class="modal-content bg-white py-2 lg:px-6 shadow-xl mb-4">
                    <h2 class="text-xl font-bold mb-4 text-center">Editar Gravamen</h2>
                    <div class="pestanas pl-12 mb-8 shadow-xl mb-24 border-2 text-center border rounded">
                        <button :class="{ active: pestañaActual === 'datos' }" @click="cambiarPestana('datos')"
                            class="boton-pestaña"> Datos
                        </button>
                        <button :class="{ active: pestañaActual === 'cargo' }" @click="cambiarPestana('cargo')"
                            class="boton-pestaña"> Detalles Cargo
                        </button>
                    </div>
                    <form v-if="pestañaActual === 'datos'" class="p-1 grid grid-cols-2 md:grid-cols-2 gap-2 formulario">
                        <!-- Select de Tipo de Servicio -->
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1">Servicio:</label>
                            <select v-model="selectedItem.codServicio" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64">
                                <option value="null">Seleccione Servicio</option>
                                <option value="977">977: AFICIONADO A LAS RADIOCOMUNICA</option>
                                <option value="277">277: ESTACIONES DE BANDAS LOCALES</option>
                                <option value="177">177: ESTACIONES DE EXPERIMENTACION</option>
                                <option value="710">710: Multa Diaria (probando)</option>
                                <option value="711">711: Multa Fija (probando)</option>
                                <option value="877">877: OTROS SERVICIOS</option>
                                <option value="377">377: RADIO DIFUSION SONORA</option>
                                <option value="477">477: RADIO DIFUSION TELEVISIVA</option>
                                <option value="077">077: RADIOAFICIONADOS</option>
                                <option value="677">677: SERVICIOS LIMITADOS</option>
                                <option value="777">777: SERVICIOS LIMITADOS DE RADIODI</option>
                                <option value="577">577: SERVICIOS PUBLICOS</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="block mb-1" for="rut">Rut:</label>
                            <input type="number" id="rut" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.rut" />
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1" for="razonSocial">Nombre y Apellido / Razon Social:</label>
                            <input type="text" id="razonSocial" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.razonSocial" />
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1" for="direccion">Dirección:</label>
                            <input type="text" id="direccion" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.direccion"  />
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1">Region:</label>
                            <select v-model="selectedItem.region" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64">
                                <option value="null">Seleccione Region</option>
                                <option value="1">Región de Tarapacá</option>
                                <option value="2">Región de Antofagasta</option>
                                <option value="3">Región de Atacama</option>
                                <option value="4">Región de Coquimbo</option>
                                <option value="5">Región de Valparaíso</option>
                                <option value="6">Región del Libertador General Bernardo O'Higgins</option>
                                <option value="7">Región del Maule</option>
                                <option value="8">Región del Biobío</option>
                                <option value="9">Región de la Araucanía</option>
                                <option value="10">Región de Los Lagos</option>
                                <option value="11">Región de Aysén del General Carlos Ibáñez del Campo</option>
                                <option value="12">Región de Magallanes y de la Antártica Chilena</option>
                                <option value="13">Región Metropolitana de Santiago</option>
                                <option value="14">Región de los Ríos</option>
                                <option value="15">Región de Arica y Parinacota</option>
                                <option value="16">Región de Ñuble</option>
                            </select>
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1">Comuna:</label>
                            <select v-model="selectedItem.comuna"
                                class="border rounded px-2 py-1 w-full md:w-56 lg:w-64">
                                <option value="null">Seleccione Comuna</option>
                                <option value="1">Región de Tarapacá</option>
                                <option value="2">Región de Antofagasta</option>
                                <option value="3">Región de Atacama</option>
                                <option value="4">Región de Coquimbo</option>
                                <option value="5">Región de Valparaíso</option>
                                <option value="6">Región del Libertador General Bernardo O'Higgins</option>
                                <option value="7">Región del Maule</option>
                                <option value="8">Región del Biobío</option>
                                <option value="9">Región de la Araucanía</option>
                                <option value="10">Región de Los Lagos</option>
                                <option value="11">Región de Aysén del General Carlos Ibáñez del Campo</option>
                                <option value="12">Región de Magallanes y de la Antártica Chilena</option>
                                <option value="13">Región Metropolitana de Santiago</option>
                                <option value="14">Región de los Ríos</option>
                                <option value="15">Región de Arica y Parinacota</option>
                                <option value="16">Región de Ñuble</option>
                            </select>
                        </div>
                        <!-- <div class="mb-2">
                            <label class="block mb-1" for="telefono">Telefono:</label>
                            <input type="number" id="telefono" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.telefono" />
                        </div> -->
                        <div class="mb-2">
                            <label class="block mb-1" for="email">Email:</label>
                            <input type="email" id="email" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.email" />
                        </div>
                    </form>

                    <form v-else-if="pestañaActual === 'cargo'" class="p-1 grid grid-cols-2 md:grid-cols-2 gap-2 ">
                        <!-- Formulario de Cargo -->
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1" for="folio">Folio:</label>
                            <input type="number" id="folio" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.folio" @input="onInputFolio" />
                        </div>
                        <div class="mb-2">
                            <label class="block mb-1">Marca:</label>
                            <select v-model="selectedItem.marca" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
                                <option value="null">Seleccione Marca:</option>
                                <option value="VE">VENCE</option>
                                <option value="EX">EXTINGUE</option>
                                <option value="EL">ELIMINA</option>
                                <option value="EP">EXPERIMENTAL</option>
                                <option value="NU">NUEVO</option>
                                <option value="TR">TRANSFERENCIA</option>
                                <option value="MO">MODIFICA</option>
                                <option value="SC">SIN CAMBIOS</option>
                            </select>
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1" for="fechaEmision">Fecha de Emisión:</label>
                            <input type="date" id="fechaEmision" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.fechaEmision" />
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1" for="fechaVencimiento">Fecha de Vencimiento:</label>
                            <input type="date" id="fechaVencimiento" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.fechaVencimiento" />
                        </div>
                        <div class="mb-2">
                            <label class="block mb-1" for="montoTotal">Monto Total:</label>
                            <input type="number" id="montoTotal" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.montoTotal" />
                        </div>
                        <div class="mb-2 col-span-2 md:col-span-1">
                            <label class="block mb-1" for="meses">Meses:</label>
                            <input type="number" id="meses" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                                v-model="selectedItem.meses" @input="actualizarMes" />
                        </div>
                        <div class="mb-2">
                            <label class="block mb-1" for="montoUtm">Monto UTM:</label>
                            <input type="number" id="montoUtm" disabled
                                class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" :value="cargo.montoUtmCalculado" />
                        </div>
                        <div class="mb-2">
                            <label class="block mb-1" for="montoPesos">Monto en Pesos:</label>
                            <input type="number" id="montoPesos" disabled
                                class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" :value="cargo.montoEnPeso" />
                        </div>
                    </form>
                    <div class="p-1 pl-60 grid grid-cols-3 md:grid-cols-3 gap-2">
                        <button @click="guardarGravamen" class="px-8 py-2 bg-sky-700 text-white rounded">Guardar</button>
                        <button @click="showModal = false" class="px-8 py-2 bg-amber-400 text-white rounded">Cerrar</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import ConsultarEditarGravamenC from '../components/ConsultarEditarGravamenC.vue'
import { BASE_URL, JSON_CONTENT_TYPE, AUTHORIZATION, EDITARGRV } from '../properties'
export default {
    components: {
        ConsultarEditarGravamenC
    },
    data() {
        return {
            pestañaActual: 'datos',
            showModal: false,
            data: [],
            folio: '',
            rut: '',
            fechaEmision: null,
            fechaVencimiento: null,
            datos: {
                rut: '',
                servicio: 'null',
                razonSocial: '',
                direccion: '',
                // region: 'null',
                // comuna: 'null',
                telefono: '',
                email: '',
            },
            cargo: {
                folio: '',
                marca: 'null',
                montoTotal: '',
                meses: '',
                cargaDescarga: 'null',
                fechaEmision: '',
                fechaVencimiento: '',
                montoUtmCalculado: 1, // Inicializa el valor calculado en 0
                montoEnPeso: 1, // Inicializa el valor calculado en 0
            },
            selectedItem: {
                datos: {
                    idCobroGravamen: '',
                    servicio: null,
                    rut: null,
                    razonSocial: '',
                    direccion: '',
                    // region: null,
                    // comuna: null,
                    telefono: null,
                    email: '',
                },
                cargo: {
                    folio: null,
                    marca: null,
                    fechaEmision: "",
                    fechaVencimiento: "",
                    montoTotal: null,
                    meses: null,
                    montoUtm: null,
                    montoPesos: null,
                },
            },
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
        editItem(item) {
            // Copia el elemento seleccionado para evitar cambios directos en la fuente de datos
            this.selectedItem = { ...item };

            // Cambia el formato de las fechas en selectedItem si es necesario
            this.selectedItem.fechaEmision = this.formatDate(this.selectedItem.fechaEmision);
            this.selectedItem.fechaVencimiento = this.formatDate(this.selectedItem.fechaVencimiento);

            // Muestra el modal de edición
            this.showModal = true;
        },
        formatDate(dateString) {
            if (dateString) {
                const parts = dateString.split("-");
                if (parts.length === 3) {
                    const year = parts[2];
                    const month = parts[1].padStart(2, "0"); // Agrega cero si es necesario
                    const day = parts[0].padStart(2, "0");   // Agrega cero si es necesario
                    return `${year}-${month}-${day}`;
                }
            }
            return dateString;
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
        limpiar() {
            this.folio = '';
            this.fechaEmision = '';
            this.rut = '';
            this.fechaVencimiento = '';
            this.carga = false;
            this.descarga = false;
            this.cargaDescarga = 'null';
        },
        cambiarPestana(pestaña) {
            this.pestañaActual = pestaña;
        },
        guardarGravamen() {
            const data = {
                idCobroGravamen: this.selectedItem.idCobroGravamen,
                servicio: this.selectedItem.servicio,
                rut: this.selectedItem.rut,
                razonSocial: this.selectedItem.razonSocial,
                direccion: this.selectedItem.direccion,
                cargaRegion: this.datos.cargaRegion,
                cargaComuna: this.selectedItem.cargaComuna,
                telefono: this.selectedItem.telefono,
                email: this.selectedItem.email,
                folio: this.selectedItem.folio,
                marca: this.selectedItem.marca,
                fechaEmision: this.selectedItem.fechaEmision,
                fechaVencimiento: this.selectedItem.fechaVencimiento,
                montoTotal: this.selectedItem.montoTotal,
                meses: this.selectedItem.meses,
                montoUtm: this.selectedItem.montoUtm,
                montoEnPeso: this.selectedItem.montoEnPeso,
            }
            // Convierte los datos del formulario a formato JSON
            console.log('Datos a enviar en JSON:', data);

            // Define la configuración para la solicitud Axios
            const config = {
                method: 'POST', // Cambia el método según tu necesidad (GET, POST, PUT, etc.)
                url: `${BASE_URL}${EDITARGRV}`,
                headers: {
                    'Content-Type': JSON_CONTENT_TYPE,
                    'Authorization': AUTHORIZATION,
                },
                data: data // Los datos en formato JSON
            };
            // Realiza la solicitud Axios
            axios.request(config)
                .then((response) => {
                    // Maneja la respuesta del servicio aquí
                    console.log('Respuesta del servicio:', response.data);
                    Swal.fire({
                    title: 'Operación Exitosa',
                    text: 'Los datos se han guardado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                    // Cierra el modal u realiza otras acciones según sea necesario
                    this.showModal = false;
                })
                .catch((error) => {
                    // Maneja los errores aquí
                    console.error('Error al enviar los datos:', error);
                    Swal.fire({
                    title: 'Error',
                    text: 'Error al guardar los datos.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
                });
        },
    },
}
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

.boton-pestaña {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
}

.boton-pestaña:hover {
    background-color: #003e81;
}

.boton-pestaña:focus {
    background-color: #003e81;
}


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 110%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fondo semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Asegura que esté por encima del contenido */
    /* ... otros estilos ... */
}

.modal-content {
    width: 100%;
    max-width: 1000px;
    /* Ancho máximo deseado */
    background-color: #fff;
    /* Color de fondo del contenido */
    padding: 20px;
    /* Espaciado interno */
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

/* Estilo para los formularios en las pestañas */
.modal-content form {
    max-height: 500px;
    /* Altura máxima deseada */
    overflow-y: auto;
    /* Agregar scroll vertical si es necesario */
}

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
    padding: 4px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 100%;
}

select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 100%;
}</style>