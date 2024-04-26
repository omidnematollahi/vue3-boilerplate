<template>
  <layout-view>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'scale-fade'" appear>
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </layout-view>
  <transition name="fade">
    <linear-indicator
      v-if="indicatorPercentage"
      class="indicator"
      :percentage="indicatorPercentage"
    />
  </transition>
</template>

<script setup>
  import { onUnmounted, ref } from 'vue';
  import { eventBus } from '@/services/event-bus';

  const indicatorPercentage = ref(0);

  const updateIndicatorPercentage = (percentage) => {
    indicatorPercentage.value = percentage;
  };
  const beforeEachSubscription = eventBus.subscribeOn('router:beforeEach', () =>
    updateIndicatorPercentage(30)
  );

  const afterEachSubscription = eventBus.subscribeOn('router:afterEach', () => {
    updateIndicatorPercentage(100);
    setTimeout(() => updateIndicatorPercentage(0), 200);
  });

  const clearSubscriptions = () => {
    beforeEachSubscription.unsubscribe();
    afterEachSubscription.unsubscribe();
  };

  onUnmounted(clearSubscriptions);
</script>

<style lang="scss" scoped>
  .indicator {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $route-indicator;
  }
</style>
