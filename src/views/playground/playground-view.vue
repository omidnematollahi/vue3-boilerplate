<template>
  <div class="container">
    <base-skeleton variant="text" class="loader" :order="0" />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="1"
    />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="2"
    />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="3"
    />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="4"
    />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="5"
    />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="6"
    />
    <base-skeleton
      variant="rect"
      width="100%"
      height="50px"
      class="loader"
      :order="7"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .container {
    margin: 64px auto;
    // border: 4px dashed var(--palette-primary);
    padding: 24px;
    border-radius: 24px;
    width: 600px;
  }

  .loader {
    margin-bottom: 8px;
    // width: 100%;
  }
</style>
