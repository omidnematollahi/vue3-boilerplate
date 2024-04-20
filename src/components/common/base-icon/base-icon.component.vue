<template>
  <component class="base-icon" :is="icon" />
</template>

<script setup>
  import { defineAsyncComponent, computed } from 'vue';

  const props = defineProps({
    iconName: String,
  });

  const icon = computed(() => {
    const iconName = props.iconName;

    return defineAsyncComponent(() =>
      import(`../../../assets/icons/${iconName}.icon.vue`)
    );
  });
</script>

<style lang="scss" scoped>
  .base-icon {
    width: var(--base-icon-size, 1.5rem);
    height: var(--base-icon-size, 1.5rem);
  }
</style>
