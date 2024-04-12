import Axios from 'axios';

class AxiosSingleton {
  static #instance;

  constructor(options) {
    return Axios.create(options);
  }

  static getInstance(options) {
    if (!AxiosSingleton.#instance) {
      AxiosSingleton.#instance = new AxiosSingleton(options);
    }

    return AxiosSingleton.#instance;
  }
}

export default AxiosSingleton;
