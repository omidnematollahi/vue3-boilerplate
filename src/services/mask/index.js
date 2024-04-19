import {
  REGEX_TOKEN,
  REGEX_STARTING_CHAR,
  REGEX_ENDING_CHAR,
  DEFAULT_TOKEN,
} from '@/constants/mask.constant.js';

class Mask {
  #patternCharList;
  #pattern;
  #token;

  /**
   * Return array of mapped pattern characters
   * @param {string} pattern
   * @returns {Array.<string>} - Array of mapped pattern characters
   */

  #getPatternList(pattern) {
    const token = this.#token;
    const namedPatterns = {
      time: `${token}${token}:${token}${token}`,
    };
    const mappedPattern = namedPatterns[pattern] || pattern;

    return mappedPattern.split('');
  }

  /**
   * @param {string} pattern
   * @param {string} token
   * @constructor
   */

  constructor(pattern, token = DEFAULT_TOKEN) {
    this.#token = token;
    this.#pattern = pattern;
    this.#patternCharList = this.#getPatternList(pattern, token);
  }

  /**
   * Returns value is masked or not
   * @param {string} value
   * @returns {boolean} - isMasked
   */

  calcIsMasked(value) {
    if (!value) return false;

    const patternCharList = this.#patternCharList;

    const upperBound = Math.min(patternCharList.length, value.length);
    const subPatternList = patternCharList.slice(0, upperBound);
    const subValue = value.substring(0, upperBound);
    const regex = this.#toRegex(subPatternList, this.#token);

    return regex.test(subValue);
  }

  /**
   * Return regex that can be used to check value is masked or not
   * @param {Array.<string>} patternCharList
   * @returns {RegExp}
   */

  #toRegex(patternCharList) {
    const regexPattern = patternCharList
      .map((char) => (char === this.#token ? REGEX_TOKEN : char))
      .join('');
    const regex = new RegExp(
      REGEX_STARTING_CHAR + regexPattern + REGEX_ENDING_CHAR
    );
    return regex;
  }

  /**
   * Returns augment that will be added to value according to pattern
   * @param {Object} payload
   * @param {string} payload.patternChar
   * @param {Array.<string>} payload.valueCharList
   * @param {boolean} payload.isMasked
   * @returns {string} - augment
   */

  #getAugmentByPattern({ patternChar, valueCharList, isMasked }) {
    if (patternChar === this.#token) {
      const valueChar = valueCharList.shift();
      return valueChar || '';
    }

    return isMasked ? patternChar : '';
  }

  /**
   * Returns masked or unMasked value
   * @param {string} value
   * @param {boolean} isMasked
   * @returns {string} - masked to unMasked value
   */

  #getSanitizedValue(value, isMasked) {
    let sanitizedValue = '';
    const valueCharList = String(value)
      .split('')
      .filter((char) => !this.#patternCharList.includes(char));

    while (this.#patternCharList.length && valueCharList.length) {
      const patternChar = this.#patternCharList.shift();
      sanitizedValue += this.#getAugmentByPattern({
        patternChar,
        valueCharList,
        isMasked,
      });
    }

    sanitizedValue += valueCharList.join('');

    this.#patternCharList = this.#getPatternList(this.#pattern, this.#token);

    return sanitizedValue;
  }

  /**
   * Returns masked value
   * @param {string} value
   * @returns {string} - masked value
   */

  toMasked(value) {
    if (!value) return value;

    const maskedValue = this.#getSanitizedValue(value, true);

    return maskedValue;
  }

  /**
   * Returns unMasked value
   * @param {string} value
   * @returns {string} - unMasked value
   */

  toUnMasked(value) {
    if (!value) return value;

    const unMaskedValue = this.#getSanitizedValue(value, false);

    return unMaskedValue;
  }
}

export default Mask;
