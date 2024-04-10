import afterEach from '@/router/middlewares/after-each.js';
import beforeEach from '@/router/middlewares/before-each.js';

/**
 * Apply beforeEach and afterEach middlewares
 * @param {Object} router - router instance
 */
const applyMiddlewares = (router) => {
  router.afterEach(afterEach);
  router.beforeEach(beforeEach);
};

export default { apply: applyMiddlewares };
