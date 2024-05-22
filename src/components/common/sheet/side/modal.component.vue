<template>
  <scrim-item v-model="modelValue" :auto-position="false">
    <standard-side-sheet
      :class="sideSheetClasses"
      v-model="modelValue"
      :has-back-button="hasBackButton"
      :has-divider="false"
    >
      <slot />
    </standard-side-sheet>
  </scrim-item>
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
    hasInset: {
      type: Boolean,
      default: false,
    },
  });

  const sideSheetClasses = computed(() => ({
    'side-sheet': true,
    'side-sheet_inset': props.hasInset,
  }));

  const modelValue = defineModel({ type: Boolean });

  const setModelValue = (value) => {
    modelValue.value = value;
  };
</script>

<style lang="scss" scoped>
  .side-sheet {
    $radius: $radius-4x;
    position: fixed;
    @include elevation(1);

    @at-root [dir='ltr'] & {
      border: {
        top-left-radius: $radius;
        bottom-left-radius: $radius;
      }
    }

    @at-root [dir='rtl'] & {
      border: {
        top-right-radius: $radius;
        bottom-right-radius: $radius;
      }
    }

    &_inset {
      $spacing: space(4);
      --side-sheet-height: calc(100% - #{$spacing} * 2);
      margin: $spacing;
      border-radius: $radius;
    }
  }
</style>
