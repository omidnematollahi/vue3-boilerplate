<template>
  <button :class="buttonVariantClasses" :disabled="disabled || isLoading">
    <div v-if="isLoading" class="button__loading">
      <circular-progress-indicator class="button__loading-indicator" />
    </div>
    <div :class="contentClasses">
      <base-icon
        class="button__leading-icon"
        v-if="leadingIcon"
        :icon-name="leadingIcon"
        :style-type="leadingIconStyleType"
        transition-mode="out-in"
      />
      <slot />
      <base-icon
        class="button__trailing-icon"
        v-if="trailingIcon"
        :icon-name="trailingIcon"
        :style-type="trailingIconStyleType"
        transition-mode="out-in"
      />
    </div>
  </button>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
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
    leadingIcon: String,
    trailingIcon: String,
    leadingIconStyleType: {
      type: String,
    },
    trailingIconStyleType: {
      type: String,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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

  const contentClasses = computed(() => ({
    button__content: true,
    button__content_hide: props.isLoading,
  }));
</script>

<style lang="scss" scoped>
  .button {
    position: relative;
    border-radius: $pill;
    height: 40px;
    --base-icon-size: 1.125rem;
    @include typography(label-large);
    color: var(--base-button-color);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    min-width: var(--base-button-min-width, 88px);

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

    &__loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      @include flex($justify: center, $align: center);
    }

    &__loading-indicator {
      --circular-indicator-size: 24px;
    }

    &__content {
      position: relative;
      z-index: 1;
      @include flex($align: center, $justify: center);
      gap: space(2);
      @include transition {
        transition-property: opacity, visibility;
      }

      &_hide {
        opacity: 0;
        visibility: hidden;
      }
    }

    @include state-layer($element: true);

    &_elevated {
      background-color: var(--palette-surface-container-low);
      color: var(--palette-primary);
      @include elevation($level: 1);
      @include transition(standard-accelerate) {
        transition-property: box-shadow;
      }

      @include state-layer(var(--palette-primary), $events: true);

      &:hover {
        @include elevation($level: 2);
      }

      &:active {
        @include elevation($level: 1);
      }
    }

    &_filled {
      background-color: var(--palette-primary);
      --base-button-color: var(--palette-on-primary);
      @include transition(standard-accelerate) {
        transition-property: box-shadow;
      }

      @include state-layer(var(--palette-on-primary), $events: true);

      &:hover {
        @include elevation($level: 1);
      }

      &:active {
        box-shadow: none;
      }
    }

    &_filled-tonal {
      background-color: var(--palette-secondary-container);
      --base-button-color: var(--palette-on-secondary-container);
      @include transition(standard-accelerate) {
        transition-property: box-shadow;
      }

      @include state-layer(
        var(--palette-on-secondary-container),
        $events: true
      );

      &:hover {
        @include elevation($level: 1);
      }

      &:active {
        box-shadow: none;
      }
    }

    &_outlined {
      --base-button-color: var(--palette-primary);
      border: 1px solid var(--palette-outline);

      @include state-layer(var(--palette-primary), $events: true);
    }

    &_text {
      --base-button-color: var(--palette-primary);
      @include state-layer(var(--palette-primary), $events: true);

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
      --base-button-color: var(--palette-on-surface);
      box-shadow: none;
    }

    &_text:disabled,
    &_outlined:disabled {
      background-color: transparent;
    }
  }
</style>
