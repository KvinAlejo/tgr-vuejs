import { createRouter, createWebHistory } from "vue-router";
import CargaDescarga from '../views/CargaDescarga.vue';

const routes = [
  {
    path: '/cargadescarga',
    name: 'CargaDescarga',
    component: CargaDescarga
  }
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;