<template>
  <div class="presenter">
    <h3 class="presenter__title">Icon Button Component Presentation</h3>
    <!-- Filled Icon Button -->
    <div class="presenter__container">
      <icon-button variant="filled" icon-name="favorite" :is-selected="true" />
      <icon-button variant="filled" icon-name="favorite" :is-selected="false" />
      <icon-button
        disabled
        variant="filled"
        icon-name="favorite"
        :is-selected="true"
      />
      <icon-button
        disabled
        variant="filled"
        icon-name="favorite"
        :is-selected="false"
      />
    </div>
    <!-- Filled Tonal Icon Button -->
    <div class="presenter__container">
      <icon-button
        variant="filled-tonal"
        icon-name="favorite"
        :is-selected="true"
      />
      <icon-button
        variant="filled-tonal"
        icon-name="favorite"
        :is-selected="false"
      />
      <icon-button
        disabled
        variant="filled-tonal"
        icon-name="favorite"
        :is-selected="true"
      />
      <icon-button
        disabled
        variant="filled-tonal"
        icon-name="favorite"
        :is-selected="false"
      />
    </div>
    <!-- Outlined Icon Button -->
    <div class="presenter__container">
      <icon-button
        variant="outlined"
        icon-name="favorite"
        :is-selected="true"
      />
      <icon-button
        variant="outlined"
        icon-name="favorite"
        :is-selected="false"
      />
      <icon-button
        disabled
        variant="outlined"
        icon-name="favorite"
        :is-selected="true"
      />
      <icon-button
        disabled
        variant="outlined"
        icon-name="favorite"
        :is-selected="false"
      />
    </div>
    <!-- Standard Icon Button -->
    <div class="presenter__container">
      <icon-button icon-name="favorite" :is-selected="true" />
      <icon-button icon-name="favorite" :is-selected="false" />
      <icon-button disabled icon-name="favorite" :is-selected="true" />
      <icon-button disabled icon-name="favorite" :is-selected="false" />
    </div>
  </div>
</template>

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
