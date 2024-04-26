<template>
  <div class="presentation">
    <h1 class="presentation__title">Presentation</h1>
    <ButtonPresentation class="presentation__buttons" />
  </div>
</template>

<script setup>
  import ButtonPresentation from '@/components/view/presentation/button.component.vue';
</script>

<style lang="scss" scoped>
  .presentation {
    padding: space(8);

    &__title {
      @include typography(display-small);
    }

    &__buttons {
      padding: space(6);
      background-color: var(--palette-surface-container);
      border-radius: $radius-4x;
      margin-top: space(4);
    }
  }
</style>
