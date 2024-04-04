import { dictionaries } from './dictionary';
import { doubleBracketReplace } from '@/utils/string.js';

/**
 *
 * @param {string} query - query to find in the dictionary
 * @param {Object} options
 * @param {string} options.locale - The locale
 * @param {Object} options.params - parameters to replace within the translation
 * @returns {string} - translation
 */
export const translate = (query, { params, locale }) => {
  const dictionary = dictionaries[locale];
  if (!dictionary) throw new Error(`Unsupported locale "${locale}"`);

  try {
    const queryAsList = query.split('.');
    const queryTranslation = queryAsList.reduce(
      (dictionaryChunk, queryChunk) => {
        return dictionaryChunk[queryChunk];
      },
      dictionary
    );

    if (!queryTranslation) {
      throw new Error(`Undefined query "${query}"`);
    }

    const translation = doubleBracketReplace(queryTranslation, params);
    return translation;
  } catch (error) {
    console.error(error);
  }
};

export default { translate };
