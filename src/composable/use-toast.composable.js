import { computed, ref } from 'vue';
import Timeout from '@/utils/timeout.util.js';
import { TOAST_POSITIONS } from '@/constants/toast.constant.js';

const toastList = ref([]);

//FIXME: do something so user can set a default config
const DEFAULT_CONFIG = Object.freeze({
  durationInMillisecond: 3000,
  position: 'bottom',
});

const dismissToast = (toastId) => {
  const toastIndex = toastList.value.findIndex((toast) => toast.id === toastId);
  toastList.value.splice(toastIndex, 1);
};

const showToast = (message = '', props, toastConfig = DEFAULT_CONFIG) => {
  toastConfig = { ...DEFAULT_CONFIG, ...toastConfig };
  const { durationInMillisecond, position } = toastConfig;

  if (!TOAST_POSITIONS.includes(position))
    throw new Error(`Unsupported toast position: ${position}`);

  const id = Symbol();

  const timeout = new Timeout(() => dismissToast(id), durationInMillisecond);

  const toast = {
    id,
    message,
    props,
    config: toastConfig,
    get remainingTime() {
      return timeout.remainingTime;
    },
    pauseTimer: () => timeout.pause(),
    resumeTimer: () => timeout.resume(),
    dismiss: () => dismissToast(id),
  };

  toastList.value.push(toast);
  return toast;
};

const useToast = () => {
  const list = computed(() => toastList.value);

  return { list, show: showToast };
};

export default useToast;
