import { createApp as createVueApp } from 'vue';

import App from '@/app.vue';
import { registerPlugins } from '@/plug-in';
import { registerCommonComponents } from '@/components';

import '@/assets/scss/style.scss';

//TODO: move to constants or configs
const pluginConfigs = {
  i18n: {
    defaultLocale: 'en',
  },
};

const createApplication = () => {
  const vueAppInstance = createVueApp(App);

  registerPlugins(vueAppInstance, pluginConfigs);
  registerCommonComponents(vueAppInstance);

  vueAppInstance.mount('#app');
};

createApplication();
