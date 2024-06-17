<template>
  <div :class="textFieldClasses">
    <div class="text-field__main">
      <base-icon
        v-if="leadingIcon"
        class="text-field__leading-icon"
        transition-mode="out-in"
        :icon-name="leadingIcon"
        :style-type="leadingIconStyleType"
      />
      <div class="text-field__field" @click="setFocus(true)">
        <p class="text-field__lbl">Address</p>
        <input
          ref="inputElement"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
          type="text"
          class="text-field__input"
          v-model="value"
          :disabled="disabled"
        />
      </div>
      <base-icon
        v-if="trailingIcon"
        class="text-field__trailing-icon"
        transition-mode="out-in"
        :icon-name="trailingIcon"
        :style-type="trailingIconStyleType"
      />
      <div class="text-field__active-indicator"></div>
    </div>
    <p v-show="description" class="text-field__supporting-text">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useInput } from '@/plug-in/vee-validate';

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    rules: [String, Array],
    leadingIcon: String,
    trailingIcon: String,
    leadingIconStyleType: {
      type: String,
    },
    trailingIconStyleType: {
      type: String,
    },
    supportingText: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const inputElement = ref();
  const hasFocus = ref(false);

  const setFocus = (focus) => {
    if (focus === hasFocus.value) return;

    if (focus) {
      inputElement.value.focus();
    }

    hasFocus.value = focus;
  };

  const inputOptions = {
    syncValue: props.modelValue,
  };
  const { value, errorMessage } = useInput(props.name, props.rules, {
    options: inputOptions,
  });

  const textFieldClasses = computed(() => ({
    'text-field': true,
    'text-field_focused': hasFocus.value || value.value,
    'text-field_error': errorMessage.value,
    'text-field_disabled': props.disabled,
  }));

  const description = computed(() => {
    return errorMessage.value || props.supportingText;
  });

  const paddings = computed(() => ({
    leading: props.leadingIcon ? '12px' : '16px',
    trailing: props.trailingIcon ? '12px' : '16px',
  }));
</script>

<style lang="scss" scoped>
  .text-field {
    $text-field: &;

    &__main {
      @include flex($align: center);
      position: relative;
      height: 100%;
      gap: space(4);
      padding: space(2) 0;
      background-color: var(--palette-surface-container-high);
      height: 56px;
      border-radius: $radius-2x $radius-2x 0 0;

      @at-root [dir='ltr'] & {
        padding-left: v-bind('paddings.leading');
        padding-right: v-bind('paddings.trailing');
      }

      @at-root [dir='rtl'] & {
        padding-left: v-bind('paddings.trailing');
        padding-right: v-bind('paddings.leading');
      }

      @include transition {
        transition-property: background-color;
      }
    }

    &__leading-icon,
    &__trailing-icon {
      --base-icon-size: 1.5rem;
      color: var(--palette-on-surface-variant);
      @include transition {
        transition-property: color;
      }
    }

    &__field {
      flex-grow: 1;
      position: relative;
      height: 100%;
      @include flex($align: center);
    }

    &__lbl {
      position: absolute;
      transform-origin: 0 0;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: var(--palette-on-surface-variant);
      @include typography(body-large);
      @include transition {
        transition-property: top, transform, color;
      }
    }

    &__input {
      width: 100%;
      @include typography(body-large);
      color: var(--palette-on-surface);
      caret-color: var(--palette-primary);
      flex-grow: 1;
    }

    &__active-indicator {
      position: absolute;
      height: 1px;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: var(--palette-on-surface-variant);
      transition: {
        property: background-color, height;
        timing-function: map-get($easing, linear);
        duration: map-get($duration, short-2);
      }
    }

    &__supporting-text {
      @include typography(body-small);
      color: var(--palette-on-surface-variant);
      padding: space(1) space(4) 0;
      @include transition {
        transition-property: color;
      }
    }

    &_focused {
      #{$text-field}__lbl {
        top: 0;
        transform: scale(0.7);
      }

      #{$text-field}__active-indicator {
        background-color: var(--palette-primary);
        height: 3px;
      }

      #{$text-field}__field {
        align-items: flex-end;
      }
    }

    &_error {
      #{$text-field}__trailing-icon,
      #{$text-field}__supporting-text,
      #{$text-field}__lbl {
        color: var(--palette-error);
      }

      #{$text-field}__input {
        caret-color: var(--palette-error);
      }

      #{$text-field}__active-indicator {
        background-color: var(--palette-error);
      }
    }

    &_disabled {
      pointer-events: none;
      opacity: 0.38;

      #{$text-field}__leading-icon,
      #{$text-field}__trailing-icon,
      #{$text-field}__supporting-text,
      #{$text-field}__input,
      #{$text-field}__lbl {
        color: var(--palette-on-surface);
      }
    }
  }
</style>
