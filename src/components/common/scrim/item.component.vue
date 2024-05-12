<template>
  <Teleport to="#scrim" :disabled="!isTeleported">
    <div ref="itemElement" class="scrim-item" v-if="modelValue">
      <slot />
    </div>
  </Teleport>
</template>

<script setup>
  import { inject, nextTick, onMounted, ref, watch } from 'vue';
  import eventBus from '@/services/event-bus';

  const modelValue = defineModel({
    type: Boolean,
    default: false,
  });

  const updateScrimVisibility = inject('scrim:updateVisibility');

  const itemElement = ref();
  const boundingProperties = [
    'bottom',
    'top',
    'left',
    'right',
    'width',
    'height',
  ];

  const setBounding = (bounding) => {
    boundingProperties.forEach((property) => {
      const propertyValue = modelValue.value ? `${bounding[property]}px` : '';
      itemElement.value.style[property] = propertyValue;
    });
  };

  const teleport = () => {
    if (!itemElement.value) return;
    const boundingClientRect = itemElement.value.getBoundingClientRect();
    setBounding(boundingClientRect);
  };

  eventBus.subscribeOn('scrim:visibilityChanged', ({ visibility }) => {
    if (modelValue.value === visibility) {
      return;
    }

    modelValue.value = visibility;
  });

  const isTeleported = ref(false);

  const onModelValueChange = () => {
    updateScrimVisibility(modelValue.value);
    nextTick(() => {
      teleport();
      isTeleported.value = modelValue.value;
    });
  };

  onMounted(() => {
    watch(modelValue, onModelValueChange, { immediate: true });
  });
</script>

<style lang="scss" scoped>
  .scrim-item {
    position: relative;
  }
</style>
