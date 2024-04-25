export const PRESENTATION_ROUTE = Object.freeze({
  name: 'presentation',
  path: '/presentation',
  component: () => import('@/views/presentation/presentation-view.vue'),
  meta: {
    title: 'Presentation | Boilerplate',
    transition: 'switch-fade',
  },
});

export const PLAYGROUND_ROUTE = Object.freeze({
  name: 'playground',
  path: '/playground',
  component: () => import('@/views/playground/playground-view.vue'),
  meta: {
    layout: 'panel',
    title: 'Playground | Boilerplate',
    transition: 'switch-fade',
  },
});

export const ROOT_ROUTE = Object.freeze({
  name: 'root',
  path: '/',
  redirect: { name: 'presentation' },
});

export default { PRESENTATION_ROUTE, PLAYGROUND_ROUTE, ROOT_ROUTE };
