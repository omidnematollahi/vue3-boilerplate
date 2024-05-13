<template>
  <slot />
  <div id="scrim" ref="scrimElement"></div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';

  const scrimElement = ref(null);

  const observerCallback = ([mutationList]) => {
    const bodyScrollDisabled = scrimElement.value.children.length;
    document.body.style.overflow = bodyScrollDisabled
      ? 'hidden'
      : 'hidden auto';
  };

  const mutationObserver = new MutationObserver(observerCallback);

  const setObserver = () => {
    const config = { childList: true };
    mutationObserver.observe(scrimElement.value, config);
  };

  onMounted(setObserver);
</script>
