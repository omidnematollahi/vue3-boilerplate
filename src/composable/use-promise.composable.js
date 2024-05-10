import { ref } from 'vue';

/**
 * @typedef {Object} UsePromiseConfig
 * @property {boolean} [throwOnError=false] - Should throw error if happened
 */
const defaultConfig = {
  throwOnError: false,
};

/**
 * usePromise composable
 * @param {Promise} promise - any function that returns a promise
 * @param {UsePromiseConfig} config - usePromise options
 * @returns {Object} - {data, error, loading, execute}
 */
export const usePromise = (promise, { throwOnError } = defaultConfig) => {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

  /**
   * Execute promise
   * @param  {...any} params - params to call promise with them
   * @returns
   */
  const execute = async (...params) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    try {
      data.value = await promise(...params);
      return data.value;
    } catch (errorDetails) {
      error.value = errorDetails;

      if (throwOnError) throw errorDetails;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, execute };
};

export default usePromise;
