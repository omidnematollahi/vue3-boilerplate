<template>
  <Teleport to="#scrim" :disabled="!isTeleported">
    <div>
      <transition name="fade">
        <div :class="scrimClasses" @click="hideScrim" v-if="modelValue"></div>
      </transition>
      <div ref="itemElement" class="scrim-item">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';

  defineProps({
    scrimColor: {
      type: String,
      default: 'rgba(0,0,0,0.32)',
    },
  });

  const modelValue = defineModel({
    type: Boolean,
    default: false,
  });

  const itemElement = ref();
  const boundingProperties = [
    'bottom',
    'top',
    'left',
    'right',
    'width',
    'height',
  ];

  const scrimClasses = computed(() => ({
    scrim: true,
    scrim_teleported: isTeleported.value,
  }));

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

  const isTeleported = ref(false);

  const hideScrim = (event) => {
    if (!event.target.classList.contains('scrim')) {
      return;
    }

    modelValue.value = false;
  };

  const onModelValueChange = (newValue) => {
    nextTick(() => {
      teleport();
      isTeleported.value = newValue;
    });
  };

  onMounted(() => {
    watch(modelValue, onModelValueChange, { immediate: true });
  });
</script>

<style lang="scss" scoped>
  .scrim {
    &_teleported {
      position: fixed;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: v-bind(scrimColor);
      overflow: hidden;
      top: 0;
      left: 0;
      z-index: $scrim;
    }
  }

  .scrim-item {
    z-index: $scrim;
    position: absolute;
  }
</style>
