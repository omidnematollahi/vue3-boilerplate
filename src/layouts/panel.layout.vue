<template>
  <div>
    <header class="header">
      <p>This is a header for panel layout</p>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    @include elevation(12);
    width: 100vw;
  }
</style>
