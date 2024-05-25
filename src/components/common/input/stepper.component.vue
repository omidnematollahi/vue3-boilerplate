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
    <div
      class="stepper__input"
      :contenteditable="!disabled && isContentEditable"
      ref="inputElement"
      @input="enterValue"
      @blur="equalizeValues"
      @click="focusInput"
    >
      {{ modelValue }}
    </div>
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
  import { computed, nextTick, ref } from 'vue';
  import { clamp } from '@/utils/math.util';
  import { moveCursorToEnd } from '@/utils/dom.util';

  const props = defineProps({
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

  const inputElement = ref(null);
  const isContentEditable = ref(false);

  const modelValue = defineModel({ type: Number, default: 0 });

  const fixHyphenPlace = (value) => {
    return value.replace(/(.*?)(-)?$/, (match, p1, p2) => {
      return p2 ? '-' + p1 : p1;
    });
  };

  const enterValue = (event) => {
    const rawValue = fixHyphenPlace(event.target.textContent);

    if (event.data === '-' || rawValue === '-') {
      inputElement.value.innerText = '-';
      moveCursorToEnd(inputElement.value);
      return;
    }

    const newValue = Number(rawValue);
    const isValidValue = !isNaN(newValue);

    updateValue(isValidValue ? newValue : modelValue.value);
  };

  const updateValue = (value) => {
    const [min, max] = props.valueRange;

    const clampedValue = clamp(value, { min, max });

    modelValue.value = clampedValue;
    inputElement.value.innerText = clampedValue;

    moveCursorToEnd(inputElement.value);
  };

  const updateValueByStep = (changeFactor) => {
    const newValue = changeFactor * props.step + modelValue.value;
    updateValue(newValue);
  };

  const equalizeValues = () => {
    isContentEditable.value = false;

    const inputValue = Number(inputElement.value.innerText);
    if (inputValue === modelValue.value) {
      return;
    }

    updateValue(modelValue.value);
  };

  const focusInput = () => {
    isContentEditable.value = true;
    nextTick(() => {
      inputElement.value.focus();
      moveCursorToEnd(inputElement.value);
    });
  };
</script>

<style lang="scss" scoped>
  .stepper {
    @include flex($align: stretch);
    padding: space(1);
    background-color: var(--palette-surface-container);
    border-radius: $pill;

    &__input {
      @include flex($align: center, $justify: center);
      @include typography(body-large);
      color: var(--palette-on-surface);
      flex-shrink: 0;
      flex-grow: 1;

      border-radius: $radius-1x;
      margin: 0 space(1);
      position: relative;
      overflow: hidden;
      outline: none;
      cursor: text;
      padding: 0 space(2);

      @include state-layer(
        var(--palette-primary),
        $events: true,
        $element: true
      );

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
