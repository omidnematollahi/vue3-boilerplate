<template>
  <div :class="radioClasses">
    <div class="radio__indicator"></div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    isSelected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const radioClasses = computed(() => ({
    radio: true,
    radio_selected: props.isSelected,
    radio_disabled: props.disabled,
  }));
</script>

<style lang="scss" scoped>
  .radio {
    --radio-color: var(--palette-on-surface-variant);

    $radio: &;
    $size: 20px;
    width: $size;
    height: $size;
    border: 2px solid var(--radio-color);
    padding: space(0.5);
    border-radius: $circle;
    cursor: pointer;
    position: relative;
    @include transition {
      transition-property: border-color;
    }

    &::before {
      content: '';
      width: 100%;
      height: 100%;
      transform: scale(1);
      position: absolute;
      top: 0;
      left: 0;
      border-radius: $circle;
      z-index: -1;
      opacity: 0;
      @include transition {
        transition-property: opacity, background-color, transform;
      }
    }

    &:active,
    &:hover {
      --radio-color: var(--palette-on-surface);

      &::before {
        background-color: var(--palette-on-surface);
        transform: scale(2);
        opacity: 0.08;
      }
    }

    &:active {
      &::before {
        background-color: var(--palette-primary);
        opacity: 0.1;
      }
    }

    &__indicator {
      border-radius: $circle;
      background-color: var(--radio-color);
      width: 100%;
      height: 100%;
      transform: scale(0);
      opacity: 0;
      @include transition {
        transition-property: transform, background-color, opacity;
      }
    }

    &_selected {
      --radio-color: var(--palette-primary);

      &:hover {
        --radio-color: var(--palette-primary);

        &::before {
          background-color: var(--palette-primary);
        }
      }

      &:active {
        &::before {
          background-color: var(--palette-on-surface);
        }
      }

      #{$radio}__indicator {
        transform: scale(1);
        opacity: 1;
      }
    }

    &_disabled {
      --radio-color: var(--palette-on-surface);
      pointer-events: none;
      opacity: 0.38;
    }
  }
</style>
