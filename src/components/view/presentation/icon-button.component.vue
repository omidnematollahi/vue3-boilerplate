<template>
  <div class="presenter">
    <h3 class="presenter__title">Icon Button Component Presentation</h3>
    <!-- Filled Icon Button -->
    <div class="presenter__container">
      <icon-button variant="filled" icon-name="close" :model-value="false" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
    }

    &__container {
      @include flex();
      gap: space(4);
      margin-top: space(6);
    }
  }
</style>
