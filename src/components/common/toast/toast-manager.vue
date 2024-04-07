<template>
  <TransitionGroup
    appear
    tag="ul"
    class="toast-stack"
    v-for="stack in stacks"
    :key="stack.name"
    :class="stack.classList"
    :name="stack.transition"
  >
    <li
      v-for="toast in toastStacks[stack.name]?.reverse()"
      :key="toast.id"
      @mouseenter="toast.pauseTimer"
      @mouseleave="toast.resumeTimer"
      class="toast-stack__item"
    >
      <component
        :is="ToastNotification"
        :message="toast.message"
        v-bind="toast.props"
        @action:dismiss="toast.dismiss"
      />
    </li>
  </TransitionGroup>
</template>

<script setup>
  import { computed } from 'vue';

  import useToast from '@/composable/use-toast.js';

  import BaseIcon from '@/components/common/base-icon/base-icon.vue';
  import ToastNotification from '@/components/common/toast/toast-notification.vue';
  import { TOAST_POSITIONS } from '@/constants/toast.constant.js';

  const { list: toastList } = useToast();

  const stacks = TOAST_POSITIONS.map((position) => {
    const classList = position.split('-');
    const transitionName = `${
      classList.includes('top') ? 'top' : 'bottom'
    }-stack`;

    return {
      name: position,
      classList,
      transition: transitionName,
    };
  });

  const toastStacks = computed(() =>
    toastList.value.reduce((stackPositionMap, toast) => {
      const { position: toastPosition } = toast.config;

      const targetStack = stackPositionMap[toastPosition];
      if (!targetStack) {
        stackPositionMap[toastPosition] = [toast];
      } else {
        targetStack.push(toast);
      }

      return stackPositionMap;
    }, {})
  );
</script>

<style lang="scss" scoped>
  //FIXME: make transition classes globally available
  .bottom-stack-leave-active,
  .bottom-stack-enter-active,
  .top-stack-enter-active,
  .top-stack-leave-active {
    transition: {
      property: opacity, transform;
      duration: 0.2s;
      timing-function: ease-out;
    }
  }

  .top-stack-enter-from,
  .top-stack-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }

  .bottom-stack-enter-from,
  .bottom-stack-leave-to {
    opacity: 0;
    transform: translateY(50%);
  }

  .toast-stack {
    position: fixed;
    z-index: $toast;
    margin: var(--toast-stack-margin, space(6));

    &__item {
      margin: var(--toast-stack-item-margin, space(2) 0 0);
    }
  }

  .top {
    top: 0;
  }

  .bottom {
    bottom: 0;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .center {
    left: 50%;
    transform: translate(-50%);
  }
</style>
