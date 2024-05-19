<template>
  <div class="menu">
    <base-button
      class="menu__button"
      variant="text"
      :trailing-icon="buttonIcon"
      trailing-icon-style-type="filled"
      @click="$emit('click:button')"
    >
      {{ labelText }}
    </base-button>
    <div class="menu__month-control" v-if="showMonthControls">
      <div class="menu__icon">
        <icon-button
          style-type="filled"
          :icon-name="iconNames.leading"
          @click="$emit('action:monthControl', -1)"
        />
      </div>
      <div class="menu__icon">
        <icon-button
          style-type="filled"
          :icon-name="iconNames.trailing"
          @click="$emit('action:monthControl', 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useLocale } from '@/plug-in/i18n';

  defineProps({
    labelText: {
      type: String,
    },
    buttonIcon: {
      type: String,
      default: 'arrow-drop-down',
    },
    showMonthControls: {
      type: Boolean,
      default: true,
    },
  });

  defineEmits(['click:button', 'action:monthControl']);

  const { direction } = useLocale();

  const iconNames = computed(() => ({
    leading: direction.value === 'ltr' ? 'chevron-left' : 'chevron-right',
    trailing: direction.value === 'ltr' ? 'chevron-right' : 'chevron-left',
  }));
</script>

<style lang="scss" scoped>
  .menu {
    @include flex($justify: space-between, $align: center);
    background-color: var(--palette-surface-container-high);
    padding: space(1) 0;
    min-height: 56px;

    &__button {
      margin: 0 space(2);
      --base-button-color: var(--palette-on-surface-variant);
    }

    &__month-control {
      @include flex;
      margin: 0 space(3);
    }

    &__icon {
      --base-icon-size: 24px;
      padding: space(1);
    }
  }
</style>
