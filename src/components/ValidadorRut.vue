<template>
    <div class="mb-2">
        <label class="block mb-1" for="rut">Rut:</label>
        <input type="text" id="rut" class="border rounded px-2 py-1 w-full md:w-56 lg:w-64" v-model="rut"
            @input="formatearRut" @blur="validarRut" />
        <p v-if="!rutValido" class="rutError">Rut no válido</p>
    </div>
</template>
  
<script>
export default {
    props: {
        
        value: String, // Cambia el tipo de prop si es necesario
    },
    data() {
        return {
            rut: '',
            rutValido: true,
        };
    },
    methods: {
        validarRut() {
            this.rutValido = this.validarRutFormato(this.rut);
            this.$emit('input', this.rut);
        },
        validarRutFormato(rut) {
            const regex = /^[0-9]+-[0-9kK]{1}$/;

            if (!regex.test(rut)) {
                return false; // El formato no es válido
            }

            const [numero, dv] = rut.split('-');

            // Lógica para validar el dígito verificador
            let suma = 0;
            let factor = 2;
            for (let i = numero.length - 1; i >= 0; i--) {
                suma += parseInt(numero.charAt(i)) * factor;
                factor = factor === 7 ? 2 : factor + 1;
            }

            const dvCalculado = 11 - (suma % 11);
            const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString();

            return dv.toUpperCase() === dvEsperado; // El RUT es válido si el dígito verificador coincide
        },
    },
    watch: {
        value(newRut) {
            this.rut = newRut;
        },
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

    p {
        position: absolute;
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

select {
    padding: 10px;
    /* margin-bottom: 15px; */
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 100%;
}

.rutError {
    color: red
}
</style>