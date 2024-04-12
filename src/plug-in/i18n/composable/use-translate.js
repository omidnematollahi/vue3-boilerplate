import { computed } from 'vue';

import { translate } from '../translate.js';
import useLocale from './use-locale.js';

const DEFAULT_CONFIG = Object.freeze({
  asComputed: true,
});

const useTranslate = (defaultConfig = DEFAULT_CONFIG) => {
  const { locale } = useLocale();

  /**
   * Decide if it's a single query or an array of queries and call translate function
   * @param {(string|string[])} queries
   * @param {Object} options
   * @param {string} [options.locale=locale.value]
   * @param {Object} options.params - parameters to replace within the translation
   * @returns {(string|Object)} - object contains query string and translations as values
   */
  const translateDirector = (queries, { locale, params }) => {
    if (typeof queries === 'string') {
      return translate(queries, { locale, params });
    }

    if (Array.isArray(queries)) {
      return queryList.reduce((dictionary, query) => {
        dictionary[query] = translate(query, { locale });
        return dictionary;
      }, {});
    }
  };

  /**
   * Apply configuration and call the translate director for translation
   * @param {(string|string[])} queries
   * @param {Object} params - parameters to replace within the translation
   * @param {Object} [config=defaultConfig]
   * @returns {(string|Object|import('vue').ComputedRef)} - object contains query string and translations as values
   */
  const translator = (queries, params, config = defaultConfig) => {
    const { asComputed } = config;

    if (asComputed) {
      return computed(() =>
        translateDirector(queries, { params, locale: locale.value })
      );
    }

    return translateDirector(queries, { params, locale: locale.value });
  };

  return { t: translator };
};

export default useTranslate;
