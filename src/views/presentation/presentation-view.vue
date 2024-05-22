<template>
  <div class="presentation">
    <h1 class="presentation__title">Presentation</h1>
    <side-sheet-presentation class="presentation__section" />
    <date-picker-presentation class="presentation__section" />
    <radio-input-presentation class="presentation__section" />
    <switch-presentation class="presentation__section" />
    <snackbar-presentation class="presentation__section" />
    <progress-bar-presentation class="presentation__section" />
    <segmented-button-presentation class="presentation__section" />
    <button-presentation class="presentation__section" />
    <icon-button-presentation class="presentation__section" />
  </div>
</template>

<script setup>
  import RadioInputPresentation from '@/components/view/presentation/radio-input.component.vue';
  import SwitchPresentation from '@/components/view/presentation/switch.component.vue';
  import SnackbarPresentation from '@/components/view/presentation/snackbar.component.vue';
  import ButtonPresentation from '@/components/view/presentation/button.component.vue';
  import IconButtonPresentation from '@/components/view/presentation/icon-button.component.vue';
  import SegmentedButtonPresentation from '@/components/view/presentation/segmented-button.component.vue';
  import ProgressBarPresentation from '@/components/view/presentation/progress-bar.component.vue';
  import DatePickerPresentation from '@/components/view/presentation/date-picker.component.vue';
  import SideSheetPresentation from '@/components/view/presentation/side-sheet.component.vue';
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
      // background-color: var(--palette-surface-container-low);
      border: 4px dashed var(--palette-surface-container-high);
      border-radius: $radius-4x;
      margin-top: space(6);
    }
  }
</style>
