<template>
  <layout-view>
    <router-view />
  </layout-view>
  <linear-indicator
    v-if="indicatorPercentage"
    class="indicator"
    :percentage="indicatorPercentage"
  />
  <toast-manager />
</template>

<script setup>
  import { onUnmounted, ref } from 'vue';

  import { eventBus } from '@/services/event-bus';

  import LayoutView from '@/components/common/layout-view/layout-view.component.vue';
  import LinearIndicator from '@/components/common/indicator/linear-indicator.component.vue';
  import ToastManager from '@/components/common/toast/toast-manager.component.vue';

  const indicatorPercentage = ref(0);

  const updateIndicatorPercentage = (percentage) => {
    indicatorPercentage.value = percentage;
  };
  const beforeEachSubscription = eventBus.subscribeOn('router:beforeEach', () =>
    updateIndicatorPercentage(30)
  );

  const afterEachSubscription = eventBus.subscribeOn('router:afterEach', () => {
    updateIndicatorPercentage(100);
    setTimeout(() => updateIndicatorPercentage(0), 300);
  });

  const clearSubscriptions = () => {
    beforeEachSubscription.unsubscribe();
    afterEachSubscription.unsubscribe();
  };
  onUnmounted(clearSubscriptions);
</script>

<style lang="scss">
  // FIXME: remove this style tag
</style>

<style lang="scss" scoped>
  .indicator {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $route-indicator;
  }
</style>
