<template>
  <transition name="side-sheet">
    <div v-if="modelValue" :class="sideSheetClasses">
      <div class="side-sheet__header">
        <icon-button
          v-if="hasBackButton"
          class="side-sheet__back-btn"
          style-type="filled"
          :icon-name="backIcon"
          @click="$emit('action:back')"
        />
        <span class="side-sheet__title"> {{ titleText }} </span>
        <icon-button
          class="side-sheet__close-btn"
          style-type="filled"
          icon-name="close"
          @click="setModelValue(false)"
        />
      </div>
      <slot />
    </div>
  </transition>
</template>

<script setup>
  import { computed } from 'vue';
  import { useLocale } from '@/plug-in/i18n';

  defineEmits(['action:back']);

  const props = defineProps({
    hasBackButton: {
      type: Boolean,
      default: true,
    },
    hasDivider: {
      type: Boolean,
      default: true,
    },
    titleText: String,
  });

  const sideSheetClasses = computed(() => ({
    'side-sheet': true,
    'side-sheet_with-back-btn': props.hasBackButton,
    'side-sheet_has-divider': props.hasDivider,
  }));

  const modelValue = defineModel({ type: Boolean });

  const setModelValue = (value) => {
    modelValue.value = value;
  };

  const { direction } = useLocale();

  const backIcon = computed(() =>
    direction.value === 'ltr' ? 'arrow-back' : 'arrow-forward'
  );
</script>

<style lang="scss" scoped>
  .side-sheet {
    $radius: $radius-4x;
    width: 100%;
    max-width: 400px;
    height: var(--side-sheet-height, 100%);
    background-color: var(
      --modal-side-sheet-color,
      var(--palette-surface-container-low)
    );
    overflow: hidden;
    @include flex(column, $align: stretch);

    &__header {
      @include flex($align: center);
      position: sticky;
      top: 0;
      padding: space(3) space(6) space(4);
    }

    &_with-back-btn &__header {
      padding: {
        left: space(1);
        right: space(1);
      }
    }

    &__close-btn,
    &__back-btn {
      margin: space(1);
      flex-shrink: 0;
    }

    &__title {
      @include typography(title-large);
      color: var(--palette-on-surface-variant);
      flex-grow: 1;
    }

    @at-root [dir='ltr'] & {
      right: 0;

      &_has-divider {
        border-left: 1px solid var(--palette-outline-variant);
      }

      &__header {
        padding: {
          right: space(3);
        }
      }
    }

    @at-root [dir='rtl'] & {
      left: 0;

      &_has-divider {
        border-right: 1px solid var(--palette-outline-variant);
      }

      &__header {
        padding: {
          left: space(3);
        }
      }
    }
  }
</style>
