<template>
  <div class="container">
    <stepper-input :step="3" v-model="value" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const value = ref(0);
</script>

<style lang="scss" scoped>
  .container {
    @include flex;
    margin: 64px auto;
    // border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 600px;
  }
</style>
