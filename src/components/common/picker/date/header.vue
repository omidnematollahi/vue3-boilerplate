<template>
  <div class="header">
    <p v-if="supportingText" class="header__supporting-text">
      {{ supportingText }}
    </p>
    <h6 class="header__headline">
      {{ headlineText }}
    </h6>
  </div>
</template>

<script setup>
  defineProps({
    supportingText: {
      type: String,
    },
    headlineText: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .header {
    padding: space(4) space(6) space(3);
    color: var(--palette-on-surface-variant);

    &__supporting-text {
      @include typography(label-large);
      margin-bottom: space(9);
    }

    &__headline {
      @include typography(headline-large);
    }
  }
</style>
