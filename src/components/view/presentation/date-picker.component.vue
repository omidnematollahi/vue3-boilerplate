<template>
  <div class="presenter">
    <h3 class="presenter__title">DatePicker Component Presentation</h3>
    <!-- DatePicker Component -->
    <div class="presenter__container">
      <date-picker :calendar="gregorianCalendar" />
    </div>
  </div>
</template>

<script setup>
  import gregorianCalendar from '@/services/calendar/gregorian';
</script>

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
  }
</style>
