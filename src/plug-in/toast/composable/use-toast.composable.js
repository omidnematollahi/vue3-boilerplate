import { inject } from 'vue';

const useToast = () => {
  const toast = inject('toast');
  return toast;
};

export default useToast;
