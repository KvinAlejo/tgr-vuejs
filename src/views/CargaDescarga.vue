<template>
    <div class="p-8 text-cyan-700 font-extrabold">
        <h2 class="text-xl font-bold mb-4">Carga/Descarga</h2>

        <!-- Campos de entrada -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block mb-2" for="folio">Folio:</label>
                <input type="text" id="folio" class="border rounded px-2 py-1 w-full" v-model="folio" />
            </div>
            <div>
                <label class="block mb-2" for="fecha">Fecha:</label>
                <input type="date" id="fecha" class="border rounded px-2 py-1 w-full" v-model="fecha" />
            </div>
            <div>
                <label class="block mb-2" for="rut">RUT:</label>
                <input type="text" id="rut" class="border rounded px-2 py-1 w-full" v-model="rut" />
            </div>
            <div>
                <label class="block mb-2" for="vencimiento">Fecha de Vencimiento:</label>
                <input type="date" id="vencimiento" class="border rounded px-2 py-1 w-full" v-model="vencimiento" />
            </div>
        </div>

        <!-- Select de Carga/Descarga -->
        <div class="mt-4">
            <label class="block mb-2">Carga/Descarga:</label>
            <select v-model="cargaDescarga" class="border rounded px-2 py-1 w-full">
                <option value="carga">Carga</option>
                <option value="descarga">Descarga</option>
            </select>
        </div>

        <!-- Botones -->
        <div class="mt-4 space-x-4 flex flex-wrap">
            <button @click="buscar" class="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">Buscar</button>
            <button @click="limpiar" class="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">Limpiar</button>
        </div>

        <!-- Botón de Enviar a TGR -->
        <div class="mt-4 text-right">
            <button @click="enviarTGR" class="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">Enviar a
                TGR</button>
        </div>
<ListadoTgr />
        <!-- Grilla de resultados -->
        <!-- Aquí debes agregar la grilla con los resultados de la búsqueda -->
        <!-- Puedes utilizar librerías como Vue Data Grid o Element UI para esto -->
    </div>
</template>
  
<script>
import ListadoTgr from './ListadoTgr.vue';

export default {
    data() {
        return {
            folio: '',
            fecha: '',
            rut: '',
            vencimiento: '',
            carga: false,
            descarga: false,
            // Aquí debes agregar la estructura de datos para los resultados de la búsqueda
            // Por ejemplo: resultados: []
        };
    },
    methods: {
        buscar() {
            // Aquí debes implementar la lógica para realizar la búsqueda con los filtros ingresados
            // Puedes actualizar los resultados en el array 'resultados'
        },
        limpiar() {
            this.folio = '';
            this.fecha = '';
            this.rut = '';
            this.vencimiento = '';
            this.carga = false;
            this.descarga = false;
            // Aquí debes limpiar también los resultados
        },
        enviarTGR() {
            // Aquí debes implementar la lógica para enviar los datos a TGR
        },
    },
    components: { ListadoTgr }
};
</script>
  
<style>
/* Agrega aquí los estilos específicos para esta vista si es necesario */
</style>
  