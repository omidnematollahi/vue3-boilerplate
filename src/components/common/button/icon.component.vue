<template>
  <button :class="iconButtonClasses">
    <base-icon
      class="icon-button__icon"
      :icon-name="iconName"
      :style-type="currentStyleType"
      :key="iconKey"
    />
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

    @include state-layer($element: true);

    &_filled {
      background-color: var(--palette-surface-container-high);
      color: var(--palette-primary);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      @include state-layer(var(--palette-primary), $events: true);

      &#{$icon-button}_selected {
        background-color: var(--palette-primary);
        color: var(--palette-on-primary);

        @include state-layer(var(--palette-on-primary), $events: true);
      }
    }

    &_filled-tonal {
      background-color: var(--palette-surface-container-high);
      color: var(--palette-on-surface-variant);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      @include state-layer(var(--palette-on-surface-variant), $events: true);

      &#{$icon-button}_selected {
        background-color: var(--palette-secondary-container);
        color: var(--palette-on-secondary-container);

        @include state-layer(
          var(--palette-on-secondary-container),
          $events: true
        );
      }
    }

    &_outlined {
      color: var(--palette-on-surface-variant);
      border: 1px solid var(--palette-outline);

      @include transition(standard-accelerate) {
        transition-property: background-color, color;
      }

      @include state-layer(var(--palette-on-surface-variant), $events: true);

      &#{$icon-button}_selected {
        background-color: var(--palette-inverse-surface);
        border-color: transparent;
        color: var(--palette-inverse-on-surface);
        @include state-layer(var(--palette-inverse-on-surface), $events: true);
      }
    }

    &_standard {
      color: var(--palette-on-surface-variant);
      @include state-layer(var(--palette-on-surface-variant), $events: true);

      &#{$icon-button}_selected {
        color: var(--palette-primary);
        @include state-layer(var(--palette-primary), $events: true);
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
      --base-icon-size: 1.5rem;
    }
  }
</style>
