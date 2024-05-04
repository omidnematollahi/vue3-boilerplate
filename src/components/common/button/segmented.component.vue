<template>
  <ul :class="segmentedButtonClasses">
    <li
      v-for="segment in segments"
      :key="segment.value"
      class="segmented-btn__item"
    >
      <button
        class="segment"
        :class="{ segment_selected: segment.selected }"
        @click="toggleItem(segment)"
      >
        <div class="segment__icon" v-if="!segment.label && segment.selected">
          <base-icon
            icon-name="check"
            transition-mode="out-in"
            :style-type="segment.iconStyleType"
          />
        </div>
        <div class="segment__icon">
          <base-icon
            v-if="segment.icon"
            :icon-name="segment.icon"
            transition-mode="out-in"
            :style-type="segment.iconStyleType"
          />
        </div>
        <span v-if="segment.label" class="segment__label">
          {{ segment.label }}
        </span>
      </button>
    </li>
  </ul>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';

  const props = defineProps({
    items: {
      type: Array,
      required: true,
      validator(items) {
        if (items.length > 5 || items.length < 1) {
          return false;
        }
        return !items.some((item) => !item.value);
      },
    },
    density: {
      type: Number,
      default: 0,
      validator(density) {
        return density < 1 && density > -4;
      },
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
  });

  const selectedItems = defineModel({ default: new Set(), type: Set });

  const toggleItem = ({ value }) => {
    if (!props.multiSelect) {
      selectedItems.value.clear();
    } else if (selectedItems.value.has(value)) {
      return selectedItems.value.delete(value);
    }

    selectedItems.value.add(value);
  };

  const segments = computed(() =>
    props.items.map((item) => {
      const isSelected = selectedItems.value.has(item.value);
      const labeledSelected = isSelected && item.label;

      return {
        ...item,
        selected: isSelected, // if selected
        icon: labeledSelected ? 'check' : item.icon, // null for no icon, icon on check icon for selected
        iconStyleType: labeledSelected ? 'filled' : item.iconStyleType,
      };
    })
  );

  const segmentedButtonClasses = computed(() => [
    `segmented-btn`,
    `segmented-btn_density_${props.density}`,
  ]);

  const segmentWidth = computed(() => {
    return `${100 / props.items.length}%`;
  });
</script>

<style lang="scss" scoped>
  .segmented-btn {
    $height: 40px;

    @include flex($align: stretch);
    height: $height;
    border-radius: $pill;
    border: 1px solid var(--palette-outline);
    overflow: auto hidden;
    @extend %hide-scrollbar;

    &_density_-1 {
      height: $height - 4;
    }

    &_density_-2 {
      height: $height - (4 * 2);
    }

    &_density_-3 {
      height: $height - (4 * 3);
    }

    &__item {
      min-width: 48px;
      flex-shrink: 0;
      flex-basis: v-bind(segmentWidth);

      @at-root [dir='ltr'] & {
        border-right: 1px solid var(--palette-outline);
      }

      @at-root [dir='rtl'] & {
        border-left: 1px solid var(--palette-outline);
      }

      &:last-child {
        border: none;
      }
    }
  }

  .segment {
    @include flex($align: center, $justify: center);
    width: 100%;
    height: 100%;
    color: var(--palette-on-surface);
    gap: space(2);
    user-select: none;
    cursor: pointer;
    padding: 0 space(3);

    @include transition(standard-accelerate) {
      transition-property: background-color, color;
    }

    &__label {
      @include typography(label-large);
    }

    &_selected {
      background-color: var(--palette-secondary-container);
      color: var(--palette-on-secondary-container);
    }

    &__icon {
      $size: 18px;
      width: $size;
      height: $size;
      --base-icon-size: 1.125rem;
    }
  }
</style>
