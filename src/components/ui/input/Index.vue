<script setup>
const model = defineModel();

const props = defineProps({
  type: { default: "text" },
  errorMessage: { default: "" },
  placeholder: { default: "" },
});
</script>

<template>
  <label class="label">
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :class="['input', { 'input--error': !!errorMessage }]"
    />
    <span
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </span>
  </label>
</template>

<style lang="scss" scoped>
.label {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  padding: 0.75rem 1.25rem;
  color: $text-color-1;
  background-color: $background-color-1;
  border: 1px solid $border-color-1;
  @include text-md;

  &::placeholder {
    color: $text-color-2;
  }

  &:focus-visible {
    outline: $border-color-1 solid 1px;
  }

  &--error {
    border-color: $error-color-1;

    &:focus-visible {
      outline-color: $error-color-1;
    }
  }
}
.error {
  position: absolute;
  top: 100%;
  padding: 0.25rem 1.25rem;
  color: $error-color-1;
}
</style>
