<template>
    <div class="p-3 text-gray-600 font-extrabold">
        <!-- Campos de entrada -->
        <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-5 px-12 lg:px-24 shadow-xl mb-24">
            <h2 class="text-xl font-bold mb-4 text-center">Crear Gravamen</h2>
            <div class="pestanas mb-8 shadow-xl mb-24 border-2 text-center border rounded">
                <button :class="{ active: pestañaActual === 'datos' }" @click="cambiarPestana('datos')"
                    class="boton-pestaña">
                    Datos
                </button>
                <button :class="{ active: pestañaActual === 'cargo' }" @click="cambiarPestana('cargo')"
                    class="boton-pestaña">
                    Detalles Cargo
                </button>
            </div>
            <form v-if="pestañaActual === 'datos'" @submit.prevent="guardarGravamen"
                class="p-1 grid grid-cols-2 md:grid-cols-2 gap-2 formulario">
                <!-- Select de Tipo de Servicio -->
                <div class="mb-2 col-span-2 md:col-span-1">
                    <label class="block mb-1">Servicio:</label>
                    <select v-model="datos.servicio" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
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
                <!-- Tu contenido de la vista -->
                <div class="mb-2">
                    <label class="block mb-1" for="rut">Rut:</label>
                    <input type="number" id="rut" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" v-model="rut" />
                </div>
                <div class="mb-2 col-span-2">
                    <label class="block mb-1" for="nombreApellido">Nombre y Apellido / Razon Social:</label>
                    <input type="text" id="nombreApellido" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="datos.nombreApellido" />
                </div>
                <div class="mb-2 col-span-2">
                    <label class="block mb-1" for="direccion">Dirrecion:</label>
                    <input type="text" id="direccion" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="datos.direccion" />
                </div>
                <div class="mb-2 col-span-2 md:col-span-1">
                    <label class="block mb-1">Region:</label>
                    <select v-model="datos.cargaRegion" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
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
                    <select v-model="datos.cargaComuna" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
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
                        v-model="datos.telefono" />
                </div> -->
                <div class="mb-2">
                    <label class="block mb-1" for="correo">Correo:</label>
                    <input type="email" id="correo" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="datos.correo" />
                </div>
            </form>

            <form v-else-if="pestañaActual === 'cargo'" @submit.prevent="guardarGravamen"
                class="p-1 grid grid-cols-2 md:grid-cols-2 gap-2 formulario">
                <!-- Formulario de Cargo -->
                <div class="mb-2">
                    <label class="block mb-1" for="folio">Folio:</label>
                    <input type="number" id="folio" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="cargo.folio" />
                </div>
                <!-- Select de Tipo de Servicio -->
                <div class="mb-2 col-span-2 md:col-span-1">
                    <label class="block mb-1">Marca:</label>
                    <select v-model="cargo.marca" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
                        <option value="null">Seleccione Marca:</option>
                        <option value="VE">VENCE</option>
                        <option value="EX">EXTINGUE</option>
                        <option value="EL">ELIMINA</option>
                        <option value="EP">EXPERIMENTAL</option>
                        <option value="NU">NUEVO</option>
                        <option value="TR">TRANSFERENCIA</option>
                        <option value="MO">MODIFICA</option>
                    </select>
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="fechaEmision">Fecha de Emisión:</label>
                    <input type="date" id="fechaEmision" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="cargo.fechaEmision" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="fechaVencimiento">Fecha de Vencimiento:</label>
                    <input type="date" id="fechaVencimiento" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="cargo.fechaVencimiento" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="montoTotal">Monto Total:</label>
                    <input type="number" id="montoTotal" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="cargo.montoTotal" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="meses">Meses:</label>
                    <input type="number" id="meses" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="cargo.meses" @input="actualizarMes" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="montoUtm">Monto UTM:</label>
                    <input type="number" id="montoUtm" disabled
                        class="disanable border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        :value="cargo.montoUtmCalculado" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="montoPesos">Monto en Pesos:</label>
                    <input type="number" id="montoPesos" disabled class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        :value="cargo.montoEnPeso" />
                </div>
                <!-- Select de Carga/Descarga -->
                <div class="mb-2 col-span-2 md:col-span-1">
                    <label class="block mb-2">Carga/Descarga:</label>
                    <select v-model="cargo.cargaDescarga" class="border rounded px-2 py-1 w-full md:w-48 lg:w-64">
                        <option value="null">Seleccione</option>
                        <option value="carga">Carga</option>
                        <option value="descarga">Descarga</option>
                    </select>
                </div>
            </form>
            <div class="mb-4 mt-6 ml-28 text-center">
                <button @click="guardarGravamen" class="px-8 py-2 bg-sky-700 text-white rounded">Guardar</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import store from '../router/store'; // Importa el módulo Vuex
