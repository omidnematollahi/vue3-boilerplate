<template>
  <div class="presenter">
    <h3 class="presenter__title">Skeleton Component Presentation</h3>
    <!-- Skeleton Component -->
    <div class="presenter__container">
      <div class="card">
        <base-skeleton
          class="card__skeleton"
          variant="pill"
          width="48px"
          height="48px"
          :order="1"
        />
        <div class="card__row">
          <base-skeleton
            v-for="i in 3"
            :key="i"
            class="card__skeleton"
            variant="rect"
            width="100%"
            height="50px"
            :order="i + 2"
          />
        </div>
        <base-skeleton
          class="card__skeleton"
          variant="text"
          width="100%"
          :order="5"
        />
      </div>
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
  }

  .card {
    width: 300px;

    &__row {
      @include flex($align: center);
      gap: space(1);
      margin: space(4) 0 space(3);
    }
  }
</style>
