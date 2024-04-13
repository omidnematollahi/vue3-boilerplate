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
      @mouseenter="pauseTimer(toast)"
      @mouseleave="resumeTimer(toast)"
      class="toast-stack__item"
    >
      <slot v-bind="toast">
        <toast-notification
          v-bind="toast.props"
          :type="toast.type"
          @action:dismiss="dismiss(toast.id)"
        />
      </slot>
    </li>
  </TransitionGroup>
</template>

<script setup>
  import { computed } from 'vue';
  import { toastList } from '../toast-manager';

  import useToast from '..//composable/use-toast.composable.js';

  import ToastNotification from './toast-notification.component.vue';
  import { TOAST_POSITIONS } from '../constants/toast.constant.js';

  const toastManager = useToast();

  const pauseTimer = (toast) => {
    if (!toast || !toast.autoDismiss) return;
    toastManager.pauseTimer(toast.id);
  };

  const resumeTimer = (toast) => {
    if (!toast || !toast.autoDismiss) return;
    toastManager.resumeTimer(toast.id);
  };

  const dismiss = (toast) => {
    if (!toast) return;
    toastManager.dismiss(toast);
  };

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
    toastList.reduce((stackPositionMap, toast) => {
      const { position: toastPosition } = toast;

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
