<template>
  <slot />
  <transition name="collapse-height" appear>
    <linear-progress-indicator
      v-if="indicatorPercentage"
      class="indicator"
      indication-type="determinate"
      :percentage="indicatorPercentage"
    />
  </transition>
</template>

<script setup>
  import { ref } from 'vue';
  import useEventBus from '@/composable/use-event-bus.composable.js';
  const { subscribeOn } = useEventBus();

  const indicatorPercentage = ref(0);
  let timeout = null;

  const updateIndicatorPercentage = (percentage) => {
    indicatorPercentage.value = percentage;
  };

  subscribeOn('router:beforeEach', () => {
    updateIndicatorPercentage(30);
    timeout = setTimeout(() => updateIndicatorPercentage(70), 3000);
  });

  subscribeOn('router:afterEach', () => {
    updateIndicatorPercentage(100);
    setTimeout(() => {
      clearTimeout(timeout);
      updateIndicatorPercentage(0);
    }, 500);
  });
</script>

<style lang="scss" scoped>
  //FIXME: move it somewhere more general
  .collapse-height-enter-active {
    @include transition(standard-decelerate) {
      transition-property: height;
    }
  }

  .collapse-height-leave-active {
    @include transition(standard-accelerate) {
      transition-property: height;
    }
  }

  .collapse-height-leave-to,
  .collapse-height-enter-from {
    height: 0;
  }

  .indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: $route-indicator;
  }
</style>
