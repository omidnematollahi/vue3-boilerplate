<template>
  <!-- TODO: Add icon loading skeleton -->
  <transition
    name="base-icon"
    v-if="animateOnChange"
    :mode="transitionMode"
    appear
  >
    <component class="base-icon" :is="icon" />
  </transition>
  <component v-else class="base-icon" :is="icon" />
</template>

<script setup>
  import { defineAsyncComponent, computed } from 'vue';

  const props = defineProps({
    iconName: {
      type: String,
      required: true,
    },
    styleType: {
      type: String,
      default: 'filled',
      validator(type) {
        return ['filled', 'outlined'].includes(type);
      },
    },
    animateOnChange: {
      type: Boolean,
      default: true,
    },
    transitionMode: {
      type: String,
    },
  });

  const getFallbackIconType = () =>
    props.styleType === 'filled' ? 'outlined' : 'filled';

  const icon = computed(() => {
    const iconName = props.iconName;
    const type = props.styleType;

    return defineAsyncComponent(async () => {
      let module;
      try {
        module = await import(
          `../../../assets/icons/${type}/${iconName}.icon.vue`
        );
      } catch (error) {
        const fallbackIconType = getFallbackIconType();
        console.warn(
          `using fallback icon style ("${iconName}" icon) -> [${fallbackIconType}]`
        );
        module = await import(
          `../../../assets/icons/${fallbackIconType}/${iconName}.icon.vue`
        );
      }
      return module;
    });
  });
</script>

<style lang="scss" scoped>
  .base-icon {
    width: var(--base-icon-size, 1.5rem);
    height: var(--base-icon-size, 1.5rem);
    transition-property: opacity, transform, color;
  }

  .base-icon-enter-active {
    @include transition(emphasized-decelerate);
  }

  .base-icon-leave-active {
    @include transition(emphasized-accelerate);
  }

  .base-icon-enter-from,
  .base-icon-leave-to {
    opacity: 0.2;
    transform: scale(0);
  }
</style>
