import Axios from 'axios';

class DefaultConfigBuilder {
  #defaultConfig = {};
  /**
   *
   * @param {Object} config - axios config
   */
  constructor(config) {
    this.#defaultConfig = { ...Axios.defaults, ...config };
  }

  /**
   * Set common headers like `Cache-Control`
   */
  #setCommonHeaders() {
    this.#defaultConfig.headers.common['Cache-Control'] = 'no-cache';
  }

  /**
   * Set authorize headers like `token` or something.
   */
  #setSystemAuthorizeHeaders() {
    //TODO: Authorize headers base on project
  }

  /**
   * Set request timeout duration
   */
  #setTimeOutDuration() {
    const TWO_MINUTES = 2 * 60 * 1000;
    this.#defaultConfig.timeout = TWO_MINUTES;
  }

  /**
   *
   * @returns {Object} - default config
   */
  build() {
    this.#setTimeOutDuration();
    this.#setCommonHeaders();
    this.#setSystemAuthorizeHeaders();

    return this.#defaultConfig;
  }
}

export default DefaultConfigBuilder;
