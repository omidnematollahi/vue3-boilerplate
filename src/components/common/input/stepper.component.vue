<template>
  <div :class="stepperClasses">
    <icon-button
      class="stepper__icon"
      icon-name="remove"
      variant="filled"
      style-type="filled"
      :disabled="disabled"
      @click="updateValueByStep(-1)"
    />
    <input
      class="stepper__input"
      :value="inputValue"
      @input="updateValue($event.target.value)"
      @blur="handleEmptyValue"
    />
    <icon-button
      class="stepper__icon"
      icon-name="add"
      variant="filled"
      style-type="filled"
      :disabled="disabled"
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
      type: String,
      default: '0',
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
    keepInRange: {
      type: Boolean,
      default: false,
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

  const sanitizeNumberOnly = (rawValue) => {
    const sanitizedValue = rawValue
      .replace(/[^0-9-]|(?!^)-|(?<!^)-0+|^-?0+(?=\d)/g, '')
      .replace(/^-0$/, '-');

    return sanitizedValue;
  };

  const { value: inputValue } = useInput(props.name, props.rules, {
    strictRules: [sanitizeNumberOnly],
    options: {
      syncValue: value,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const updateValue = (newValue) => {
    // const [min, max] = props.valueRange;
    // const clampedValue = clamp(value, { min, max });

    inputValue.value = newValue;

    if (inputValue.value === '-') {
      return;
    }
    emit('update:modelValue', inputValue.value);
  };

  const handleEmptyValue = () => {
    console.log(inputValue.value.length && inputValue.value !== '-');
    if (inputValue.value.length && inputValue.value !== '-') {
      return;
    }

    updateValue(props.modelValue);
  };

  const updateValueByStep = (changeFactor) => {
    const newValue = changeFactor * props.step + modelValue.value;
    updateValue(newValue);
  };
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
      padding: 0 space(2);

      &:hover {
        background-color: var(--palette-surface-container-high);
      }

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
