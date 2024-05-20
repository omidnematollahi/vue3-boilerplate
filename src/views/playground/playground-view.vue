<template>
  <div class="container">
    <date-picker :calendar="gregorianCalendar"></date-picker>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import gregorianCalendar from '@/services/calendar/gregorian';

  const selected = ref(true);
</script>

<style lang="scss" scoped>
  .container {
    margin: 64px auto;
    // border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 600px;
  }
</style>
