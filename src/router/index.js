import { createRouter, createWebHashHistory } from 'vue-router';
import ROUTES_MAP from '@/constants/router/routes.constant.js';
import Middlewares from '@/router/middlewares';

const routes = Object.values(ROUTES_MAP).map((routeConfig) => routeConfig);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

Middlewares.apply(router);

export default router;
