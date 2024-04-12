<template>
  <div class="toast">
    <base-icon icon-name="add-circle-filled" />
    <p class="body1 toast__message">
      {{ message }}
      {{ type }}
    </p>
    <div class="toast__actions" @click="$emit('action:dismiss')">
      <base-icon icon-name="close" />
    </div>
  </div>
</template>

<script setup>
  //TODO: incomplete component
  import BaseIcon from '@/components/common/base-icon/base-icon.component.vue';
  import { computed } from 'vue';

  const emit = ['action:dismiss'];

  const props = defineProps({
    message: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) =>
        ['error', 'info', 'success', 'warning'].includes(value),
    },
  });
</script>

<style lang="scss" scoped>
  .toast {
    @include flex;
    background-color: lightgreen;
    max-width: 20rem;
    padding: 1rem;
    border-radius: 0.5rem;
    color: green;

    &__message {
      margin: 0 0.5rem;
    }
  }
</style>
