<template>
  <div class="presenter">
    <h3 class="presenter__title">Filter Chip Component Presentation</h3>
    <!-- Filter Chip Component -->
    <div class="presenter__container">
      <filter-chip class="presenter__filter-chip" label-text="Cameras" />
      <filter-chip
        class="presenter__filter-chip"
        label-text="Laptops"
        leading-icon="favorite"
        :is-selected="isSelected"
        @click="isSelected = !isSelected"
      />
      <filter-chip
        class="presenter__filter-chip"
        label-text="Game Consoles"
        leading-icon="favorite"
        trailing-icon="add-circle"
        trailing-icon-style-type="filled"
      />
      <filter-chip
        class="presenter__filter-chip"
        label-text="Phones"
        leading-icon="favorite"
        :is-selected="false"
        :disabled="true"
      />
      <filter-chip
        class="presenter__filter-chip"
        label-text="Phones"
        :is-selected="true"
        :disabled="true"
      />
    </div>
    <div class="presenter__container">
      <filter-chip
        class="presenter__filter-chip"
        variant="elevated"
        label-text="Cameras"
      />
      <filter-chip
        class="presenter__filter-chip"
        variant="elevated"
        label-text="Laptops"
        leading-icon="favorite"
      />
      <filter-chip
        class="presenter__filter-chip"
        variant="elevated"
        label-text="Game Consoles"
        leading-icon="favorite"
        trailing-icon="add-circle"
        trailing-icon-style-type="filled"
      />
      <filter-chip
        class="presenter__filter-chip"
        variant="elevated"
        label-text="Phones"
        leading-icon="favorite"
        :is-selected="false"
        :disabled="true"
      />
      <filter-chip
        class="presenter__filter-chip"
        variant="elevated"
        label-text="Phones"
        :is-selected="true"
        :disabled="true"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const isSelected = ref(true);
</script>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
      color: var(--palette-on-surface);
    }

    &__container {
      @include flex($wrap: wrap);
      gap: space(4);
      margin-top: space(6);
    }

    &__filter-chip {
      flex-shrink: 0;
    }
  }
</style>
