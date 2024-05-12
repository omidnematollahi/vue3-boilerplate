<template>
  <div class="presenter">
    <h3 class="presenter__title">RadioInput Component Presentation</h3>
    <!-- RadioInput Component -->
    <div class="presenter__container">
      <radio-input
        class="presenter__radio"
        label-text="Selected"
        :is-selected="true"
      />
      <radio-input class="presenter__radio" label-text="Unselected Option" />
      <radio-input
        class="presenter__radio"
        label-text="Selected Option Disabled"
        :is-selected="true"
        disabled
      />
      <radio-input
        class="presenter__radio"
        label-text="Unselected Option Disabled"
        disabled
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
      color: var(--palette-on-surface);
    }

    &__container {
      @include flex(column);
      gap: space(4);
      margin-top: space(6);
    }
  }
</style>
