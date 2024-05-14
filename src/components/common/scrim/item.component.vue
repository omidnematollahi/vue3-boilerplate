<template>
  <Teleport to="#scrim" :disabled="!isTeleported">
    <div @click="hideScrim">
      <transition name="fade">
        <div :class="scrimClasses" v-if="modelValue"></div>
      </transition>
      <div ref="itemElement" :class="scrimItemClasses">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import { computed, nextTick, onMounted, ref, watch } from 'vue';

  const props = defineProps({
    scrimColor: {
      type: String,
      default: 'rgba(0,0,0,0.32)',
    },
    autoPosition: {
      type: Boolean,
      default: true,
    },
    closeTriggerClasses: {
      type: Array,
      default: [],
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  });

  const modelValue = defineModel({
    type: Boolean,
    default: false,
  });

  const itemElement = ref();
  const boundingProperties = ['top', 'left', 'width', 'height'];

  const scrimClasses = computed(() => ({
    scrim: true,
    scrim_teleported: isTeleported.value,
  }));

  const scrimItemClasses = computed(() => ({
    'scrim-item': true,
    'scrim-item_custom-position': !props.autoPosition,
  }));

  const setBounding = (bounding) => {
    boundingProperties.forEach((property) => {
      const propertyValue = modelValue.value ? `${bounding[property]}px` : '';
      itemElement.value.style[property] = propertyValue;
    });
  };

  const teleport = () => {
    if (!itemElement.value) {
      return;
    }

    if (!props.autoPosition) {
      return;
    }

    const boundingClientRect = itemElement.value.getBoundingClientRect();
    setBounding(boundingClientRect);
  };

  const isTeleported = ref(false);

  const hideScrim = (event) => {
    if (!props.dismissible) {
      return;
    }

    const targetClassList = event.target.classList;
    const shouldHideScrim = [
      'scrim',
      'scrim-item',
      ...props.closeTriggerClasses,
    ].some((className) => targetClassList.contains(className));

    if (!shouldHideScrim) {
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
  .scrim_teleported {
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

  .scrim-item {
    position: absolute;
    z-index: $scrim;

    &_custom-position {
      // width: 100%;
      // height: 100%;
      // background: transparent;
      // position: fixed;
      top: 0;
      left: 0;
      // display: flex;
      // justify-content: var(--scrim-item-justify, center);
      // align-items: var(--scrim-item-align, center);
    }
  }
</style>
