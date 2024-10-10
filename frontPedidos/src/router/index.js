import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PedidosClienteView from '@/views/PedidosClienteView.vue'
import PedidosVendedorView from '@/views/PedidosVendedorView.vue'
import TodoPedidosView from '@/views/TodoPedidosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/pedidosClientes',
      name: 'pedidosClientes',
      component: PedidosClienteView
    },
    {
      path: '/pedidosVendedor',
      name: 'pedidosVendedor',
      component: PedidosVendedorView
    },
  
    {
      path: '/pedidos',
      name: 'pedidos',
      component: TodoPedidosView
    },
  
  ]
})

export default router
