<template>
  <div :class="filterChipClasses">
    <div class="filter-chip__content">
      <div v-if="leadingIconName" class="filter-chip__leading-icon">
        <base-icon
          transition-mode="out-in"
          :icon-name="leadingIconName"
          :style-type="leadingIconStyle"
        />
      </div>
      <span class="filter-chip__lbl">
        {{ labelText }}
      </span>
      <div v-if="trailingIcon" class="filter-chip__trailing-icon">
        <base-icon
          :icon-name="trailingIcon"
          :style-type="trailingIconStyleType"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    isSelected: {
      type: Boolean,
      default: false,
    },
    labelText: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'outlined',
      validator(variant) {
        return ['outlined', 'elevated'].includes(variant);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    leadingIcon: String,
    trailingIcon: String,
    leadingIconStyleType: {
      type: String,
    },
    trailingIconStyleType: {
      type: String,
    },
  });

  const leadingIconStyle = computed(() =>
    props.isSelected ? 'filled' : props.leadingIconStyleType
  );

  const filterChipClasses = computed(() => {
    const classes = {
      'filter-chip': true,
      'filter-chip_selected': props.isSelected,
      'filter-chip_padding_start': !leadingIconName.value,
      'filter-chip_padding_end': !props.trailingIcon,
      'filter-chip_disabled': props.disabled,
    };

    classes[`filter-chip_variant_${props.variant}`] = true;

    return classes;
  });

  const leadingIconName = computed(() =>
    props.isSelected ? 'check' : props.leadingIcon
  );
</script>

<style lang="scss" scoped>
  .filter-chip {
    $filter-chip: &;
    $padding: space(4);
    $icon-size: 1.125rem;

    cursor: pointer;
    border-radius: $radius-2x;
    background-color: transparent;
    user-select: none;
    position: relative;
    overflow: hidden;
    height: 32px;
    @include transition(standard-accelerate) {
      transition-property: background-color, border-color, box-shadow;
    }

    &__content {
      @include flex($align: center);
      height: 100%;
      z-index: 1;
      position: relative;
    }

    @include state-layer(
      $hover-color: var(--palette-on-surface-variant),
      $active-color: var(--palette-on-secondary-container),
      $element: true,
      $events: true
    );

    &_variant_outlined {
      border: 1px solid var(--palette-outline);

      &#{$filter-chip}_disabled {
        border-color: var(--palette-on-surface);
      }

      &#{$filter-chip}_selected {
        border-color: transparent;
      }
    }

    &_variant_elevated {
      @include elevation($level: 1);
      background-color: var(--palette-surface-container-low);

      //NOTE: Could use :not(:active), as a result, could omit the "&:active"
      &:hover {
        @include elevation($level: 2);
      }

      &:active {
        @include elevation($level: 1);
      }

      &#{$filter-chip}_disabled {
        @include elevation($level: 0);
      }
    }

    @at-root [dir='ltr'] & {
      &_padding_start {
        padding-left: $padding;
      }

      &_padding_end {
        padding-right: $padding;
      }
    }

    @at-root [dir='rtl'] & {
      &_padding_start {
        padding-right: $padding;
      }

      &_padding_end {
        padding-left: $padding;
      }
    }

    &__lbl {
      @include typography(label-large);
      color: var(--palette-on-surface-variant);
      @include transition {
        transition-property: color;
      }
    }

    &__leading-icon,
    &__trailing-icon {
      --base-icon-size: $icon-size;
      width: $icon-size;
      height: $icon-size;
      margin: 0 space(2);
      line-height: 0;
    }

    &__leading-icon {
      color: var(--palette-primary);
    }

    &__trailing-icon {
      color: var(--palette-on-surface-variant);
    }

    &_selected {
      background-color: var(--palette-secondary-container);

      @include state-layer(
        $hover-color: var(--palette-on-secondary-container),
        $active-color: var(--palette-on-surface-variant),
        $events: true
      );

      #{$filter-chip}__lbl {
        color: var(--palette-on-secondary-container);
      }

      #{$filter-chip}__trailing-icon,
      #{$filter-chip}__leading-icon {
        color: var(--palette-on-secondary-container);
      }
    }

    &_disabled {
      pointer-events: none;
      background-color: transparent;
      opacity: 0.38;

      &#{$filter-chip}_variant_elevated,
      &#{$filter-chip}_selected {
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

      #{$filter-chip}__lbl,
      #{$filter-chip}__leading-icon,
      #{$filter-chip}__trailing-icon {
        color: var(--palette-on-surface);
      }
    }
  }
</style>
