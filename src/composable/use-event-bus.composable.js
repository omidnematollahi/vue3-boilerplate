import { onUnmounted } from 'vue';
import eventBus from '@/services/event-bus';

export const useEventBus = () => {
  const subscriptionMap = {};

  const subscribeOn = (eventName, callback) => {
    const subscription = eventBus.subscribeOn(eventName, callback);
    subscriptionMap[subscription.id] = subscription.unsubscribe;

    return subscription;
  };

  const publish = (eventName, ...args) => eventBus.publish(eventName, ...args);

  const unsubscribe = (subscriptionId) => {
    subscriptionMap[subscriptionId]?.();
    subscriptionMap[subscriptionId] = null;
  };

  onUnmounted(() => {
    Object.values(subscriptionMap).forEach((unSubscriber) => unSubscriber?.());
  });

  return { subscribeOn, publish, unsubscribe };
};

export default useEventBus;
