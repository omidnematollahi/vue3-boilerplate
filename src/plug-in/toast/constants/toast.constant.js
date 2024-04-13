export const DEFAULT_CONFIG = Object.freeze({
  duration: 3000,
  position: 'bottom',
  type: 'info',
  autoDismiss: true,
  stackMaxToast: 3,
});

export const TOAST_POSITIONS = [
  'top',
  'bottom',
  'top-center',
  'top-left',
  'top-right',
  'bottom-center',
  'bottom-right',
  'bottom-left',
];

export default { POSITIONS: TOAST_POSITIONS };
