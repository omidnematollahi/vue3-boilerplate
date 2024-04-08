import { computed, ref } from 'vue';
import { supportedLocaleList, rtlLocaleList } from '../dictionary';

const locale = ref('');

const useLocale = () => {
  const getLocale = computed(() => locale.value);

  const setLocale = (newLocale) => {
    document.documentElement.setAttribute('lang', newLocale);

    const direction = rtlLocaleList.includes(newLocale) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);

    if (locale.value === newLocale) return;

    if (!supportedLocaleList.includes(newLocale))
      throw new Error(`Unsupported locale "${newLocale}"`);

    locale.value = newLocale;
  };

  return { locale: getLocale, setLocale, supportedLocaleList };
};

export default useLocale;
