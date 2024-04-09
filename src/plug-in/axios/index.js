import axios from 'axios';

import DefaultConfigBuilder from '@/plug-in/axios/default-config-builder';
import {
  requestMiddlewares,
  responseMiddlewares,
} from '@/plug-in/axios/middlewares';

export default (vueInstance, config) => {
  const baseConfig = { ...axios.defaults, ...config };
  axios.defaults = new DefaultConfigBuilder(baseConfig).build();

  axios.interceptors.request.use(
    (request) => requestMiddlewares.onRequest(request, { vueInstance }),
    (error) => requestMiddlewares.onRequestError(error, { vueInstance })
  );

  axios.interceptors.response.use(
    (response) => responseMiddlewares.onResponse(response, { vueInstance }),
    (error) => responseMiddlewares.onResponseError(error, { vueInstance })
  );
};
