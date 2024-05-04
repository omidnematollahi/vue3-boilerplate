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
      linear_gapped: isIndicatorGapped.value,
    };
    classes[`linear_${props.indicationType}`] = true;
    return classes;
  });

  const leadingTrackVisibility = computed(
    () => props.indicationType === 'indeterminate'
  );

  const isIndicatorGapped = computed(
    () =>
      props.indicationType === 'determinate' &&
      props.percentage < 100 &&
      props.percentage > 0
  );

  const indicatorPercentage = computed(() => {
    if (props.indicationType === 'indeterminate') return 0;

    return `${props.percentage}%`;
  });
</script>

<style lang="scss" scoped>
  $height: 4px;

  .progress-indicator {
    width: 100%;
    height: $height;
    overflow: hidden;
  }

  .linear {
    $linear: &;

    @include flex($align: stretch, $justify: flex-end);
    position: relative;
    height: 100%;

    transition: gap map-get($duration, long-3)
      map-get($easing, ease-in-out-quint);

    &__leading-track,
    &__trailing-track {
      border-radius: $pill;
      background-color: var(--palette-secondary-container);
      flex-shrink: 1;
    }

    &__trailing-track {
      flex-grow: 1;
    }

    &__active-indicator {
      transition: flex-basis map-get($duration, long-3)
        map-get($easing, ease-in-out-quint);
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
    }

    &_gapped {
      gap: space(1);
    }

    &_indeterminate {
      $animation-duration: var(--linear-indicator-animation-duration, 1500ms);

      gap: space(1);
      justify-content: flex-start;

      %indicator-animation {
        animation: {
          duration: $animation-duration;
          iteration-count: infinite;
          direction: forward;
          timing-function: ease-in;
        }
      }

      @keyframes indeterminate-active-indicator {
        0% {
          flex-basis: 0%;
        }
        50% {
          flex-basis: 60%;
        }
        100% {
          flex-basis: 0%;
        }
      }

      @keyframes indeterminate-track {
        0% {
          flex-basis: 0%;
        }
        100% {
          flex-basis: 100%;
        }
      }

      #{$linear}__leading-track {
        @extend %indicator-animation;
        animation-name: indeterminate-track;
      }

      #{$linear}__active-indicator {
        @extend %indicator-animation;
        animation-name: indeterminate-active-indicator;
      }
    }
  }
</style>
