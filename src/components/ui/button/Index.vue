<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  text: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="button"
    :type="type"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.button {
  padding: 0.75rem 1.25rem;
}
</style>
