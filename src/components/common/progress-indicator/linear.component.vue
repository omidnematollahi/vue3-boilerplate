<template>
  <div class="progress-indicator">
    <div :class="linearClasses">
      <div v-if="leadingTrackVisibility" class="linear__leading-track"></div>
      <div class="linear__active-indicator"></div>
      <div class="linear__trailing-track"></div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    percentage: {
      type: Number,
      default: 0,
    },
    indicationType: {
      type: String,
      default: 'indeterminate',
      validator(indicationType) {
        return ['indeterminate', 'determinate'].includes(indicationType);
      },
    },
  });

  const linearClasses = computed(() => {
    const classes = {
      linear: true,
      linear_gapped: props.percentage < 100 && props.percentage > 0,
    };
    classes[`linear_${props.indicationType}`] = true;
    return classes;
  });

  const leadingTrackVisibility = computed(
    () => props.indicationType === 'indeterminate'
  );

  const stopIndicatorVisibility = computed(
    () => props.indicationType === 'determinate'
  );

  const indicatorPercentage = computed(() => `${props.percentage}%`);
</script>

<style lang="scss" scoped>
  $height: 4px;

  .progress-indicator {
    width: 100%;
    height: $height;
  }

  .linear {
    $linear: &;

    @include flex($align: stretch, $justify: flex-end);
    position: relative;
    height: 100%;

    &__leading-track,
    &__trailing-track {
      border-radius: $pill;
      background-color: var(--palette-secondary-container);
      flex-grow: 1;
      flex-shrink: 1;
    }

    &__active-indicator {
      transition: {
        property: flex-basis;
        duration: map-get($duration, long-3);
        timing-function: map-get($easing, ease-in-out-quint);
      }
      background-color: var(--palette-primary);
      border-radius: $pill;
      flex-shrink: 1;
      flex-basis: v-bind(indicatorPercentage);
    }

    &_determinate {
      &::before {
        content: '';
        width: $height;
        height: $height;
        background-color: var(--palette-primary);
        border-radius: $circle;
        position: absolute;
      }

      &__leading-track {
        flex-grow: 0;
      }
    }

    transition: gap map-get($duration, long-3)
      map-get($easing, ease-in-out-quint);

    &_gapped {
      gap: space(1);
    }
  }
</style>
