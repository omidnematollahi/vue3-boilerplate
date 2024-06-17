<template>
  <div class="container">
    <filled-text-field
      :model-value="address"
      name="address"
      leading-icon="favorite"
      leading-icon-style-type="outlined"
      trailing-icon="close"
      trailing-icon-style-type="outlined"
      supporting-text="Please enter your address"
      rules="required"
      disabled
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  // 22844 Virginia Blvd., California City, CA 93505
  const address = ref('');
</script>

<style lang="scss" scoped>
  .container {
    margin: 64px auto;
    // border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 400px;
  }

  .loader {
    margin-bottom: 8px;
    // width: 100%;
  }
</style>
