<template>
  <div class="presentation">
    <h1 class="presentation__title">Presentation</h1>
    <button-presentation class="presentation__section" />
    <icon-button-presentation class="presentation__section" />
  </div>
</template>

<script setup>
  import ButtonPresentation from '@/components/view/presentation/button.component.vue';
  import IconButtonPresentation from '@/components/view/presentation/icon-button.component.vue';
</script>

<style lang="scss" scoped>
  .presentation {
    padding: space(8);

    &__title {
      @include typography(display-small);
    }

    &__section {
      padding: space(6);
      background-color: var(--palette-surface-container);
      border-radius: $radius-4x;
      margin-top: space(4);
    }
  }
</style>
