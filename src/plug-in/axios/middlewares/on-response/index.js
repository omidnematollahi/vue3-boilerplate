import responsibilities from './responsibilities';

/**
 * Response chain of responsibilities
 * @param {Object} response - AxiosResponse object
 * @param {Object} context
 * @param {Object} context.vueInstance - Current vue instance
 * @returns {any} - Modified response
 */
export const onResponse = (response, context) => {
  //TODO: Pass response to each response responsibility to modify (or not)
  return responsibilities.getResponsePayload(response, context);
};

/**
 * Error chain of responsibilities
 * @param {Object} error - AxiosError object
 * @param {Object} context
 * @param {Object} context.vueInstance - Current vue instance
 * @returns {any} - Modified error
 */
export const onResponseError = (error, context) => {
  //TODO: Pass error to each error responsibility to modify (or not)
  return responsibilities.getErrorPayload(error, context);
};

export default {
  onResponse,
  onResponseError,
};
