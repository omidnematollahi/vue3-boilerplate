<template>
  <transition :name="layoutTransition">
    <component :is="layout" :key="routeLayoutName">
      <slot />
    </component>
  </transition>
</template>

<script setup>
  import { defineAsyncComponent, ref, watch, computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const routeLayoutName = ref('default');
  const layoutTransition = ref('scale-fade');

  const onRouteChange = () => {
    const { layout, transition } = route.meta;

    routeLayoutName.value = layout ?? 'default';
    layoutTransition.value = transition ?? 'scale-fade';
  };
  watch(() => route.meta.layout, onRouteChange);

  const layout = computed(() => {
    const layoutName = routeLayoutName.value;
    return defineAsyncComponent(() =>
      import(`../../../layouts/${layoutName}.layout.vue`)
    );
  });
</script>
