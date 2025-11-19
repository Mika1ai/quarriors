<script setup>
import { computed } from "vue";

const { type, size, disabled, to } = defineProps({
  type: {
    type: String,
    required: false,
    default: "button",
  },
  size: {
    type: String,
    required: false,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  to: {
    type: String,
    required: false,
    default: "",
  },
});

const buttonTag = computed(() => {
  return to ? "router-link" : "button";
});
</script>

<template>
  <component
    :is="buttonTag"
    :type="type"
    :disabled="disabled"
    :to="to"
    :class="['button', size ? `button--${size}` : '']"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.75rem;
  background-color: $background-color-2;
  color: $text-color-1;
  box-shadow: inset 0 0 0 1px $border-color-1;
  @include text-md;
  cursor: pointer;
  transition: background-color 300ms ease;
  text-decoration: none;

  &--small {
    padding: 0.25rem;
  }

  &:hover {
    background-color: $background-color-3;
  }

  &:disabled {
    background-color: $background-color-1;
    color: $text-color-2;
    pointer-events: none;
  }
}
</style>
