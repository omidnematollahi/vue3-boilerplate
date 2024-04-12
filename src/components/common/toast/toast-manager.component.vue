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

  import useToast from '@/composable/use-toast.composable.js';

  import BaseIcon from '@/components/common/base-icon/base-icon.component.vue';
  import ToastNotification from '@/components/common/toast/toast-notification.component.vue';
  import { TOAST_POSITIONS } from '@/constants/toast.constant.js';

  const { list: toastList } = useToast();

  const stacks = TOAST_POSITIONS.map((position) => {
    const classList = position.split('-');
    const transitionName = `fade-${classList.includes('top') ? 'down' : 'up'}`;

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
