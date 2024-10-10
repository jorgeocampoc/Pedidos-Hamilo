<template>
  <div class="main">
    <Nav :usuario="usuario" />
    <div class="container mt-3">
      <!--productos vendedor-->
      <div class="row" v-if="usuario.rol == 'vendedor'">
        <div class="d-flex justify-content-between">
          <h3 class="m-auto  text-uppercase underline">Productos</h3>
          <button v-if="
            (usuario.rol == 'vendedor' || usuario.rol == 'admin') &&
            usuario.rol != null &&
            usuario.rol != undefined
          " class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#modalProducto">
            Agregar
          </button>
        </div>
        <div v-for="productoVendedor in productosVendedor" :key="productoVendedor.id"
          class="card border-0 shadow col-md-2 p-2 m-3 mt-5">
          <img :src="productoVendedor.imagen" class="card-img-top" alt="imagen productoVendedor" width="200"
            height="180" />
          <div class="card-body">
            <h5 class="card-title">{{ productoVendedor.nombre_producto }}</h5>
            <div class="card-text">
              {{ productoVendedor.descripcion }}
              <br />

              <div class="text-center ">
                <button v-if="
                  (usuario.rol == 'cliente' || usuario.rol == 'admin') &&
                  usuario.rol != null &&
                  usuario.rol != undefined
                " @click="productoSeleccionado(productoVendedor)" class="btn btn-sm btn-outline-primary "
                  data-bs-toggle="modal" data-bs-target="#modalPedido" style="border-radius: 50%">
                  <i class="fa fa-plus "></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--admin puede ver todos los productos-->

      <div class="row" v-if="
        (usuario.rol == 'admin') ||
        usuario.rol == 'cliente'
      ">


        <div class="d-flex justify-content-between">
          <h3 class="underline m-auto ">Productos</h3>
          <button v-if="
            (usuario.rol == 'vendedor' || usuario.rol == 'admin') &&
            usuario.rol != null &&
            usuario.rol != undefined
          " class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto">
            Agregar
          </button>
        </div>
        <div v-for="producto in productos" :key="producto.id" class="card col-md-2 p-2 m-3 mt-4 ">
          <img :src="producto.imagen" class="card-img-top" alt="imagen producto" width="200" height="150" />
          <div class="card-body">
            <h5 class="card-title">{{ producto.nombre_producto }}</h5>
            <div class="card-text pb-4">
              {{ producto.descripcion }}
              <br />

              <div class="text-center mt-2 absolute-custom">
                <button v-if="
                  (usuario.rol == 'cliente' || usuario.rol == 'admin') &&
                  usuario.rol != null &&
                  usuario.rol != undefined
                " @click="productoSeleccionado(producto)" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                  data-bs-target="#modalPedido" style="border-radius: 50%">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--pedidos del vendedor-->



      <!--pedidos del cliente-->

      <!-- <div
      class="row mb-3"
      v-if="pedidosCliente.length > 0 && usuario.rol == 'cliente'"
    >
      <div class="d-flex justify-content-between">
        <h3>Pedidos</h3>
      </div>
      <div
        v-for="pedidoCliente in pedidosCliente"
        :key="pedidoCliente.id"
        class="card col-md-4 p-2 m-1"
        @click="verPedido(pedidoCliente)"
      >
        <div class="text-center">
          <img
            :src="pedidoCliente.imagen"
            class=""
            alt="imagen producto"
            width="100"
            height="auto"
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
            <b>Teléfono:</b> {{ pedidoCliente.telefono }}
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
    </div> -->

      <!--pedidos del admin, todos los pedidos-->
      <!-- <div class="row" v-if="pedidos.length > 0 && usuario.rol == 'admin'">
      <div class="d-flex justify-content-between">
        <h3>Pedidos</h3>
      </div>
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="card col-md-4 p-2 m-1"
      >
        <div class="text-center">
          <img
            :src="pedido.imagen"
            class=""
            alt="imagen producto"
            width="100"
            height="auto"
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">
            <b> Producto: </b>{{ pedido.producto_nombre }}
          </h5>
          <div class="card-text">
            <b> Comentario:</b> {{ pedido.comentario }}
            <br />
            <b> Direccion: </b>{{ pedido.direccion }}
            <br />
            <b> Fecha pedido:</b
            >{{ new Date(pedido.fecha_pedido).toLocaleDateString() }}
            <br />
            <b> Fecha entrega:</b>
            {{ new Date(pedido.fecha_entrega).toLocaleDateString() }}
            <br />
            <b>Cliente:</b> {{ pedido.cliente }}
            <br />
            <b>Teléfono:</b> {{ pedido.telefono }}
            <br />
            <b>Estado:</b>
            <span v-if="pedido.estado == 'Pendiente'" class="badge bg-warning">
              {{ pedido.estado }}
            </span>
            <span v-if="pedido.estado == 'En camino'" class="badge bg-primary">
              {{ pedido.estado }}
            </span>
            <span v-if="pedido.estado == 'Entregado'" class="badge bg-success">
              {{ pedido.estado }}
            </span>
            <div class="mt-3">
              <button
                class="btn btn-warning btn-sm"
                @click="cambiarEstadoDePedido(pedido.id, 'Pendiente')"
              >
                Pendiente
              </button>
              <button
                class="btn btn-primary btn-sm mx-1"
                @click="cambiarEstadoDePedido(pedido.id, 'En camino')"
              >
                En camino
              </button>
              <button
                class="btn btn-success btn-sm"
                @click="cambiarEstadoDePedido(pedido.id, 'Entregado')"
              >
                Entregado
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->

      <!--Modal registro de productos-->

      <div class="modal fade" id="modalProducto" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitleId">Registrar Producto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                @click="reset()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="codigo" class="form-label">Codigo</label>
                <input type="text" class="form-control" v-model="codigo" id="codigo" />
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="nombre" id="nombre" />
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripcion</label>
                <textarea class="form-control" v-model="descripcion" id="descripcion" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <label for="imagen" class="form-label">Imagen</label>
                <input type="text" class="form-control" v-model="imagen" id="imagen" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="reset()">
                Cancelar
              </button>
              <button type="button" class="btn btn-primary" @click="registrarProducto()">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Modal pedido de productos-->

      <div class="modal fade" id="modalPedido" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitleId">Tu Pedido</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                @click="reset()"></button>
            </div>
            <div class="modal-body">
              <h3>Detalles</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Codigo:</th>
                    <td>{{ seleccionado.codigo }}</td>
                  </tr>
                  <tr>
                    <th>Nombre:</th>
                    <td>{{ seleccionado.nombre_producto }}</td>
                  </tr>
                  <tr>
                    <th>Descripcion:</th>
                    <td>{{ seleccionado.descripcion }}</td>
                  </tr>
                  <tr>
                    <th>Imagen:</th>
                    <td>
                      <img class="rounded-3 my-2" :src="seleccionado.imagen" width="100" height="auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-bs-target="#modalConfirmar" data-bs-toggle="modal">
                Continuar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Modal confirmar pedido-->

      <div class="modal fade" id="modalConfirmar" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitleId">
                Confirmar pedido de {{ seleccionado.nombre_producto }}
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                @click="reset()"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="comentarios" class="form-label">Comentarios</label>
                <input type="text" class="form-control" v-model="comentarios" id="comentarios" />
              </div>
              <div class="mb-3">
                <label for="fecha_entrega" class="form-label">Fecha entrega</label>
                <input type="date" class="form-control" v-model="fecha_entrega" id="fecha_entrega" />
              </div>

              <div class="mb-3">
                <label for="coordenadas" class="form-label">Coordenadas</label>
                <input type="text" class="form-control" v-model="coordenadas" id="coordenadas" readonly />
                <div class="text-end mt-3">
                  <button class="btn btn-primary btn-sm " data-bs-toggle="modal" data-bs-target="#modalMapa">Mi
                    ubicacion</button>
                </div>
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Direccion</label>
                <input type="text" class="form-control" v-model="direccion" id="direccion" />
              </div>
              <div class="mb-3">
                <label for="whatsapp" class="form-label">Whatsapp</label>
                <input type="text" class="form-control" :value="usuario.telefono" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" type="button" data-bs-target="#modalEnviar" data-bs-toggle="modal">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--Modal evio de pedido por whatsapp-->
      <div class="modal fade" id="modalEnviar" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitleId">Tu Pedido</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                @click="reset()"></button>
            </div>
            <div class="modal-body">
              <h3>Detalles</h3>
              <table>
                <tbody>
                  <tr>
                    <th>Codigo:</th>
                    <td>{{ seleccionado.codigo }}</td>
                  </tr>
                  <tr>
                    <th>Nombre:</th>
                    <td>{{ seleccionado.nombre_producto }}</td>
                  </tr>
                  <tr>
                    <th>Descripcion:</th>
                    <td>{{ seleccionado.descripcion }}</td>
                  </tr>
                  <tr>
                    <th>Imagen:</th>
                    <td>
                      <img :src="seleccionado.imagen" width="100" height="100" />
                    </td>
                  </tr>
                  <tr>
                    <th>Comentarios:</th>
                    <td>{{ comentarios }}</td>
                  </tr>
                  <tr>
                    <th>Fecha entrega:</th>
                    <td>{{ fecha_entrega }}</td>
                  </tr>
                  <tr>
                    <th>Coordenadas:</th>
                    <td>{{ coordenadas }}</td>
                  </tr>
                  <tr>
                    <th>Direccion:</th>
                    <td>{{ direccion }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <a :href="`https://wa.me/591${usuario.telefono}?text=Tu%20pedido%20es%20${seleccionado.nombre_producto}%20para%20la%20dirección%20${direccion}%20con%20fecha%20de%20entrega%20para%20el%20${fecha_entrega}.`"
                class="btn btn-success" target="_blank" @click="registrarPedido()">
                Finalizar pedido por whatsapp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Mapa-->
    <!-- Modal trigger button -->


    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="modalMapa" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              Modal title
            </h5>
            <button type="button" class="btn-close" data-bs-target="#modalConfirmar" data-bs-toggle="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <GoogleMap api-key="AIzaSyAtDY3jTFm21OrFaSXjebotMNLKaEkGd3g" style="width: 100%; height: 500px" :center="center"
              :zoom="15">
              <Marker :options="{ position: center, draggable:true }" @dragend="obtenerNuevo($event)" />
            </GoogleMap>

          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-primary" data-bs-target="#modalConfirmar"
              data-bs-toggle="modal">Guardar</button>
          </div>
        </div>
      </div>
    </div>





  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { GoogleMap, Marker } from 'vue3-google-map'
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import Nav from "../components/Nav.vue";

const route = useRouter();

const productos = ref([]);
const baseURL = "http://localhost:3000/";

const productosVendedor = ref([]);
const center = ref({ lat: 40.689247, lng: -74.044502 });
const codigo = ref("");
const nombre = ref("");
const descripcion = ref("");
const imagen = ref("");
const seleccionado = ref({});

const pedidosVendedor = ref({});
const pedidosCliente = ref({});

const pedidos = ref({});

const usuario = JSON.parse(localStorage.getItem("usuario")) || "";
const token = localStorage.getItem("token") || "";

const comentarios = ref("");
const fecha_entrega = ref("");
const coordenadas = ref("");
const direccion = ref("");

onMounted(() => {
  if (token == "" || token == null) {
    expirado();
  }
  miUbicacion();
  obtenerProductos();
  obtenerProductosVendedor();
  obtenerPedidosVendedor();
  obtenerPedidosCliente();
  obtenerPedidos();
});


const miUbicacion = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        center.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    })
}


