<template>
  <scrim-container>
    <indicator-router>
      <transition-router
        :route-key="routeKey"
        default-transition-mode="out-in"
      />
    </indicator-router>
  </scrim-container>
  <toast-manager />
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const routeKey = computed(() => {
    if (!route.matched.length) return;

    const matchedRoute = route.matched[0];
    return matchedRoute.name;
  });
</script>
