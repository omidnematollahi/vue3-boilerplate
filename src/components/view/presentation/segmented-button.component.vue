<template>
  <div class="presenter">
    <h3 class="presenter__title">Segmented Button Component Presentation</h3>
    <!-- Segmented Button Icon Button -->
    {{ selectedItems }}
    <div class="presenter__container">
      <segmented-button
        :items="items"
        class="presenter__segmented-button"
        v-model="selectedItems"
      />
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';

  const selectedItems = reactive(new Set(['year']));
  const items = [
    {
      value: 'day',
      label: 'Day',
      icon: 'favorite',
    },
    {
      value: 'month',
      label: 'Month',
      icon: 'favorite',
    },
    {
      value: 'year',
      label: 'Year',
      icon: 'favorite',
    },
    {
      value: 'decade',
      label: 'Decade',
      icon: 'favorite',
    },
  ];
</script>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
      color: var(--palette-on-surface);
    }

    &__container {
      @include flex();
      gap: space(4);
      margin-top: space(6);
    }

    &__segmented-button {
      width: 400px;
    }
  }
</style>