const obtenerNuevo = (param) => {
    // console.log(param);
    coordenadas.value = {
        lat: param.latLng.lat(),
        lng: param.latLng.lng()
    }
 
    console.log(coordenadas.value.lat + ',' +coordenadas.value.lng);
 
    coordenadas.value = coordenadas.value.lat + ',' +coordenadas.value.lng;
 
    console.log(coordenadas.value);
}


const verPedido = (pedidoCliente) => {
  Swal.fire({
    title: pedidoCliente.producto_nombre,
    html: `
      <p>Texto 1: fd fds <br/> fdsf</p>
      <p>Texto 2: fd fds <br/> fdsf</p>
      <p>Texto 3: fd fds <br/> fdsf</p>
    `,
    imageUrl: pedidoCliente.imagen,
    imageWidth: 200,
    imageHeight: 'auto',

  });
}

const obtenerPedidosVendedor = async () => {
  try {
    const { data } = await axios.get(baseURL + "pedidos/usuario/" + usuario.id);
    pedidosVendedor.value = data.data;
    console.log("pedidos", pedidosVendedor.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPedidosCliente = async () => {
  try {
    const { data } = await axios.get(baseURL + "pedidos/cliente/" + usuario.id);
    pedidosCliente.value = data.data;
    console.log("pedidos cliente", pedidosCliente.value);
  } catch (error) {
    console.log(error);
  }
};

const obtenerProductosVendedor = async () => {
  try {
    const { data } = await axios.get(
      baseURL + "productos/usuario/" + usuario.id
    );
    productosVendedor.value = data.data;
    console.log(productosVendedor.value);
  } catch (error) {
    console.log(error);
  }
};
const obtenerPedidos = async () => {
  try {
    const { data } = await axios.get(baseURL + "pedidos");
    pedidos.value = data.data;
    console.log("pedidos", pedidos.value);
  } catch (error) {
    console.log(error);
  }
};

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

const obtenerProductos = async () => {
  try {
    const { data } = await axios.get(baseURL + "productos");
    productos.value = data;
    console.log(productos.value);
  } catch (error) {
    console.log(error);
  }
};

const productoSeleccionado = (producto) => {
  if (token == "" || token == null) {
    expirado();
  }
  seleccionado.value = producto;
};

const registrarProducto = async () => {
  const token2 = localStorage.getItem("token") || "";
  if (token2 == "" || token2 == null) {
    expirado();
  }
  const producto = {
    codigo: codigo.value,
    nombre_producto: nombre.value,
    descripcion: descripcion.value,
    imagen: imagen.value,
    vendedor_id: usuario.id,
  };
  try {
    const { data } = await axios.post(baseURL + "productos/store", producto);
    console.log(data);

    var myModalEl = document.getElementById("modalProducto");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    obtenerProductos();
    obtenerProductosVendedor()
    reset();
  } catch (error) {
    console.log(error);
  }
};

const registrarPedido = async () => {
  const token2 = localStorage.getItem("token") || "";
  if (token2 == "" || token2 == null) {
    expirado();
  }
  const pedido = {
    comentario: comentarios.value,
    fecha_entrega: fecha_entrega.value,
    coordenadas: coordenadas.value,
    direccion: direccion.value,
    vendedor_id: seleccionado.value.vendedor_id,
    cliente_id: usuario.id,
    producto_id: seleccionado.value.id,
  };
  try {
    const { data } = await axios.post(baseURL + "pedidos/store", pedido);
    console.log(data);
    obtenerPedidos();
    obtenerPedidosCliente();
    obtenerPedidosVendedor()
    reset();
    var myModalEl = document.getElementById("modalEnviar");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    console.log(error);
  }
};
const expirado = () => {
  Swal.fire({
    icon: "error",
    title: "Sesion expirada",
    text: "Debes iniciar sesion nuevamente!",
    timer: 2000,
    showConfirmButton: false,
  });

  route.push({ path: "/login" });
};
const reset = () => {
  codigo.value = "";
  nombre.value = "";
  descripcion.value = "";
  imagen.value = "";

  comentarios.value = "";
  fecha_entrega.value = "";
  coordenadas.value = "";
  direccion.value = "";
};
</script>

<style scoped>
.main {
  overflow-x: hidden;
}
</style>
