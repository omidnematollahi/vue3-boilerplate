import { eventBus } from '@/services/event-bus';

/**
 * Update document title based on `route.meta.title`
 * @param {Object} to - VueRouter `to` route object
 * @returns {undefined}
 */
const updateDocumentTitle = (to) => {
  const title = to.meta.title;
  if (!title) return;

  document.title = title;
};

/**
 * Publish afterEach happened event
 */
const publishEvent = () => {
  eventBus.publish('router:afterEach');
};

/**
 * afterEach middlewares call
 * @param {Object} to - VueRouter `to` route object
 * @param {Object} from - VueRouter `from` route object
 */
const afterEach = (to, from) => {
  updateDocumentTitle(to, from);
  publishEvent(to, from);
};

export default afterEach;
