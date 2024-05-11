<template>
  <div class="container">
    <radio-input :is-selected="selected" @click="selected = !selected" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const selected = ref(true);
</script>

<style lang="scss" scoped>
  .container {
    margin: 64px auto;
    border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 600px;
    height: 400px;
  }
</style>
