/**
 * Build request payload
 * @param {Object} request - AxiosRequest object
 * @param {Object} context
 * @param {Object} context.vueInstance - Current vue instance
 * @returns {any} - Modified response
 */
const getRequestPayload = (request) => {
  return request;
};

/**
 * Build error payload
 * @param {Object} error - AxiosError object
 * @param {Object} context
 * @param {Object} context.vueInstance - Current vue instance
 * @returns {any} - Modified error
 */
const getErrorPayload = (error) => {
  return Promise.reject(error);
};

export default {
  getRequestPayload,
  getErrorPayload,
};
