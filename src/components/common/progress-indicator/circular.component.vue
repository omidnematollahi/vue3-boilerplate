<template>
  <div class="progress-indicator">
    <svg viewBox="0 0 54 54" :class="circularClasses">
      <circle
        v-if="trackVisibility"
        :r="circle.radius"
        :cx="circle.x"
        :cy="circle.y"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="trackOffset"
        class="circular__track"
      ></circle>
      <circle
        :r="circle.radius"
        :cx="circle.x"
        :cy="circle.y"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="activeIndicatorOffset"
        class="circular__active-indicator"
      ></circle>
    </svg>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    percentage: {
      type: Number,
      default: 0,
      validator(percentage) {
        return percentage <= 100 && percentage >= 0;
      },
    },
    indicationType: {
      type: String,
      default: 'indeterminate',
      validator(indicationType) {
        return ['indeterminate', 'determinate'].includes(indicationType);
      },
    },
  });

  const trackVisibility = computed(
    () => props.indicationType === 'determinate'
  );

  const circularClasses = computed(() => [
    'circular',
    `circular_${props.indicationType}`,
  ]);

  const circle = {
    radius: 24,
    x: 27,
    y: 27,
  };

  const circumference = 2 * Math.PI * circle.radius;

  const calculateOffset = (percentage) =>
    circumference * ((100 - percentage) / 100);

  const trackOffset = computed(() => {
    const percentage = 100 - props.percentage;
    const offset = Math.floor(calculateOffset(percentage - 5));

    return `-${offset}px`;
  });

  const activeIndicatorOffset = computed(() => {
    const percentage =
      props.percentage < 96.25 ? props.percentage - 3.75 : props.percentage;
    const offset = Math.floor(calculateOffset(percentage));

    return `${offset}px`;
  });
</script>

<style lang="scss" scoped>
  .progress-indicator {
    $size: 48px;
    width: $size;
    height: $size;
    line-height: 0;
  }

  .circular {
    $circular: &;

    fill: transparent;
    stroke-width: 4px;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;

    &__track,
    &__active-indicator {
      transform-origin: center;
      transition: {
        property: stroke-dashoffset, transform;
        duration: map-get($duration, long-3);
        timing-function: map-get($easing, ease-in-out-quint);
      }
    }

    &__track {
      stroke: var(--palette-secondary-container);
      transform: rotate(-7.5deg);
    }

    &__active-indicator {
      stroke: var(--palette-primary);
      transform: rotate(7.5deg);
    }

    &_indeterminate {
      @keyframes active-indicator {
      }

      // #{$circular}__active-indicator {
      //   animation: {
      //     name: active-indicator;
      //     duration: 1500ms;
      //     iteration-count: infinite;
      //     direction: forward;
      //     timing-function: ease-in;
      //   }
      // }
    }
  }
</style>
