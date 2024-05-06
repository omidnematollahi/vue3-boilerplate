<template>
  <div class="presenter">
    <h3 class="presenter__title">Button Component Presentation</h3>
    <!-- Linear progressbar -->
    <div class="presenter__container">
      <div class="presenter__section">
        <linear-progress-indicator indication-type="indeterminate" />
        <linear-progress-indicator
          indication-type="determinate"
          :percentage="75"
        />
      </div>
      <div class="presenter__section">
        <circular-progress-indicator indication-type="indeterminate" />
        <circular-progress-indicator
          indication-type="determinate"
          :percentage="75"
        />
      </div>
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
      @include flex($align: space-around);
      gap: space(12);
      margin-top: space(6);
    }

    &__section {
      width: 360px;
      @include flex(column, $justify: space-around);
      gap: space(8);
    }
  }
</style>
