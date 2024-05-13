<template>
  <div class="presenter">
    <h3 class="presenter__title">Switch Component Presentation</h3>
    <!-- Switch Component -->
    <div class="presenter__container">
      <switch-input class="presenter__switch" />
      <switch-input
        class="presenter__switch"
        selected-icon
        :model-value="true"
      />
      <switch-input class="presenter__switch" selected-icon unselected-icon />
      <switch-input class="presenter__switch" disabled />
    </div>
  </div>
</template>

<script setup></script>

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

    &__switch {
    }
  }
</style>
