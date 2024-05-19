<template>
  <div class="header">
    <p v-if="supportingText" class="header__supporting-text">
      {{ supportingText }}
    </p>
    <div class="header__headline-container">
      <transition name="selected-date">
        <h6 :key="headlineText" class="header__headline">
          {{ headlineText }}
        </h6>
      </transition>
    </div>
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

    &__headline-container {
      position: relative;
      overflow: hidden;
    }

    &__headline {
      @include typography(headline-large);
    }
  }
</style>
