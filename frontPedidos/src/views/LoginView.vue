<template>
    <div class="d-flex justify-content-center bg-danger main">

        <div v-if="tipoForm == 'login'" class="card">
            <div class="card-body">
                <h3 class="text-center">Iniciar sesión</h3>

                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" v-model="correo" id="correo" class="form-control" />
                </div>

                <div class="mb-3">
                    <label for="contrasena" class="form-label">Contraseña</label>
                    <input type="password" v-model="contrasena" id="contrasena" class="form-control" />
                </div>

                <div class="mb-3 text-center">
                    <button @click="ingresar()" class="btn btn-primary">Iniciar sesión</button>
                </div>
                <div class="mb-3 text-center">
                    <button @click="ir('registrarse')" class="btn btn-primary">Ir a registrarse</button>
                </div>

            </div>
        </div>

        <div v-if="tipoForm == 'registrarse'" class="card">
            <div class="card-body">
                <h3 class="text-center">Iniciar sesión</h3>

                <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" v-model="nombre" id="nombre" class="form-control" />
                </div>

                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" v-model="correo" id="correo" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="telefono" class="form-label">Telefono</label>
                    <input type="text" v-model="telefono" id="telefono" class="form-control" />
                </div>

                <div class="mb-3">
                    <label for="contrasena" class="form-label">Contraseña</label>
                    <input type="password" v-model="contrasena" id="contrasena" class="form-control" />
                </div>

                <div class="mb-3 text-center">
                    <button @click="registrar()" class="btn btn-primary">Registrarse</button>
                </div>
                <div class="mb-3 text-center">
                    <button @click="ir('login')" class="btn btn-primary">Ir a registrarse</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
const route = useRouter();

const nombre = ref('');
const correo = ref('');
const telefono = ref('');
const contrasena = ref('');
const usuario = ref('user1');
const rol = ref('cliente');
const tipoForm = ref('login');
let baseURL = 'http://localhost:3000/auth';

onMounted(() => {
    limpiar();
})

const ingresar = async () => {
    if (correo.value == '' || contrasena.value == '') {
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese sus credenciales!!',
            icon: 'error',
        });
        return;
    }

    var datos = {
        correo: correo.value,
        contrasena: contrasena.value
    }

    try {
        const { data } = await axios.post(baseURL + '/login', datos);
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));

        Swal.fire({
            title: "Bienvenido!",
            text: "Estas de regreso " + data.usuario.nombres,
            icon: "success",
            showConfirmButton: false,
            timer: 1000
        });

        setTimeout(() => {
            route.push({ path: '/' });
        }, 1000);

    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
        });
    }

}

const registrar = async () => {
    if (nombre.value == '' || correo.value == '' || telefono.value == '' || contrasena.value == '') {
        Swal.fire({
            title: 'Error!',
            text: 'Complete todos los campos!!',
            icon: 'error',
        });
        return;
    }

    var datos = {
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
        contrasena: contrasena.value,
        usuario: usuario.value,
        rol: rol.value
    }

    try {
        const { data } = await axios.post('http://localhost:3000/usuarios', datos);
        console.log(data);
        Swal.fire({
            title: "Bienvenido!",
            text: "Estas de regreso ",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
        });

        nombre.value = '';
        correo.value = '';
        telefono.value = '';
        contrasena.value = '';
        tipoForm.value = 'login';

    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
        });
    }
}

const ir = (form) => {
    tipoForm.value = form;
}

const limpiar = () => {
    localStorage.clear();
}


</script>
<style scoped>
.card {
    width: 30rem;
    padding: 2rem;
    margin-top: 10%;
    height: 40vh;
}

.main {
    height: 100vh;
}
</style>
