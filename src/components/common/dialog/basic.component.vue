<template>
  <scrim-item
    v-model="modelValue"
    :auto-position="false"
    :close-trigger-classes="['wrapper']"
  >
    <transition name="dialog">
      <div v-if="modelValue" :class="dialogClasses" :style="$attrs.style">
        <base-icon
          :icon-name="iconName"
          :style-type="iconStyleType"
          transition-mode="out-in"
          class="dialog__icon"
        />
        <h3 v-if="headlineText" class="dialog__headline">
          {{ headlineText }}
        </h3>
        <p class="dialog__supporting-text">
          <slot name="supporting-text" />
        </p>
        <div class="dialog__content">
          <slot />
        </div>
        <div
          class="dialog__actions"
          v-if="secondaryActionLabel || primaryActionLabel"
        >
          <base-button
            v-if="secondaryActionLabel"
            class="dialog__action-btn"
            variant="text"
            @click="takeAction('secondary')"
          >
            {{ secondaryActionLabel }}
          </base-button>
          <base-button
            v-if="primaryActionLabel"
            class="dialog__action-btn"
            variant="text"
            @click="takeAction('primary')"
          >
            {{ primaryActionLabel }}
          </base-button>
        </div>
      </div>
    </transition>
  </scrim-item>
</template>

<script setup>
  import { computed } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    iconName: String,
    iconStyleType: String,
    supportingText: String,
    headlineText: String,
    primaryActionLabel: String,
    secondaryActionLabel: String,
    hasPadding: {
      type: Boolean,
      default: true,
    },
  });

  const emit = defineEmits(['action']);

  const dialogClasses = computed(() => ({
    dialog: true,
    wrapper__dialog: true,
    dialog_align_center: !!props.iconName,
    dialog_padded: props.hasPadding,
  }));

  const modelValue = defineModel({ type: Boolean });

  const setModelValue = (value) => {
    modelValue.value = value;
  };

  const takeAction = (action) => {
    emit(`action`, action);
  };
</script>

<style lang="scss" scoped>
  .dialog {
    $dialog: &;
    $padding: space(6);
    @include flex(column, $align: stretch);
    min-width: 280px;
    max-width: 560px;
    width: 360px;
    max-height: 90vh;
    background-color: var(--palette-surface-container-high);
    border-radius: $radius-7x;
    overflow: hidden;
    @include elevation($level: 3);
    align-self: center;
    justify-self: center;
    margin: 0 space(6);

    &_padded {
      padding: $padding 0;
    }

    &_align_center {
      #{$dialog}__headline {
        text-align: center;
      }

      #{$dialog}__icon {
        margin-left: auto;
        margin-right: auto;
      }
    }

    &__icon {
      --base-icon-size: 1.5rem;
      color: var(--palette-secondary);
      margin-bottom: space(4);
      flex-shrink: 0;
    }

    &__headline {
      @include typography(headline-small);
      color: var(--palette-on-surface);
      margin-bottom: space(4);
      padding: 0 $padding;
    }

    &__supporting-text {
      @include typography(body-medium);
      color: var(--palette-on-surface-variant);
      padding: 0 $padding;
    }

    &__content {
      overflow: hidden auto;
    }

    &__actions {
      @include flex($align: center, $justify: flex-end, $wrap: wrap);
      margin-top: space(6);
      gap: space(2);
      padding: 0 $padding;
    }

    &__action-btn {
      --base-button-min-width: auto;
      flex-shrink: 0;
    }
  }
</style>
