<template>
  <div :class="skeletonClasses"></div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({
    variant: {
      type: String,
      default: 'pill',
      validator(variant) {
        return ['text', 'pill', 'rect'].includes(variant);
      },
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '24px',
    },
    height: {
      type: String,
      default: '24px',
    },
    order: {
      type: Number,
      default: 0,
    },
    baseDelay: {
      type: Number,
      default: 250,
    },
    animationSpeed: {
      type: String,
      default: '1000ms',
    },
  });

  const skeletonClasses = computed(() => {
    const classes = {
      skeleton: true,
      skeleton_block: props.fullWidth,
    };
    classes[`skeleton_variant_${props.variant}`] = true;

    return classes;
  });

  const animationDelay = computed(() => {
    const delay = props.order * props.baseDelay;
    return `${delay}ms`;
  });
</script>

<style lang="scss" scoped>
  .skeleton {
    width: v-bind('width');
    height: v-bind('height');
    animation: {
      name: skeleton;
      duration: v-bind('animationSpeed');
      direction: alternate;
      iteration-count: infinite;
      fill-mode: both;
      delay: v-bind('animationDelay');
    }

    &_block {
      width: 100%;
    }

    &_variant_text {
      height: 12px;
      width: 120px;
    }

    &_variant_text,
    &_variant_pill {
      border-radius: $pill;
    }

    &_variant_rect {
      border-radius: $radius-3x;
    }

    @keyframes skeleton {
      0% {
        background-color: var(--skeleton-from-color);
      }
      100% {
        background-color: var(--skeleton-to-color);
      }
    }
  }
</style>
