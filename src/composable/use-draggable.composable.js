/**
 * @typedef {Object} Position
 * @property {number} x - Horizontal axis position
 * @property {number} y - Vertical axis position
 */

/**
 * useDraggable composable options
 * @typedef {Object} UseDraggableOptions
 * @property {string} [axis=both] - Drag direction
 * @property {HTMLElement} [containerElement=document.body] - Container element (draggable element boundaries)
 * @property {Position} [initialPosition={x: 0, y:0}] - Initial position of element
 * @property {boolean} [exact=false] - Only start dragging if exactly point to element
 * @property {boolean} [disabled=false] - Disable the dragging
 * @property {Function} dragStart - Call on drag start
 * @property {Function} dragMove - Call on drag move
 * @property {Function} dragEnd - Call on drag end
 */

import { onMounted, ref, toValue } from 'vue';
import { clamp } from '@/utils/math.util';

const axisValues = Object.freeze({
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  BOTH: 'both',
});

const DEFAULT_OPTIONS = Object.freeze({
  axis: 'both',
  disabled: false,
  exact: false,
  containerElement: document.body,
  initialPosition: { x: 0, y: 0 },
});

/**
 * Validate useDraggable composable options and throw error
 * if receive any invalid option
 * @param {UseDraggableOptions} options
 * @returns {undefined}
 */
const validateOptions = (options) => {
  const axis = toValue(options.axis);
  const validAxises = Object.values(axisValues);

  if (!validAxises.includes(axis)) {
    throw new Error(`Axis must be one of ${validAxises}`);
  }
};

/**
 * useDraggable composable
 * @param {HTMLElement} element - Element to drag
 * @param {UsePromiseConfig} config - usePromise options
 * @returns {Object} - {position}
 */
const useDraggable = (element, preferredOptions = {}) => {
  const options = { ...DEFAULT_OPTIONS, ...preferredOptions };
  const { axis, containerElement, initialPosition, exact } = options;

  validateOptions(options);

  /**
   * Set pointerMove and pointerUp events
   * @returns {undefined}
   */
  const setListeners = () => {
    document.addEventListener('pointermove', dragMove);
    document.addEventListener('pointerup', dragEnd);
  };

  /**
   * Remove pointerMove and pointerUp events
   * @returns {undefined}
   */
  const removeListeners = () => {
    document.removeEventListener('pointermove', dragMove);
    document.removeEventListener('pointerup', dragEnd);
  };

  let pointerStartPosition = { x: 0, y: 0 };
  let elementOffset = { x: 0, y: 0 };
  const position = ref(toValue(initialPosition));

  /**
   * Initial the dragging requirements
   * @param {PointerEvent} event
   * @returns {undefined}
   */
  const dragStart = (event) => {
    const disabled = toValue(options.disabled);
    if (event.button !== 0 || disabled) {
      return;
    }

    const target = toValue(element);
    if (toValue(exact) && event.target !== target) {
      return;
    }

    pointerStartPosition = { x: event.clientX, y: event.clientY };
    elementOffset = { x: target.offsetLeft, y: target.offsetTop };

    setListeners();

    options.dragStart?.(position.value, event);
  };

  /**
   * Calculate clamped value horizontally
   * @param {PointerEvent} event
   * @param {Object} payload
   * @param {HTMLElement} payload.target
   * @param {HTMLElement} payload.container
   * @returns {number} - clamped horizontal value
   */
  const getClampedX = (event, { target, container }) => {
    const pointerCurrentXPosition = event.clientX;

    const pointerMovedDistance =
      elementOffset.x + pointerCurrentXPosition - pointerStartPosition.x;

    const containerWidth = container.scrollWidth;
    const targetWidth = target.offsetWidth;
    const maxPosition = containerWidth - targetWidth;

    const clampedX = clamp(pointerMovedDistance, maxPosition);
    return clampedX;
  };

  /**
   * Calculate clamped value vertically
   * @param {PointerEvent} event
   * @param {Object} payload
   * @param {HTMLElement} payload.target
   * @param {HTMLElement} payload.container
   * @returns {number} - clamped vertical value
   */
  const getClampedY = (event, { target, container }) => {
    const pointerCurrentYPosition = event.clientY;

    const pointerMovedDistance =
      elementOffset.y + pointerCurrentYPosition - pointerStartPosition.y;

    const containerHeight = container.scrollHeight;
    const targetHeight = target.offsetHeight;
    const maxPosition = containerHeight - targetHeight;

    const clampedY = clamp(pointerMovedDistance, maxPosition);
    return clampedY;
  };

  /**
   * Handle pointer movement
   * @param {PointerEvent} event
   * @returns {undefined}
   */
  const dragMove = (event) => {
    const target = toValue(element);
    const container = toValue(containerElement);
    const axisValue = toValue(axis);

    if (axisValue === 'both' || axisValue === 'horizontal') {
      const x = getClampedX(event, { target, container });
      position.value.x = x;
      target.style.left = x + 'px';
    }

    if (axisValue === 'both' || axisValue === 'vertical') {
      const y = getClampedY(event, { target, container });
      target.style.top = y + 'px';
      position.value.y = y;
    }

    options.dragMove?.(position.value, event);
  };

  /**
   * Handle pointer movement end
   * @param {PointerEvent} event
   * @returns {undefined}
   */
  const dragEnd = (event) => {
    removeListeners();
    options.dragEnd?.(position.value, event);
  };

  onMounted(() => {
    const target = toValue(element);
    target.addEventListener('pointerdown', dragStart);
  });

  return { position };
};

export default useDraggable;
