<template>
  <div :class="snackbarClasses">
    <p class="snackbar__text">{{ supportingText }}</p>
    <base-button
      v-if="actionLabel"
      class="snackbar__action-btn"
      variant="text"
      @click="$emit('click:action')"
    >
      {{ actionLabel }}
    </base-button>
    <base-icon
      v-if="hasCloseButton"
      class="snackbar__close-icon"
      style-type="filled"
      icon-name="close"
      @click="$emit('click:close')"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    supportingText: {
      type: String,
      required: true,
    },
    hasCloseButton: {
      type: Boolean,
      default: false,
    },
    actionLabel: {
      type: String,
    },
  });

  const snackbarClasses = {
    snackbar: true,
    'snackbar_with-icon': props.hasCloseButton,
  };

  defineEmits(['click:action', 'click:close']);
</script>

<style lang="scss" scoped>
  .snackbar {
    $snackbar: &;
    @include flex($align: center);
    @include elevation($level: 3);
    background-color: var(--palette-inverse-surface);
    border-radius: $radius-1x;
    min-height: 48px;
    max-height: 68px;
    padding: space(2) 0;

    &__text {
      @include typography(body-medium);
      flex-grow: 1;
      color: var(--palette-inverse-on-surface);
      padding: 0 space(4);
      overflow: hidden;

      //NOTE: may not work on all browsers but it's ok
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &__action-btn {
      @include typography(label-large);
      color: var(--palette-inverse-primary);
      margin: 0 space(2);
      user-select: none;
    }

    &__close-icon {
      --base-icon-size: 24px;
      cursor: pointer;
      color: var(--palette-inverse-on-surface);
      user-select: none;
      margin: 0 space(3);
    }

    &_with-icon {
      #{$snackbar}__action-btn {
        margin: 0;
      }
    }
  }
</style>
