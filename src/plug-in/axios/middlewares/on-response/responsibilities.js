/**
 * Build response payload
 * @param {Object} response - AxiosResponse object
 * @param {Object} context
 * @param {Object} context.vueInstance - Current vue instance
 * @returns {any} - Modified response
 */
const getResponsePayload = (response) => response?.data;

/**
 * Build error payload
 * @param {Object} error - AxiosError object
 * @param {Object} context
 * @param {Object} context.vueInstance - Current vue instance
 * @returns {any} - Modified error
 */
const getErrorPayload = (error) => Promise.reject(error.response);

export default {
  getErrorPayload,
  getResponsePayload,
};
