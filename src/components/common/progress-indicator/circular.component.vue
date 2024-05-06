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

  const circularClasses = computed(() => {
    const classes = {
      circular: true,
      circular_rotated: props.percentage <= 96,
    };

    classes[`circular_${props.indicationType}`] = true;

    return classes;
  });

  const circle = {
    radius: 24,
    x: 27,
    y: 27,
  };

  const circumference = 2 * Math.PI * circle.radius;

  const calculateOffset = (percentage) =>
    circumference * ((100 - percentage) / 100);

  const trackOffset = computed(() => {
    const percentage =
      props.percentage > 4
        ? 100 - props.percentage
        : 100 - props.percentage + 4;
    const offset = calculateOffset(percentage - 5.25);

    return `-${offset}px`;
  });

  const activeIndicatorOffset = computed(() => {
    const balanceFactor = props.percentage > 96 ? -1 : -4;
    const percentage = props.percentage + balanceFactor;

    const offset = calculateOffset(percentage < 0 ? 0 : percentage);

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

    &_rotated {
      #{$circular}__track {
        transform: rotate(-8deg);
      }

      #{$circular}__active-indicator {
        transform: rotate(8deg);
      }
    }

    &__track {
      stroke: var(--palette-secondary-container);
    }

    &__active-indicator {
      stroke: var(--palette-primary);
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
