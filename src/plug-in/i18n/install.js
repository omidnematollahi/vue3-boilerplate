import { translate } from './translate.js';
import { useLocale } from './index.js';

export default (vueInstance, config) => {
  const { setLocale, locale: defaultLocale } = useLocale();
  setLocale(config?.defaultLocale ?? 'en');

  vueInstance.config.globalProperties.$t = (
    query,
    locale = defaultLocale.value
  ) => {
    return translate(query, locale);
  };
};
