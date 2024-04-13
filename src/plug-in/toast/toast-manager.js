import { reactive } from 'vue';
import Timeout from '@/utils/timeout.util.js';
import {
  TOAST_POSITIONS,
  DEFAULT_CONFIG,
  STACK_MAP,
} from './constants/toast.constant.js';

export const stacks = reactive(STACK_MAP);

class ToastManager {
  #config;
  #toastsTimer = {};
  #reserveStacks = TOAST_POSITIONS.reduce((stackMap, position) => {
    stackMap[position] = [];
    return stackMap;
  }, {});

  constructor(config = {}) {
    this.#config = { ...DEFAULT_CONFIG, ...config };
  }

  #getToastConfig(toastConfig) {
    const config = { ...this.#config, ...toastConfig };

    return {
      duration: config.duration,
      position: config.position,
      type: config.type,
      autoDismiss: config.autoDismiss,
    };
  }

  #checkReserveStack({ position }) {
    const reserveStack = this.#reserveStacks[position];
    const hasFreeSpace = stacks[position].length < this.#config.stackMaxToast;

    if (!hasFreeSpace || !reserveStack.length) return;

    const reservedToast = reserveStack.pop();
    this.show(reservedToast.props, reservedToast.toastConfig);
  }

  dismiss(toast) {
    const stack = stacks[toast.position];

    const toastIndex = stack.findIndex(({ id }) => toast.id === id);
    stack.splice(toastIndex, 1);

    this.#toastsTimer[toast.id]?.cancel();
    this.#checkReserveStack(toast);
  }

  pauseTimer(toastId) {
    this.#toastsTimer[toastId]?.pause();
  }

  resumeTimer(toastId) {
    this.#toastsTimer[toastId]?.resume();
  }

  show(props, toastConfig = {}) {
    const config = this.#getToastConfig(toastConfig);
    const { duration, position, autoDismiss } = config;

    const stackItemCount = stacks[position].length;
    if (stackItemCount >= this.#config.stackMaxToast) {
      this.#reserveStacks[position].unshift({ toastConfig, props });
      return;
    }

    if (!TOAST_POSITIONS.includes(position))
      throw new Error(`Unsupported toast position: ${position}`);

    const id = Symbol();

    if (autoDismiss) {
      const timeout = new Timeout(() => this.dismiss(toast), duration);
      this.#toastsTimer[id] = timeout;
    }

    const timer = this.#toastsTimer[id];

    const toast = {
      id,
      props,
      ...config,
      get remainingTime() {
        return timer?.remainingTime;
      },
    };

    const addStrategy = position.includes('top') ? 'push' : 'unshift';
    stacks[position][addStrategy](toast);

    return toast;
  }
}

export default ToastManager;
