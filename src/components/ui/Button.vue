<script setup>
import { computed } from "vue";

const { type, classes, disabled, to, pseudo } = defineProps({
  type: {
    type: String,
    required: false,
    default: "button",
  },
  classes: {
    type: Array,
    required: false,
    default: () => [],
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
  pseudo: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const buttonTag = computed(() => {
  if (pseudo) return "div";
  return to ? "router-link" : "button";
});

const buttonClasses = computed(() => {
  return classes.map((cls) => `button--${cls}`);
});
</script>

<template>
  <component
    :is="buttonTag"
    :type="type"
    :disabled="disabled"
    :to="to"
    :class="['button', ...buttonClasses]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.button {
  width: min-content;
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
  white-space: nowrap;

  &--sm {
    padding: 0.25rem;
  }

  &--full-width {
    width: 100%;
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
