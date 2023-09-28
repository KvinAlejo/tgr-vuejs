import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/Login.vue';
import Sidebar from '../components/Sidebar.vue';
import ConsultarEditarGravamen from '../views/ConsultarEditarGravamen.vue';
import CrearGravamen from '../views/CrearGravamen.vue';
import CargaDescarga from '../views/CargaDescarga.vue';
import GeneraFolios from '../views/GeneraFolios.vue';
import RecargaAnual from '../views/RecargaAnual.vue';
import Utm from '../views/Utm.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'sidebar',
    component: Sidebar,
    meta: { requiresAuth: true }, // Usa el componente Sidebar para la ruta raíz
    children: [
      // ... tus otras rutas aquí ...
      {
        path: '/crearGravamen',
        name: 'crearGravamen',
        component: CrearGravamen
      },
      {
        path: '/consultareditargravamen',
        name: 'ConsultarEditarGravamen',
        component: ConsultarEditarGravamen
      },
      {
        path: '/cargadescarga',
        name: 'CargaDescarga',
        component: CargaDescarga
      },
      {
        path: '/generafolios',
        name: 'GeneraFolios',
        component: GeneraFolios
      },
      {
        path: '/recargaanual',
        name: 'RecargaAnual',
        component: RecargaAnual
      },
      {
        path: '/utm',
        name: 'Utm',
        component: Utm
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;