<template>
    <div class="main">
        <Nav :usuario="usuario"/>
        
        <div
      class="row justify-content-evenly"
      v-if="pedidosVendedor.length > 0 && usuario.rol == 'vendedor'"
    >
      
      <div
        v-for="pedidoVendedor in pedidosVendedor"
        :key="pedidoVendedor.id"
        class="card col-md-3 p-2 m-1 shadow border-0 gap-3 mx-2"
      >
        <div class="text-center">
          <img
            :src="pedidoVendedor.imagen"
            class="rounded-2"
            alt="imagen producto"
            width="200"
            height="180"
          />
        </div>
        <div class="card-body">
          <!--mostar el nombre producto buscando por el producto_id en productos-->

          <h5 class="card-title">
            <b> Producto: </b>{{ pedidoVendedor.producto_nombre }}
          </h5>
          <div class="card-text">
            <b> Comentario:</b> {{ pedidoVendedor.comentario }}
            <br />
            <b> Direccion: </b>{{ pedidoVendedor.direccion }}
            <br />
            <b> Fecha pedido:</b
            >{{ new Date(pedidoVendedor.fecha_pedido).toLocaleDateString() }}
            <br />
            <b> Fecha entrega:</b>
            {{ new Date(pedidoVendedor.fecha_entrega).toLocaleDateString() }}
            <br />
            <b>Cliente:</b> {{ pedidoVendedor.cliente }}
            <br />
            <b>Teléfono:</b> {{ pedidoVendedor.telefono }}
            <br> 
            <strong>Ubicacion: </strong>
            <a :href="`https://www.google.com/maps?q=${pedidoVendedor.coordenadas}`" target="_blank">

              <i class="fa-solid fa-location-dot fs-4"></i>
            </a>

            <br />
            <b>Estado:</b>
            <span
              v-if="pedidoVendedor.estado == 'Pendiente'"
              class="badge bg-warning ms-2"
            >
              {{ pedidoVendedor.estado }}
            </span>
            <span
              v-if="pedidoVendedor.estado == 'En camino'"
              class="badge bg-primary ms-2"
            >
              {{ pedidoVendedor.estado }}
            </span>
            <span
              v-if="pedidoVendedor.estado == 'Entregado'"
              class="badge bg-success ms-2"
            >
              {{ pedidoVendedor.estado }}
            </span>
            <div class="mt-3 text-center">
              <button
                class="btn btn-warning btn-sm"
                @click="cambiarEstadoDePedido(pedidoVendedor.id, 'Pendiente')"
              >
                Pendiente
              </button>
              <button
                class="btn btn-primary btn-sm mx-3"
                @click="cambiarEstadoDePedido(pedidoVendedor.id, 'En camino')"
              >
                En camino
              </button>
              <button
                class="btn btn-success btn-sm"
                @click="cambiarEstadoDePedido(pedidoVendedor.id, 'Entregado')"
              >
                Entregado
              </button>
            </div>
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


const pedidosVendedor = ref({});

onMounted(() => {
  if (token == "" || token == null) {
    expirado();
  }
  obtenerPedidosVendedor();

});

const cambiarEstadoDePedido = async (id, estado) => {
  try {
    const { data } = await axios.put(baseURL + "pedidos/estado/" + id, {
      estado: estado,
    });
    obtenerPedidosVendedor();
    obtenerPedidos();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPedidosVendedor = async () => {
  try {
    const { data } = await axios.get(baseURL + "pedidos/usuario/" + usuario.id);
    pedidosVendedor.value = data.data;
    console.log("pedidos", pedidosVendedor.value);
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