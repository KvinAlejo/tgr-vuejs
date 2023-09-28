<template>
    <div class="p-3 text-gray-500 font-extrabold">
        <div class="bg-gray-100 mx-auto max-w-2xl bg-white m-8">
            <div class="login-form_login">
                <h2 class="text-xl font-bold mb-4 text-center">Iniciar sesión Google</h2>

                <div class="mb-2 boton_login">
                    <GoogleLogin :callback="callback" />
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { useUserStore } from '../store/auth'
import { decodeCredential } from 'vue3-google-login'

const userG = {
    email: null,
    name: 'fdfdf',
    loggedIn: false
};
export default {
    components: {

    },
    setup() {
        const router = useRouter();
        const userStore = useUserStore()
        const callback = (response) => {
            console.log("Entró en la función callback");
            if (response.error) {
                console.error("Error en la autenticación de Google", response.error);
            } else {
                console.log("Autenticación exitosa", response);

                // Obtener los datos del usuario de Google utilizando decodeCredential
                const userData = decodeCredential(response.credential);
                console.log('userData:', userData);

                // Verificar si el correo electrónico tiene el dominio deseado
                if (userData.email.endsWith('@subtel.gob.cl')) {
                    // Actualizar el estado de la tienda con los datos del usuario
                    let userRaw = userData.email.split('@');
                    let username = userRaw[0];
                    userStore.username = username;
                    userG.email = userData.email;
                    userStore.authUser = userData.name;
                    userStore.picture = userData.picture;
                    userStore.email = userData.email;
                    userStore.domail = userData.hd;
                    console.log('google: ' + userG.email);
                    console.log('store: ' + userStore.authUser);

                    // Intenta la redirección y maneja los errores
                    try {
                        router.push('/cargadescarga'); //cambiar al home
                        console.log("Redirigido con éxito");
                    } catch (error) {
                        console.error("Error al redirigir:", error);
                    }
                } else {
                    console.log("Correo electrónico no permitido:", userData.email);
                    Swal.fire({
                        title: 'Error al Acceder',
                        text: 'Correo electrónico no permitido: ' + userData.email,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    //alert("Correo electrónico no permitido:", userData.email);
                    // Puedes mostrar un mensaje de error o realizar alguna otra acción aquí
                }
            }
        }
        return {
            callback,
        };
    },
};
</script>

  
<style>
.login-form_login {
    max-width: 300px;
    margin: auto;
    padding: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group_login {
    margin-bottom: 15px;
}

.label_login {
    margin-bottom: 5px;
    font-weight: bold;
}

.input_login {
    padding: 10px;
    /* margin-bottom: 15px; */
    border: 1px solid #ccc;
    border-radius: 15px;
    width: 100%;
}

.boton_login {
    cursor: pointer;
    width: 100%;
}
</style>
  