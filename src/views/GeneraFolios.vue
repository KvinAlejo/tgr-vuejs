<template>
  <div class="p-3 text-gray-600 font-extrabold">
    <!-- Campos de entrada -->
    <div class="bg-gray-100 mx-auto max-w-6xl bg-white py-5 px-12 lg:px-24 shadow-xl mb-10">
      <h2 class="text-xl font-bold mb-4 text-center">Generar Folios</h2>
      <div class="p-1 grid grid-cols-2 md:grid-cols-1 gap-1 formulario">
        <div class="mb-2">
          <label class="block mb-8" for="ultimoFolio">Ultimo Folio: <span>{{ ultimoFolio }}</span></label>
        </div>
        <div class="mb-2">
          <label class="block mb-1" for="generarDesde">Generar Desde:</label>
          <input type="text" id="generarDesde" placeholder='123456' class="border rounded px-2 py-1 w-full md:w-56 lg:w-64"
            v-model="generarDesde" />
        </div>
      </div>
      <div class="mb-6 col-span-3 md:col-span-4 text-center">
        <button @click="generarFolio" class="mt-4 px-4 py-2 bg-sky-700 text-white rounded">Generar</button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      ultimoFolio: 123, // Aquí debes obtener el último folio dinámicamente
      generarDesde: null,
    };
  },
  methods: {
    //   generarFolio() {
    //     if (this.generarDesde !== null) {
    //       // Lógica para generar el folio desde el número ingresado
    //       const nuevoFolio = /* ... lógica para generar el folio ... */;
    //       this.ultimoFolio = nuevoFolio;
    //     }
    //   },
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
  