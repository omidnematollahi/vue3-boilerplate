<template>
  <div class="presentation">
    <h1 class="presentation__title">Presentation</h1>
    <progress-bar class="presentation__section" />
    <segmented-button-presentation class="presentation__section" />
    <button-presentation class="presentation__section" />
    <icon-button-presentation class="presentation__section" />
  </div>
</template>

<script setup>
  import ButtonPresentation from '@/components/view/presentation/button.component.vue';
  import IconButtonPresentation from '@/components/view/presentation/icon-button.component.vue';
  import SegmentedButtonPresentation from '@/components/view/presentation/segmented-button.component.vue';
  import ProgressBar from '@/components/view/presentation/progress-bar.component.vue';
</script>

<style lang="scss" scoped>
  .presentation {
    padding: space(8);

    &__title {
      @include typography(display-small);
      color: var(--palette-on-surface);
    }

    &__section {
      padding: space(6);
      background-color: var(--palette-surface-container-low);
      border-radius: $radius-4x;
      margin-top: space(4);
    }
  }
</style>
