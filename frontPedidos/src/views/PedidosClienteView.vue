<template>
    <div class="main">
        <Nav :usuario="usuario"/>

        <div
      class="row mb-3 justify-content-evenly "
      v-if="pedidosCliente.length > 0 && usuario.rol == 'cliente'">
      <div
        v-for="pedidoCliente in pedidosCliente"
        :key="pedidoCliente.id"
        class="card col-md-2 p-2 m-1 shadow border-0 mt-2"
        @click="verPedido(pedidoCliente)"
      >
        <div class="text-center">
          <img
            :src="pedidoCliente.imagen"
            class="rounded-2"
            alt="imagen producto"
            width="300"
            height="250"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <b> Producto: </b>{{ pedidoCliente.producto_nombre }}
          </h5>
          <div class="card-text">
            <b> Comentario:</b> {{ pedidoCliente.comentario }}
            <br />
            <b> Direccion: </b>{{ pedidoCliente.direccion }}
            <br />
            <b> Fecha pedido:</b
            >{{ new Date(pedidoCliente.fecha_pedido).toLocaleDateString() }}
            <br />
            <b> Fecha entrega:</b>
            {{ new Date(pedidoCliente.fecha_entrega).toLocaleDateString() }}
            <br />
            <b>Vendedor:</b> {{ pedidoCliente.vendedor }}
            <br />
            <b>Teléfono:</b> {{ pedidoCliente.telefono }} <br> 
            <strong>Ubicacion: </strong>
            <a :href="`https://www.google.com/maps?q=${pedidoCliente.coordenadas}`" target="_blank">

              <i class="fa-solid fa-location-dot fs-4"></i>
            </a>
            <br />
            <b>Estado: </b>
            <span
              v-if="pedidoCliente.estado == 'Pendiente'"
              class="badge bg-warning"
            >
              {{ pedidoCliente.estado }}
            </span>
            <span
              v-if="pedidoCliente.estado == 'En camino'"
              class="badge bg-primary"
            >
              {{ pedidoCliente.estado }}
            </span>
            <span
              v-if="pedidoCliente.estado == 'Entregado'"
              class="badge bg-success"
            >
              {{ pedidoCliente.estado }}
            </span>
          </div>
        </div>
      </div>
    </div>


    </div>
</template>
<script setup>
import Nav from '@/components/Nav.vue';
import {ref, onMounted} from 'vue'
import axios from "axios";

const baseURL = "http://localhost:3000/";
const token = localStorage.getItem("token") || "";
const usuario = JSON.parse(localStorage.getItem("usuario")) || "";


const pedidosCliente = ref({});
onMounted(() => {
  if (token == "" || token == null) {
    expirado();
  }
  obtenerPedidosCliente();
});


const obtenerPedidosCliente = async () => {
  try {
    const { data } = await axios.get(baseURL + "pedidos/cliente/" + usuario.id);
    pedidosCliente.value = data.data;
    console.log("pedidos cliente", pedidosCliente.value);
  } catch (error) {
    console.log(error);
  }
};


</script>

<style scoped>
.main{
    overflow-x: hidden;
  }
</style>