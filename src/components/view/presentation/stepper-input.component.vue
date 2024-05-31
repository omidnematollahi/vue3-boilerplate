<template>
  <div class="presenter">
    <h3 class="presenter__title">StepperInput Component Presentation</h3>
    <br />
    <div>
      <h4>Value ~ {{ value }}</h4>
      <p>
        Value must be between -50 and 50 (both included) and step is 10 (between
        numbers are valid)
      </p>
      <br />
      <i>
        Also no<span class="presenter__highlight">width</span>is set to the
        stepper
      </i>
    </div>
    <!-- StepperInput Component -->
    <div class="presenter__container">
      <stepper-input
        :step="10"
        v-model="value"
        :value-range="[-50, 50]"
        name="counter"
        class="input"
      />
      <stepper-input
        :step="10"
        :model-value="20"
        :value-range="[-50, 50]"
        disabled
        name="disabledCounter"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const value = ref(10);
</script>

<style lang="scss" scoped>
  .presenter {
    color: var(--palette-on-surface);

    &__title {
      @include typography(title-medium);
    }

    &__container {
      @include flex(column);
      gap: space(4);
      margin-top: space(6);
    }

    &__highlight {
      background: var(--palette-secondary-container);
      color: var(--palette-on-secondary-container);
      padding: space(1) space(2);
      margin: 0 space(2);
      border-radius: $radius-1x;
      font-style: normal;
    }
  }
</style>
