import { createRouter, createWebHashHistory } from 'vue-router';
import ROUTES from '@/router/routes.js';
import Middlewares from '@/router/middlewares';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: ROUTES,
});

Middlewares.apply(router);

export default router;
