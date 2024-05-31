import { computed, toValue, watch, triggerRef } from 'vue';
import { useField } from 'vee-validate';

import Mask from '@/services/mask';
import { useTranslate } from '@/plug-in/i18n';

const { t: translator } = useTranslate({ asComputed: false });

const DEFAULT_OPTIONS = Object.freeze({
  validationConfig: {
    validateOnMount: false,
  },
  errorAsCode: false,
  maskPattern: '',
});

const useInput = (name, rules, { strictRules = [], options = {} } = {}) => {
  const { errorAsCode, validationConfig, maskPattern, syncValue } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const { value: fieldValue, errors: fieldErrors } = useField(name, rules, {
    ...DEFAULT_OPTIONS.validationConfig,
    ...(validationConfig ?? {}),
  });

  const mask = new Mask(maskPattern);
  const value = computed({
    get: () => mask.toMasked(fieldValue.value),
    set: (newValue) => {
      const unMaskedValue = mask.toUnMasked(newValue);
      const strictValue = strictRules.reduce(
        (strictValue, rule) => rule(strictValue),
        unMaskedValue
      );

      fieldValue.value = strictValue;

      const hasValueChanged = unMaskedValue !== strictValue;
      if (hasValueChanged) triggerRef(value);
    },
  });

  if (syncValue) {
    watch(
      syncValue,
      () => {
        value.value = toValue(syncValue);
      },
      {
        deep: true,
        immediate: true,
      }
    );
  }

  const errors = computed(() => {
    if (errorAsCode) {
      return fieldErrors.value;
    }

    return fieldErrors.value.map(({ name, params }) =>
      translator(`validationErrors.${name}`, params)
    );
  });

  const errorMessage = computed(() => errors.value[0]);

  return { value, fieldValue, errors, errorMessage };
};

export default useInput;
