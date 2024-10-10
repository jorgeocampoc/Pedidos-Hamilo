
<template>
    <nav
        class="navbar navbar-expand-sm navbar-dark bg-opacity mb-3 text-white p-3"
    >
        <div class="container">
            <a class="navbar-brand bg-warning rounded-3 px-2 me-5" href="#">
      <img src="https://www.hamiloes.cool/wp-content/uploads/2023/05/Diseno-sin-titulo-5.png" alt="Bootstrap" width="40" height="auto">
    </a>
            <button
                class="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-link text-uppercase text-white">
                        <strong>{{ props.usuario.rol }}</strong> - {{ props.usuario.nombre }}
                    </li>
                    <li  class="nav-item text-uppercase ">
                        <RouterLink to="/" class="nav-link mx-3 " active-class="active">
                            Principal
                        </RouterLink>
                    </li>
                    <li v-if="props.usuario.rol == 'cliente'" class="nav-item text-uppercase ">
                        <RouterLink to="pedidosClientes" class="nav-link mx-3 " active-class="active">
                            Mis pedidos
                        </RouterLink>
                    </li>
                    <li v-if="props.usuario.rol == 'vendedor'" class="nav-item text-uppercase ">
                        <RouterLink to="pedidosVendedor" class="nav-link mx-3 " active-class="active">
                            Mis ventas
                        </RouterLink>
                    </li>
                    <li v-if="props.usuario.rol == 'admin'" class="nav-item text-uppercase ">
                        <RouterLink to="pedidos" class="nav-link mx-3 " active-class="active">
                            Ventas
                        </RouterLink>
                    </li>
                   
                 
                </ul>
             
            </div>
            <div>
                <button class="btn btn-danger rounded-3" @click="salir()">
                    Salir
                </button>
            </div>
        </div>
    </nav>
    
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';
const props = defineProps({
    usuario:{
        type:Object,
        required:true
    }
})

const router = useRouter();

const salir = ()=>{
    router.push('/login')
}

</script>

<style scoped>
    nav{
        width: 100vw !important;
    }

    .bg-opacity{
        background-color: rgba(0, 0, 0, 0.712);
    }
</style>