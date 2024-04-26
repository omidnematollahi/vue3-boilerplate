<template>
  <div>
    <h1 class="title">THIS IS PLAYGROUND</h1>
    <button @click="$router.push({ name: 'presentation' })">
      Presentation
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    @include typography(display-medium);
    color: var(--palette-primary);
  }
</style>
