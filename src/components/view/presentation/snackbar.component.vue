<template>
  <div class="presenter">
    <h3 class="presenter__title">SnackBar Component Presentation</h3>
    <!-- Snackbar Component -->
    <div class="presenter__container">
      <snack-bar
        class="presenter__snackbar"
        supporting-text="Single line snackbar with action"
        action-label="Action"
        has-close-button
      />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
      color: var(--palette-on-surface);
    }

    &__container {
      @include flex();
      gap: space(4);
      margin-top: space(6);
    }

    &__snackbar {
      width: 100%;
      max-width: 500px;
    }
  }
</style>
