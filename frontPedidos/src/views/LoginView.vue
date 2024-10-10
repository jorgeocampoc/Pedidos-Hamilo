<template>
    <div class="d-flex justify-content-center main ">

        <div v-if="tipoForm == 'login'" class="card card-custom animate__animated  animate__slideInRight bg-dark-opacity rounded-3 ">
            <div class="card-body">
                <h3 class="text-center text-uppercase fs-5 text-white mb-5 uppercase">Iniciar sesión</h3>

                <div class="form-floating mb-3">
                    <input type="text" v-model="correo" class="form-control" id="floatingInput" placeholder="">
                    <label for="floatingInput">Correo</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="password" v-model="contrasena" class="form-control" id="contrasena" placeholder="Contraseña">
                    <label for="contrasena">Contraseña</label>
                </div>

                <div class="mt-4 text-center ">
                    <button @click="ingresar()" class="btn-custom border border-success rounded-5 text-white bg-outline-success">Iniciar sesión</button>
                </div>
               
                <div class="mb-3 text-center absolute-custom">
                    <p class="text-white  ">¿ No tienes una cuenta ? <label class="label ms-2 fw-bold"  @click="ir('registrarse')">Registrate</label></p>
                    <!-- <button @click="ir('registrarse')" class="btn btn-outline-success">Registrate</button> -->
                </div>

            </div>
            
        </div>

        <div v-if="tipoForm == 'registrarse'" class="card card-custom-reg  animate__animated  animate__slideInLeft bg-dark-opacity rounded-3 ">
            <div class="card-body">
                <h3 class="text-center text-uppercase uppercase fs-5 text-white mb-4 pb-2">Registrarse</h3>

                <div class="form-floating mb-3">
                    <input type="text" v-model="nombre" class="form-control " id="floatingInput" placeholder="">
                    <label for="floatingInput">Nombre completo</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="correo" class="form-control " id="correo" placeholder="">
                    <label for="floatingInput">Correo</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" v-model="telefono" class="form-control " id="telefono" placeholder="">
                    <label for="floatingInput">Telefono</label>
                </div>
                <div class="row">
                   <div class="col-6">
                    <div class="form-floating mb-3">
                    <input type="password" v-model="contrasena" class="form-control " id="contrasena" placeholder="">
                    <label for="contrasena">Contraseña</label>
                </div>
                   </div>
                <div class="col-6">
                    <div class="form-floating mb-3">
                    <input type="password" v-model="contrasenaCon" class="form-control " id="contrsenaCon" placeholder="">
                    <label for="contrsenaCon">Confirmar contraseña</label>
                </div>
                </div>
                </div>

                <div class="my-3 text-center">
                    <button @click="registrar()" class="btn-custom border border-success rounded-5 text-white bg-outline-success ">Registrarse</button>
                </div>
                <div class="mb-3 text-center">
                    <p class="text-white mt-4 ">¿ Ya tienes una cuenta ? <label class="label ms-2 fw-bold"  @click="ir('login')">Iniciar Sesion</label></p>
                    <!-- <button @click="ir('login')" class="btn btn-outline-success absolute-custom-reg mb-3 ">Iniciar sesion</button> -->
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'
import { alertInfo } from '@/helpers/alerts';
const route = useRouter();
const nombre = ref('');
const correo = ref('');
const telefono = ref('');
const contrasena = ref('');
const contrasenaCon = ref('');
const usuario = ref('user1');
const rol = ref('cliente');
const tipoForm = ref('login');
let baseURL = 'http://localhost:3000/auth';

onMounted(() => {
    limpiar();
})

const ingresar = async () => {
    if (correo.value == '' || contrasena.value == '') {
        alertInfo('Error','ingrese sus credenciales','error','Regresar')
        contrasena.value = ''
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
        alertInfo('Usuario registrado',`El usuario ${data.nombre} se registro`,'success','Iniciar sesion')
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
        alertInfo('Campos requerido','Todos los campos son requeridos','error','Regresar')
        return;
    }

    if( contrasenaCon.value !== contrasena.value ){
        alertInfo('Error','Las contraseñas no coinciden','error','Regresar');
        contrasena.value = '';
        contrasenaCon.value = ''
        return;
    }
    var datos = {
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
        contrasena: contrasena.value,
        usuario: usuario.value,
        rol: rol.value,
    }

    try {
        const { data } = await axios.post('http://localhost:3000/usuarios', datos);
        alertInfo('Bienvenido',`El usuario ${datos.nombre} se registro`,'success','Iniciar sesion', )
        limpiarCampos();
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

const limpiarCampos = ()=>{
    nombre.value= '';
    correo.value= '';
    telefono.value= '';
    contrasena.value= '';
    contrasenaCon.value= '';
}

const ir = (form) => {
    tipoForm.value = form;
    limpiarCampos()
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
}

.card-custom{
    height: 50vh;

}
.card-custom-reg{
    height: 65vh;

}

.main {
    height: 100vh;
    width: 100vw;
    background-image: url('../assets/imagenes/login1.jpg');
    background-size: cover;
    background-position: center;
}
.main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.absolute-custom{
    position: absolute;
    bottom: 0;
    right: 25%;
}
.absolute-custom-reg{
    position: absolute;
    bottom: 0;
    left: 35%;
}

.label{
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 5px;
}
.label:hover{
    color: rgb(177, 173, 166);
}
</style>
