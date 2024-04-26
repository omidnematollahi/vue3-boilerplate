<template>
  <div class="presenter">
    <h3 class="presenter__title">Button Component Presentation</h3>
    <!-- Elevated Button -->
    <div class="presenter__container">
      <base-button> No Icon </base-button>
      <base-button leading-icon="close"> Leading </base-button>
      <base-button trailing-icon="close"> Trailing </base-button>
      <base-button trailing-icon="close" leading-icon="close">
        Both Icons
      </base-button>
    </div>
    <!-- Filled Button -->
    <div class="presenter__container">
      <base-button variant="filled"> No Icon </base-button>
      <base-button variant="filled" leading-icon="close"> Leading </base-button>
      <base-button variant="filled" trailing-icon="close">
        Trailing
      </base-button>
      <base-button variant="filled" trailing-icon="close" leading-icon="close">
        Both Icons
      </base-button>
    </div>
    <!-- Filled Tonal Button -->
    <div class="presenter__container">
      <base-button variant="filled-tonal"> No Icon </base-button>
      <base-button variant="filled-tonal" leading-icon="close">
        Leading
      </base-button>
      <base-button variant="filled-tonal" trailing-icon="close">
        Trailing
      </base-button>
      <base-button
        variant="filled-tonal"
        trailing-icon="close"
        leading-icon="close"
      >
        Both Icons
      </base-button>
    </div>
    <!-- Outlined Button -->
    <div class="presenter__container">
      <base-button variant="outlined"> No Icon </base-button>
      <base-button variant="outlined" leading-icon="close">
        Leading
      </base-button>
      <base-button variant="outlined" trailing-icon="close">
        Trailing
      </base-button>
      <base-button
        variant="outlined"
        trailing-icon="close"
        leading-icon="close"
      >
        Both Icons
      </base-button>
    </div>
    <!-- Text Button -->
    <div class="presenter__container">
      <base-button variant="text"> No Icon </base-button>
      <base-button variant="text" leading-icon="close"> Leading </base-button>
      <base-button variant="text" trailing-icon="close"> Trailing </base-button>
      <base-button variant="text" trailing-icon="close" leading-icon="close">
        Both Icons
      </base-button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .presenter {
    &__title {
      @include typography(title-medium);
    }

    &__container {
      @include flex();
      gap: space(4);
      margin-top: space(6);
    }
  }
</style>
