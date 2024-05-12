import eventBus from '@/services/event-bus';

/**
 * Publish beforeEach happened event
 */
const publishEvent = () => {
  eventBus.publish('router:beforeEach');
};

/**
 * BeforeEach middlewares call
 * @param {Object} to - VueRouter `to` route object
 * @param {Object} from - VueRouter `from` route object
 */
const beforeEach = (to, from) => {
  publishEvent(to, from);
};

export default beforeEach;
