<template>
  <slot />
  <div id="scrim" ref="scrimElement"></div>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import eventBus from '@/services/event-bus';

  const scrimElement = ref(null);
  let latestScrimItemId = null;

  const observerCallback = ([mutationList]) => {
    const hasTeleportedChild = scrimElement.value.children.length;
    document.body.style.overflow = hasTeleportedChild
      ? 'hidden'
      : 'hidden auto';

    if (!hasTeleportedChild) {
      latestScrimItemId = null;
      toggleEscapeListener('remove');
      return;
    }

    if (!latestScrimItemId) {
      toggleEscapeListener('add');
    }

    latestScrimItemId = scrimElement.value.lastElementChild.dataset.id;
  };

  const mutationObserver = new MutationObserver(observerCallback);

  const setObserver = () => {
    const config = { childList: true };
    mutationObserver.observe(scrimElement.value, config);
  };

  const onKeyUp = (event) => {
    const { key, keyCode } = event;
    const isEscapeKey = keyCode === 27 || key === 'Escape' || key === 'Esc';

    if (!isEscapeKey || !latestScrimItemId) {
      return;
    }

    eventBus.publish('scrim:escape', { scrimItemId: latestScrimItemId });
  };

  const toggleEscapeListener = (action) => {
    if (action === 'add') {
      return scrimElement.value.addEventListener('keyup', onKeyUp);
    }

    scrimElement.value.removeEventListener('keyup', onKeyUp);
  };

  onMounted(() => {
    setObserver();
    toggleEscapeListener('add');
  });

  onUnmounted(() => toggleEscapeListener('remove'));
</script>
