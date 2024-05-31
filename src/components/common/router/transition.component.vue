<template>
  <layout-view>
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" :mode="transitionMode" appear>
        <component :is="Component" :key="routeKey ?? route.path" />
      </transition>
    </router-view>
  </layout-view>
</template>

<script setup>
  defineProps({
    transitionName: {
      type: String,
      default: 'scale-fade',
    },
    routeKey: {
      type: String,
    },
    transitionMode: {
      type: String,
    },
  });
</script>
