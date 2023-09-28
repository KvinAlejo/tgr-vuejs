<template>
    <div>
        <div class="mb-4 mt-6 ml-28 text-center">
            <button @click="guardarGravamen" class="px-8 py-2 bg-sky-700 text-white rounded">Guardar</button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        datos: Object, // Propiedad para recibir los datos desde el padre
        cargo: Object, // Propiedad para recibir los datos de cargo desde el padre
    },
    methods: {
        validarCamposObligatorios() {
            if (this.pestañaActual === 'datos') {
                if (!this.datos.rut || !this.datos.nombreApellido || !this.datos.direccion || !this.cargaRegion || !this.cargaComuna) {
                    return false;
                }
            } else if (this.pestañaActual === 'cargo') {
                if (!this.cargo.folio || !this.marca || !this.cargo.fechaEmision || !this.cargo.fechaVencimiento || !this.cargo.montoTotal || !this.meses || !this.cargaDescarga) {
                    return false;
                }
            }
            return true;
        },
        guardarGravamen() {
            if (!this.validarCamposObligatorios()) {
                this.mostrarAlerta("Debe completar todos los campos obligatorios.");
                return;
            }

            // Resto de tu código para guardar el gravamen...
        },
        mostrarAlerta(mensaje) {
            this.$alert(mensaje, 'Error', {
                confirmButtonText: 'Aceptar',
                type: 'error',
            });
        },
        // Otras funciones de guardado aquí
    },
};
</script>
  