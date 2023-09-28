<template>
    <div class="p-3 text-gray-600 font-extrabold">
        <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-5 px-12 lg:px-24 shadow-xl mb-10">
            <h2 class="text-xl font-bold mb-4 text-center">UTM</h2>
            <div class="p-1 grid grid-cols-2 md:grid-cols-2 gap-2 formulario">
                <div class="mb-2">
                    <label class="block mb-1" for="mes">Mes:</label>
                    <input type="date" id="mes" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" v-model="mes" />
                </div>
                <div class="mb-2 flex items-end">
                    <button @click="BuscarMes"
                        class="mb-1 px-4 py-2 bg-sky-700 text-white rounded text-right">Buscar</button>
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="montoUtm">Monto UTM:</label>
                    <input type="text" id="montoUtm" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="montoUtm" />
                </div>
                <!-- Línea separadora -->
            </div>
            <div class="border-b border-gray-300 mb-8 mt-8"></div>
            <div class="class=p-1 grid grid-cols-2 md:grid-cols-3 gap-3 formulario">
                <div class="mb-2">
                    <label class="block mb-1" for="montoUtm">Monto UTM:</label>
                    <input type="number" id="montoUtm" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="montoUtm2" />
                </div>
                <div class="mb-2">
                    <label class="block mb-1" for="mesCrear">Mes:</label>
                    <input type="date" id="mesCrear" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
                        v-model="mesCrear" />
                </div>
                <div class="mb-2 flex items-end">
                    <button @click="crearUtm"
                        class="mb-1 px-4 py-2 bg-sky-700 text-white rounded text-right">Crear</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        mes: '', 
        montoUtm: '', 
        montoUtm2: '', 
        mesCrear: '', 
    }
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
</style>
