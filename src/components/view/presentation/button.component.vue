<template>
  <div class="presenter">
    <h3 class="presenter__title">Button Component Presentation</h3>
    <!-- Elevated Button -->
    <div class="presenter__container">
      <base-button> No Icon </base-button>
      <base-button leading-icon="favorite"> Leading </base-button>
      <base-button trailing-icon="favorite"> Trailing </base-button>
      <base-button trailing-icon="favorite" leading-icon="favorite">
        Both Icons
      </base-button>
    </div>
    <!-- Filled Button -->
    <div class="presenter__container">
      <base-button
        variant="filled"
        :is-loading="isLoading"
        @click="isLoading = true"
      >
        No Icon
      </base-button>
      <base-button variant="filled" leading-icon="favorite">
        Leading
      </base-button>
      <base-button variant="filled" trailing-icon="favorite">
        Trailing
      </base-button>
      <base-button
        variant="filled"
        trailing-icon="favorite"
        leading-icon="favorite"
      >
        Both Icons
      </base-button>
    </div>
    <!-- Filled Tonal Button -->
    <div class="presenter__container">
      <base-button variant="filled-tonal"> No Icon </base-button>
      <base-button variant="filled-tonal" leading-icon="favorite">
        Leading
      </base-button>
      <base-button variant="filled-tonal" trailing-icon="favorite">
        Trailing
      </base-button>
      <base-button
        variant="filled-tonal"
        trailing-icon="favorite"
        leading-icon="favorite"
      >
        Both Icons
      </base-button>
    </div>
    <!-- Outlined Button -->
    <div class="presenter__container">
      <base-button variant="outlined"> No Icon </base-button>
      <base-button variant="outlined" leading-icon="favorite">
        Leading
      </base-button>
      <base-button variant="outlined" trailing-icon="favorite">
        Trailing
      </base-button>
      <base-button
        variant="outlined"
        trailing-icon="favorite"
        leading-icon="favorite"
      >
        Both Icons
      </base-button>
    </div>
    <!-- Text Button -->
    <div class="presenter__container">
      <base-button variant="text"> No Icon </base-button>
      <base-button variant="text" leading-icon="favorite">
        Leading
      </base-button>
      <base-button variant="text" trailing-icon="favorite">
        Trailing
      </base-button>
      <base-button
        variant="text"
        trailing-icon="favorite"
        leading-icon="favorite"
      >
        Both Icons
      </base-button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const isLoading = ref(false);
</script>

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
  }
</style>
