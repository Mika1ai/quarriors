<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
});

const buttonTag = computed(() => {
  return props.to ? "router-link" : "button";
});
</script>

<template>
  <component
    :is="buttonTag"
    :type="type"
    :disabled="disabled"
    :to="to"
    class="button"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.button {
  padding: 0.75rem 1.25rem;
  background-color: $background-color-2;
  color: $text-color-1;
  border: 1px solid $border-color-1;
  @include text-md;
  cursor: pointer;
  transition: background-color 300ms ease;
  text-decoration: none;

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
