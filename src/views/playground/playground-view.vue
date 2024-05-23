<template>
  <div class="container">
    <filter-chip
      class="container__chip"
      label-text="Filter Chip"
      leading-icon="favorite"
      trailing-icon="favorite"
      :is-selected="isSelected"
      @click="isSelected = !isSelected"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const isSelected = ref(false);

  const openSideSheet = () => {
    isSelected.value = true;
  };
</script>

<style lang="scss" scoped>
  .container {
    @include flex;
    margin: 64px auto;
    // border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 600px;

    &__chip {
    }
  }
</style>
