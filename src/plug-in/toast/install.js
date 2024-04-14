import ToastManager from './toast-manager.js';
import ToastManagerComponent from './components/toast-manager.component.vue';

export default (vueInstance, config) => {
  const toastManager = new ToastManager(config);

  vueInstance.provide('toast', toastManager);
  vueInstance.component('toast-manager', ToastManagerComponent);
};
