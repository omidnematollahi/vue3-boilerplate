<template>
  <header class="header">
    <p>This is a header for panel layout</p>
  </header>
  <main>
    <slot />
  </main>
</template>

<style lang="scss" scoped>
  .header {
    @include elevation(12, $dark-shadow: false);
  }
</style>
