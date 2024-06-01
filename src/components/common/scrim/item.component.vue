<template>
  <Teleport to="#scrim" :disabled="!isTeleported">
    <div
      @click="requestHideScrim"
      :data-id="scrimItemId"
      :class="wrapperClasses"
    >
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
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import useEventBus from '@/composable/use-event-bus.composable.js';
  import uuid from '@/utils/uuid.util';

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
    dismissByEscape: {
      type: Boolean,
      default: true,
    },
  });

  const modelValue = defineModel({
    type: Boolean,
    default: false,
  });

  const scrimItemId = uuid.generate();

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

  const wrapperClasses = computed(() => ({
    wrapper: !props.autoPosition,
    wrapper_visible: isTeleported.value && !props.autoPosition,
  }));

  const setBounding = (bounding) => {
    boundingProperties.forEach((property) => {
      const propertyValue = modelValue.value ? `${bounding[property]}px` : '';
      //TODO: may use :style on template element instead of direct DOM update
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

  const setScrimVisibility = (visibility = false) => {
    modelValue.value = visibility;
  };

  const requestHideScrim = (event) => {
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

    setScrimVisibility(false);
  };

  const hideScrimByEscape = (data) => {
    if (!props.dismissByEscape) {
      return;
    }

    setScrimVisibility(false);
  };

  const { subscribeOn, unsubscribe } = useEventBus();

  const toggleEscapeEventListener = (action = 'add') => {
    let subscriptionId;

    if (action === 'add') {
      const { id } = subscribeOn(
        `scrim:escape-${scrimItemId}`,
        hideScrimByEscape
      );

      subscriptionId = id;
      return;
    }

    unsubscribe(subscriptionId);
    subscriptionId = null;
  };

  const onModelValueChange = (newValue) => {
    toggleEscapeEventListener(newValue ? 'add' : 'remove');
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
  //FIXME: fix BEM
  .wrapper {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    &_visible {
      pointer-events: auto;
    }
  }

  .scrim_teleported {
    position: fixed;
    width: 100%;
    height: 100%;
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
      top: 0;
      left: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      display: grid;
    }
  }
</style>