export default {
    components: {
    },
    data() {
        return {
            pestañaActual: 'datos',
            datos: {
                rut: '',
                servicio: 'null',
                nombreApellido: '',
                direccion: '',
                cargaRegion: 'null',
                cargaComuna: 'null',
                telefono: '',
                correo: '',
            },
            cargo: {
                folio: '',
                marca: 'null',
                montoTotal: '',
                meses: '',
                cargaDescarga: 'null',
                montoUtmCalculado: 0, // Inicializa el valor calculado en 0
                montoEnPeso: 0, // Inicializa el valor calculado en 0
            },
        };
    },
    methods: {
        guardarGravamen() {
            if (this.camposRequeridosCompletos()) {
                axios.post('http://localhost:9091/obligaciones/graba', this.datos, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic c3VidGVsOmV1ajRZOVNEYXVSMjVY',
                        'Cookie': 'JSESSIONID=82D508D765CD7A47E1FAB20B521A6710'
                    }
                })
                    .then((response) => {
                        console.log('Guardado exitoso:', response.data);
                    })
                    .catch((error) => {
                        console.error('Error al guardar:', error);
                    });
            } else {
                alert('Por favor, complete todos los campos requeridos antes de guardar.');
            }
        },
        camposRequeridosCompletos() {
            if (this.pestañaActual === 'datos') {
                return (
                    this.cargaDescarga !== 'null' &&
                    this.datos.rut !== '' &&
                    this.datos.nombreApellido !== '' &&
                    this.datos.direccion !== '' &&
                    this.cargaRegion !== 'null' &&
                    this.cargaComuna !== 'null' &&
                    this.datos.telefono !== '' &&
                    this.datos.correo !== ''
                );
            } else if (this.pestañaActual === 'cargo') {
                return (
                    this.cargo.folio !== '' &&
                    this.cargo.marca !== 'null' &&
                    this.cargo.fechaEmision !== '' &&
                    this.cargo.fechaVencimiento !== '' &&
                    this.cargo.montoTotal !== '' &&
                    this.cargo.meses !== 'null' &&
                    this.cargo.cargaDescarga !== 'null'
                );
            }
            return false;
        },
        created() {
            // Recupera el estado del formulario del store al cargar el componente
            const formularioState = store.state.formulario;
            this.pestañaActual = formularioState.pestañaActual;
            this.datos = formularioState.datos;
            this.cargo = formularioState.cargo;
        },
        cambiarPestana(pestaña) {
            this.pestañaActual = pestaña;
        },
        // Dentro de un método en tu componente
        calcularMontoUtm() {
            // Realiza el cálculo aquí y actualiza montoUtmCalculado
            this.montoUtmCalculado = resultadoDelCalculo;
        },
        calcularMontoEnPeso() {
            this.montoEnPesoCalculado = resultadoDelCalculoEnPeso;
        }
    },
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

.boton-pestaña {
    background-color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.boton-pestaña.active {
    background-color: #d6d6d6;
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
</style>
  