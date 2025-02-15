import { computed, ref } from 'vue';
import { supportedLocaleList, rtlLocaleList } from '../dictionary';

const locale = ref('');

const useLocale = () => {
  const getLocale = computed(() => locale.value);

  const direction = computed(() =>
    rtlLocaleList.includes(locale.value) ? 'rtl' : 'ltr'
  );

  const setLocale = (newLocale) => {
    document.documentElement.setAttribute('lang', newLocale);

    const newDirection = rtlLocaleList.includes(newLocale) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDirection);

    if (locale.value === newLocale) return;

    if (!supportedLocaleList.includes(newLocale))
      throw new Error(`Unsupported locale "${newLocale}"`);

    locale.value = newLocale;
  };

  return { locale: getLocale, setLocale, supportedLocaleList, direction };
};

export default useLocale;
