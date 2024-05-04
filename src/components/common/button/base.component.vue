<template>
  <button :class="buttonVariantClasses">
    <div class="button__content">
      <base-icon
        class="button__leading-icon"
        v-if="leadingIcon"
        :icon-name="leadingIcon"
        :style-type="leadingIconStyleType"
      />
      <slot />
      <base-icon
        class="button__trailing-icon"
        v-if="trailingIcon"
        :icon-name="trailingIcon"
        :style-type="trailingIconStyleType"
      />
    </div>
  </button>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    leadingIcon: String,
    trailingIcon: String,
    variant: {
      type: String,
      default: 'elevated',
      validator(value) {
        return [
          'elevated',
          'filled',
          'filled-tonal',
          'outlined',
          'text',
        ].includes(value);
      },
    },
    leadingIconStyleType: {
      type: String,
    },
    trailingIconStyleType: {
      type: String,
    },
  });

  const paddings = computed(() => ({
    leading: props.leadingIcon ? '16px' : '24px',
    trailing: props.trailingIcon ? '16px' : '24px',
  }));

  const textVariantPaddings = computed(() => {
    if (
      (props.leadingIcon && props.trailingIcon) ||
      (!props.leadingIcon && !props.trailingIcon)
    ) {
      return { leading: '12px', trailing: '12px' };
    }

    if (props.leadingIcon) {
      return { leading: '12px', trailing: '16px' };
    }

    return { leading: '16px', trailing: '12px' };
  });

  const buttonVariantClasses = computed(() => {
    return ['button', `button_${props.variant}`];
  });
</script>

<style lang="scss" scoped>
  .button {
    position: relative;
    border-radius: $pill;
    height: 40px;
    --base-icon-size: 1.125rem;
    @include typography(label-large);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    min-width: 88px;

    &__leading-icon,
    &__trailing-icon {
      flex-shrink: 0;
    }

    @at-root [dir='ltr'] & {
      padding-left: v-bind('paddings.leading');
      padding-right: v-bind('paddings.trailing');
    }

    @at-root [dir='rtl'] & {
      padding-left: v-bind('paddings.trailing');
      padding-right: v-bind('paddings.leading');
    }

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

    &__content {
      position: relative;
      z-index: 1;
      @include flex($align: center, $justify: center);
      gap: space(2);
    }

    &_elevated {
      background-color: var(--palette-surface-container-low);
      color: var(--palette-primary);
      @include elevation();
      @include transition(standard-accelerate) {
        transition-property: box-shadow;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover {
        @include elevation(2);

        &::before {
          background-color: var(--palette-primary);
        }
      }

      &:active {
        @include elevation(1);

        &::before {
          background-color: var(--palette-primary);
          opacity: 0.1;
        }
      }
    }

    &_filled {
      background-color: var(--palette-primary);
      color: var(--palette-on-primary);
      @include transition(standard-accelerate) {
        transition-property: box-shadow;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover {
        @include elevation(1);

        &::before {
          background-color: var(--palette-on-primary);
        }
      }

      &:active {
        @include elevation(0);

        &::before {
          background-color: var(--palette-on-primary);
          opacity: 0.1;
        }
      }
    }

    &_filled-tonal {
      background-color: var(--palette-secondary-container);
      color: var(--palette-on-secondary-container);
      @include transition(standard-accelerate) {
        transition-property: box-shadow;
      }

      &::before {
        opacity: 0.08;
      }

      &:hover {
        @include elevation(1);

        &::before {
          background-color: var(--palette-on-secondary-container);
        }
      }

      &:active {
        @include elevation(0);

        &::before {
          background-color: var(--palette-on-secondary-container);
          opacity: 0.1;
        }
      }
    }

    &_outlined {
      color: var(--palette-primary);
      border: 1px solid var(--palette-outline);

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
    }

    &_text {
      color: var(--palette-primary);

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

      @at-root [dir='ltr'] & {
        padding-left: v-bind('textVariantPaddings.leading');
        padding-right: v-bind('textVariantPaddings.trailing');
      }

      @at-root [dir='rtl'] & {
        padding-left: v-bind('textVariantPaddings.trailing');
        padding-right: v-bind('textVariantPaddings.leading');
      }
    }

    &:disabled {
      opacity: 0.38;
      pointer-events: none;
      background-color: var(--palette-outline-variant);
      color: var(--palette-on-surface);
      box-shadow: none;
    }

    &_text:disabled,
    &_outlined:disabled {
      background-color: transparent;
    }
  }
</style>
