import { ref } from 'vue';

const defaultConfig = {
  throwOnError: false,
};

export const usePromise = (promise, { throwOnError } = defaultConfig) => {
  const loading = ref(false);
  const error = ref(null);
  const data = ref(null);

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
