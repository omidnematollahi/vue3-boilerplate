import { eventBus } from '@/plug-in/event-bus';

const beforeEach = () => {
  eventBus.publish('router:beforeEach');
};

const afterEach = (to) => {
  eventBus.publish('router:afterEach');

  const title = to.meta.title;
  if (!title) return;

  document.title = title;
};

const _init = (router) => {
  router.afterEach(afterEach);
  router.beforeEach(beforeEach);
};

export default _init;
