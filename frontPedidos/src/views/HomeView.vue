
<template>
  <div>
    <div class="row">
      <div class="d-flex justify-content-between">
        <h3>Productos</h3>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalProducto"
        >
          Agregar
        </button>
      </div>
      <div
        v-for="producto in productos"
        :key="producto.id"
        class="card col-md-2 p-2 m-1"
      >
        <img
          :src="producto.imagen"
          class="card-img-top"
          alt="imagen producto"
          width="auto"
          height="auto"
        />
        <div class="card-body">
          <h5 class="card-title">{{ producto.nombre_producto }}</h5>
          <div class="card-text">
            {{ producto.descripcion }}
            <br />

            <div class="text-center">
              <button
                @click="productoSeleccionado(producto)"
                class="btn btn-sm btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalPedido"
                style="border-radius: 50%"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Modal registro de productos-->

    <div
      class="modal fade"
      id="modalProducto"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">Registrar Producto</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="reset()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="codigo" class="form-label">Codigo</label>
              <input
                type="text"
                class="form-control"
                v-model="codigo"
                id="codigo"
              />
            </div>
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                v-model="nombre"
                id="nombre"
              />
            </div>
            <div class="mb-3">
              <label for="descripcion" class="form-label">Descripcion</label>
              <textarea
                class="form-control"
                v-model="descripcion"
                id="descripcion"
                rows="3"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="imagen" class="form-label">Imagen</label>
              <input
                type="text"
                class="form-control"
                v-model="imagen"
                id="imagen"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="reset()"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="registrarProducto()"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Modal pedido de productos-->

    <div
      class="modal fade"
      id="modalPedido"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">Tu Pedido</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="reset()"
            ></button>
          </div>
          <div class="modal-body">
            <h3>Detalles</h3>
            <table>
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
            </table>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              data-bs-target="#modalConfirmar"
              data-bs-toggle="modal"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Modal confirmar pedido-->

    <div
      class="modal fade"
      id="modalConfirmar"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              Confirmar pedido de {{ seleccionado.nombre_producto }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="reset()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="comentarios" class="form-label">Comentarios</label>
              <input
                type="text"
                class="form-control"
                v-model="comentarios"
                id="comentarios"
              />
            </div>
            <div class="mb-3">
              <label for="fecha_entrega" class="form-label"
                >Fecha entrega</label
              >
              <input
                type="date"
                class="form-control"
                v-model="fecha_entrega"
                id="fecha_entrega"
              />
            </div>

            <div class="mb-3">
              <label for="coordenadas" class="form-label">Coordenadas</label>
              <input
                type="text"
                class="form-control"
                v-model="coordenadas"
                id="coordenadas"
              />
            </div>
            <div class="mb-3">
              <label for="direccion" class="form-label">Direccion</label>
              <input
                type="text"
                class="form-control"
                v-model="direccion"
                id="direccion"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-target="#modalEnviar"
              data-bs-toggle="modal"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--Modal evio de pedido por whatsapp-->
    <div
      class="modal fade"
      id="modalEnviar"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">Tu Pedido</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="reset()"
            ></button>
          </div>
          <div class="modal-body">
            <h3>Detalles</h3>
            <table>
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
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="registrarPedido()">
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const productos = ref([]);
const baseURL = "http://localhost:3000/";

const codigo = ref("");
const nombre = ref("");
const descripcion = ref("");
const imagen = ref("");
const seleccionado = ref({});

const comentarios = ref("");
const fecha_entrega = ref("");
const coordenadas = ref("");
const direccion = ref("");

onMounted(() => {
  obtenerProductos();
});

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
  seleccionado.value = producto;
};

const registrarProducto = async () => {
  const producto = {
    codigo: codigo.value,
    nombre_producto: nombre.value,
    descripcion: descripcion.value,
    imagen: imagen.value,
  };
  try {
    const { data } = await axios.post(baseURL + "productos/store", producto);
    console.log(data);

    var myModalEl = document.getElementById("modalProducto");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    obtenerProductos();
    reset();
  } catch (error) {
    console.log(error);
  }
};

const registrarPedido = async () => {
  const pedido = {
    comentarios: comentarios.value,
    fecha_entrega: fecha_entrega.value,
    coordenadas: coordenadas.value,
    direccion: direccion.value,
    vendedor_id: seleccionado.value.vendedor_id,
    cliente_id: 2,
    producto_id: seleccionado.value.id,
  };
  try {
    const { data } = await axios.post(baseURL + "pedidos/store", pedido);
    console.log(data);

    reset();
    var myModalEl = document.getElementById("modalEnviar");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    console.log(error);
  }
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
