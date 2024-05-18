<template>
  <div :class="switchClasses" @click="toggleSwitch">
    <div class="switch__driver"></div>
    <div class="switch__handle">
      <base-icon
        v-if="iconVisibility"
        class="switch__icon"
        style-type="filled"
        :icon-name="iconName"
        transition-mode="out-in"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';

  const props = defineProps({
    selectedIcon: {
      type: Boolean,
      default: false,
    },
    unselectedIcon: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const iconName = computed(() => {
    const hasSelectedIcon = modelValue.value && props.selectedIcon;
    if (hasSelectedIcon) return 'check';

    const hasUnselectedIcon = !modelValue.value && props.unselectedIcon;
    if (hasUnselectedIcon) return 'close';

    return '';
  });

  const modelValue = defineModel({ type: Boolean, default: false });

  const toggleSwitch = () => {
    modelValue.value = !modelValue.value;
  };

  const iconVisibility = computed(() => {
    const selectedIcon = props.selectedIcon && modelValue.value;
    const unelectedIcon = props.unselectedIcon && !modelValue.value;

    return selectedIcon || unelectedIcon;
  });

  const switchClasses = computed(() => ({
    switch: true,
    switch_selected: modelValue.value,
    switch_disabled: props.disabled,
    'switch_has-icon': iconVisibility.value,
  }));

  const switchHandleElement = ref();
</script>

<style lang="scss" scoped>
  .switch {
    $switch: &;

    @mixin state-layer-scale($scale: 0) {
      transform: translate(-50%, -50%) scale($scale);
    }

    @include flex($align: center);
    height: 32px;
    width: 52px;
    min-width: 52px;
    border: 2px solid var(--palette-outline);
    border-radius: $pill;
    background-color: var(--palette-surface-container-highest);
    cursor: pointer;
    padding: space(1);
    @include transition {
      transition-property: padding, border-color, background-color;
    }

    &__driver {
      flex-basis: 0%;

      @include transition {
        transition-property: flex-basis;
      }
    }

    &__icon {
      --base-icon-size: 16px;
      color: var(--palette-surface-container-highest);
    }

    &__handle {
      $size: 16px;
      flex-shrink: 0;
      box-sizing: content-box;
      position: relative;
      z-index: 1;
      height: $size;
      width: $size;
      background-color: var(--palette-outline);
      border-radius: $circle;
      @include elevation($level: 1);
      @include transition {
        transition-property: padding, background-color;
      }

      &::before {
        $size: 40px;
        content: '';
        position: absolute;
        z-index: -1;
        width: $size;
        height: $size;
        border-radius: $circle;
        top: 50%;
        left: 50%;
        @include state-layer-scale;
      }
    }

    &_disabled {
      pointer-events: none;
      opacity: 0.38;
      border-color: var(--palette-surface-container-highest);

      #{$switch}__handle {
        background-color: var(--palette-on-surface);
        box-shadow: none;
      }
    }

    &:hover {
      #{$switch}__handle {
        background-color: var(--palette-on-surface-variant);

        &::before {
          @include state-layer-scale(1);
          background-color: var(--palette-on-surface);
          opacity: 0.08;
        }
      }
    }

    &:active {
      padding: 0;

      #{$switch}__handle {
        background-color: var(--palette-on-surface-variant);
        padding: space(1.5);

        &::before {
          @include state-layer-scale(1);
          background-color: var(--palette-on-surface);
          opacity: 0.1;
        }
      }
    }

    &_selected {
      background-color: var(--palette-primary);
      border-color: var(--palette-primary);

      #{$switch}__driver {
        flex-basis: 100%;
      }

      #{$switch}__icon {
        color: var(--palette-on-primary-container);
      }

      #{$switch}__handle {
        background-color: var(--palette-on-primary);
        padding: space(0.5);
        box-shadow: none;
      }

      &#{$switch}_disabled {
        background-color: var(--palette-on-surface);
        border-color: var(--palette-on-surface);

        #{$switch}__icon {
          color: var(--palette-on-surface);
        }

        #{$switch}__handle {
          background-color: var(--palette-surface-container-low);
        }
      }

      &:hover {
        #{$switch}__handle {
          background-color: var(--palette-primary-container);

          &::before {
            @include state-layer-scale(1);
            background-color: var(--palette-primary);
            opacity: 0.08;
          }
        }
      }

      &:active {
        #{$switch}__handle {
          background-color: var(--palette-primary-container);

          &::before {
            @include state-layer-scale(1);
            background-color: var(--palette-primary);
            opacity: 0.1;
          }
        }
      }
    }

    &_has-icon {
      padding: space(0.5);

      #{$switch}__handle {
        padding: space(1);
      }
    }
  }
</style>
