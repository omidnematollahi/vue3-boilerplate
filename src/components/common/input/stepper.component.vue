<template>
  <div :class="stepperClasses">
    <icon-button
      class="stepper__icon"
      icon-name="remove"
      variant="filled"
      style-type="filled"
      :disabled="disabled || isControllerDisabled.min"
      @click="updateValueByStep(-1)"
    />
    <input
      class="stepper__input"
      :value="inputValue"
      :size="inputValue.length + 1"
      @input="updateValue($event.target.value)"
      @blur="handleEmptyValue"
    />
    <icon-button
      class="stepper__icon"
      icon-name="add"
      variant="filled"
      style-type="filled"
      :disabled="disabled || isControllerDisabled.add"
      @click="updateValueByStep(1)"
    />
  </div>
</template>

<script setup>
  import { computed, nextTick, ref, toRefs } from 'vue';
  import { clamp } from '@/utils/math.util';
  import { useInput } from '@/plug-in/vee-validate';

  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
      validator(modelValue, props) {
        const [min, max] = props.valueRange;
        return modelValue <= max && modelValue >= min;
      },
    },
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    step: {
      type: Number,
      default: 1,
      validator(step) {
        return step > 0;
      },
    },
    valueRange: {
      type: Array,
      default: () => [0, 10],
      validator(range) {
        const [min, max] = range;

        return range.length === 2 && max >= min;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const stepperClasses = computed(() => ({
    stepper: true,
    stepper_disabled: props.disabled,
  }));

  const { modelValue: value } = toRefs(props);

  /**
   * @param {string|number} rawValue
   */
  const keepNumbersInRange = (rawValue) => {
    const sanitizedValue = rawValue
      .toString()
      .replace(/[^0-9-]|(?!^)-|(?<!^)-0+|^-?0+(?=\d)/g, '')
      .replace(/^-0$/, '-');

    if (sanitizedValue === '-' || sanitizedValue === '') {
      return sanitizedValue;
    }

    const sanitizedValueNumber = Number(sanitizedValue);

    const [min, max] = props.valueRange;
    const clampedValue = clamp(sanitizedValueNumber, { min, max });

    return clampedValue.toString();
  };

  const { value: inputValue } = useInput(props.name, props.rules, {
    strictRules: [keepNumbersInRange],
    options: {
      syncValue: value,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (newValue) => {
    inputValue.value = newValue;

    if (inputValue.value === '-' || inputValue.value === '') {
      return;
    }

    emit('update:modelValue', Number(inputValue.value));
  };

  const handleEmptyValue = () => {
    if (inputValue.value.length && inputValue.value !== '-') {
      return;
    }

    updateValue(props.modelValue);
  };

  const updateValueByStep = (changeFactor) => {
    const newValue = changeFactor * props.step + Number(inputValue.value);
    updateValue(newValue.toString());
  };

  const isControllerDisabled = computed(() => {
    const [min, max] = props.valueRange;

    return {
      min: props.modelValue <= min,
      add: props.modelValue >= max,
    };
  });
</script>

<style lang="scss" scoped>
  .stepper {
    @include flex($align: stretch);
    padding: space(1);
    background-color: var(--palette-surface-container);
    border-radius: $pill;

    &__input {
      @include typography(body-large);
      color: var(--palette-on-surface);
      flex-shrink: 0;
      flex-grow: 1;

      border-radius: $radius-1x;
      margin: 0 space(1);
      padding: 0 space(1);
      text-align: center;

      @include transition {
        transition-property: background-color;
      }

      &:hover,
      &:focus {
        background-color: var(--palette-surface-container-high);
      }
    }

    &__icon {
      flex-shrink: 0;
    }

    &_disabled {
      opacity: 0.38;
      background-color: transparent;
      pointer-events: none;
      color: var(--palette-on-surface);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--palette-on-surface);
        opacity: 0.12;
      }
    }
  }
</style>
