<template>
  <button :class="iconButtonClasses">
    <!-- TODO: add outline and fill to base icon and use here -->
    <base-icon class="icon-button__icon" :icon-name="iconName" />
  </button>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    iconName: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'standard',
      validator(value) {
        const variants = ['filled', 'filled-tonal', 'outlined', 'standard'];
        return variants.includes(value);
      },
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  });

  const iconButtonClasses = computed(() => {
    const classList = ['icon-button', `icon-button_${props.variant}`];

    if (props.isSelected) {
      classList.push('icon-button_selected');
    }

    return classList;
  });
</script>

<style lang="scss" scoped>
  .icon-button {
    $icon-button: &;
    $size: 40px;

    position: relative;
    @include flex($justify: center, $align: center);
    width: $size;
    height: $size;
    border-radius: $circle;
    cursor: pointer;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      @include transition(standard-accelerate) {
        transition-property: background-color, opacity;
      }
    }

    &_filled {
      background-color: var(--palette-surface-container-high);
      color: var(--palette-primary);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover::before {
        background-color: var(--palette-primary);
      }

      &:active::before {
        background-color: var(--palette-primary);
        opacity: 0.1;
      }

      &#{$icon-button}_selected {
        background-color: var(--palette-primary);
        color: var(--palette-on-primary);

        &:hover::before {
          background-color: var(--palette-on-primary);
        }

        &:active::before {
          background-color: var(--palette-on-primary);
          opacity: 0.1;
        }
      }
    }

    &_filled-tonal {
      background-color: var(--palette-surface-container-high);
      color: var(--palette-on-surface);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover::before {
        background-color: var(--palette-surface-container-high);
      }

      &:active::before {
        background-color: var(--palette-on-surface);
        opacity: 0.1;
      }

      &#{$icon-button}_selected {
        background-color: var(--palette-secondary-container);
        color: var(--palette-on-secondary-container);

        &:hover::before {
          background-color: var(--palette-on-secondary-container);
        }

        &:active::before {
          background-color: var(--palette-on-secondary-container);
          opacity: 0.1;
        }
      }
    }

    &:disabled {
      opacity: 0.38;
      pointer-events: none;
      background-color: var(--palette-outline-variant);
      color: var(--palette-on-surface);
    }

    &__icon {
      position: relative;
      z-index: 1;
      --base-icon-size: 24px;
    }
  }
</style>
