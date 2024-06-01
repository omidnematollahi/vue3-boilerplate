<template>
  <div class="progress-indicator">
    <svg viewBox="0 0 54 54" :class="circularClasses">
      <circle
        v-if="trackVisibility"
        :r="circle.radius"
        :cx="circle.x"
        :cy="circle.y"
        :stroke-dasharray="circumference"
        class="circular__track"
      ></circle>
      <circle
        :r="circle.radius"
        :cx="circle.x"
        :cy="circle.y"
        :stroke-dasharray="circumference"
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
      props.percentage > 4 ? 100 - props.percentage : 100 - props.percentage;
    const offset = calculateOffset(percentage - 4.5);

    return `-${offset}px`;
  });

  const activeIndicatorOffset = computed(() => {
    const balanceFactor = props.percentage > 96 ? -1 : -4;
    const percentage = props.percentage + balanceFactor;

    const offset = calculateOffset(Math.max(0, percentage));

    return `${offset}px`;
  });

  const activeIndicatorAnimationOffsets = {
    start: calculateOffset(86),
    end: calculateOffset(6),
  };
</script>

<style lang="scss" scoped>
  .progress-indicator {
    $size: var(--circular-indicator-size, 48px);
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
      stroke-dashoffset: v-bind(trackOffset);
    }

    &__active-indicator {
      stroke: var(--palette-primary);
      stroke-dashoffset: v-bind(activeIndicatorOffset);
    }

    &_indeterminate {
      $animation-duration: 1750ms;

      @keyframes rotate {
        0% {
          transform: rotate(-90deg);
        }
        100% {
          transform: rotate(270deg);
        }
      }

      animation: {
        name: rotate;
        duration: $animation-duration;
        iteration-count: infinite;
        direction: forward;
        timing-function: linear;
      }

      @keyframes active-indicator-offset {
        0% {
          stroke-dashoffset: v-bind('activeIndicatorAnimationOffsets.start');
          transform: rotate(8deg);
        }
        50% {
          stroke-dashoffset: v-bind('activeIndicatorAnimationOffsets.end');
          transform: rotate(188deg);
        }
        100% {
          stroke-dashoffset: v-bind('activeIndicatorAnimationOffsets.start');
          transform: rotate(368deg);
        }
      }

      #{$circular}__active-indicator {
        animation: {
          name: active-indicator-offset;
          duration: $animation-duration;
          iteration-count: infinite;
          direction: forward;
          timing-function: linear;
        }
      }
    }
  }
</style>
