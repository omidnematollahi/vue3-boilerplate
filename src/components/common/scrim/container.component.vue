<template>
  <slot />
  <transition name="fade">
    <div id="scrim" v-show="scrimVisibility" @click="hideScrim"></div>
  </transition>
</template>

<script setup>
  import { provide, ref } from 'vue';
  import eventBus from '@/services/event-bus';

  const scrimVisibility = ref(false);
  const updateScrimVisibility = (visibility) => {
    scrimVisibility.value = visibility;
    eventBus.publish('scrim:visibilityChanged', { visibility });
  };

  const hideScrim = (event) => {
    if (event.target.id !== 'scrim') {
      return;
    }

    updateScrimVisibility(false);
  };

  provide('scrim:updateVisibility', updateScrimVisibility);
</script>

<style lang="scss" scoped>
  #scrim {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.32);
    top: 0;
    left: 0;
    z-index: $scrim;
  }
</style>
