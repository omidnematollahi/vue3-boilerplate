<template>
  <button :class="iconButtonClasses">
    <transition name="icon-button">
      <base-icon
        class="icon-button__icon"
        :icon-name="iconName"
        :style-type="currentStyleType"
        :key="iconKey"
      />
    </transition>
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
    styleType: {
      type: String,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  });

  const currentStyleType = computed(() => {
    if (props.styleType) {
      return props.styleType;
    }

    return props.isSelected ? 'filled' : 'outlined';
  });

  const iconButtonClasses = computed(() => {
    const classList = ['icon-button', `icon-button_${props.variant}`];

    if (props.isSelected) {
      classList.push('icon-button_selected');
    }

    return classList;
  });

  const iconKey = computed(() => `${props.iconName}${currentStyleType.value}`);
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
        }
      }
    }

    &_filled-tonal {
      background-color: var(--palette-surface-container-high);
      color: var(--palette-on-surface-variant);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover::before {
        background-color: var(--palette-on-surface-variant);
      }

      &:active::before {
        background-color: var(--palette-on-surface-variant);
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
        }
      }
    }

    &_outlined {
      color: var(--palette-on-surface-variant);
      border: 1px solid var(--palette-outline);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover::before {
        background-color: var(--palette-on-surface-variant);
      }

      &:active::before {
        background-color: var(--palette-on-surface);
        opacity: 0.1;
      }

      &#{$icon-button}_selected {
        background-color: var(--palette-inverse-surface);
        border-color: transparent;
        color: var(--palette-inverse-on-surface);

        &:hover::before {
          background-color: var(--palette-inverse-on-surface);
        }

        &:active::before {
          background-color: var(--palette-inverse-on-surface);
        }
      }
    }

    &_standard {
      color: var(--palette-on-surface-variant);

      &::before {
        opacity: 0.08;
      }

      &:hover::before {
        background-color: var(--palette-on-surface-variant);
      }

      &:active::before {
        background-color: var(--palette-on-surface-variant);
        opacity: 0.1;
      }

      &#{$icon-button}_selected {
        color: var(--palette-primary);

        &:hover::before {
          background-color: var(--palette-primary);
        }

        &:active::before {
          background-color: var(--palette-primary);
        }
      }
    }

    &:disabled {
      opacity: 0.38;
      pointer-events: none;
      background-color: var(--palette-outline-variant);
      color: var(--palette-on-surface);
    }

    &_standard:not(&_selected):disabled,
    &_outlined:not(&_selected):disabled {
      background-color: transparent;
    }

    &__icon {
      position: relative;
      z-index: 1;
      --base-icon-size: 24px;
    }
  }

  .icon-button-enter-active {
    @include transition(emphasized-decelerate) {
      transition-property: opacity, transform;
    }
  }

  .icon-button-leave-active {
    @include transition(emphasized-accelerate) {
      transition-property: opacity, transform;
    }
  }

  .icon-button-enter-from,
  .icon-button-leave-to {
    opacity: 0.2;
    transform: scale(0);
  }
</style>
