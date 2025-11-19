<script setup>
import { ref } from "vue";

const model = defineModel();

const { type, errorMessage, placeholder } = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  errorMessage: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
});

const reactiveType = ref(type);
</script>

<template>
  <label class="label">
    <input
      v-model="model"
      :type="reactiveType"
      :placeholder="placeholder"
      :class="['input', { 'input--error': !!errorMessage }]"
    />
    <span
      v-if="errorMessage"
      class="error"
    >
      {{ errorMessage }}
    </span>
    <div
      v-if="type === 'password'"
      class="show-button"
      @mousedown="reactiveType = 'text'"
      @mouseup="reactiveType = type"
    >
      <InlineSvg src="icons/visibility.svg" />
    </div>
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
  min-height: 3rem;
  padding: 0.75rem 1.25rem;
  color: $text-color-1;
  background-color: $background-color-1;
  box-shadow: inset 0 0 0 1px $border-color-1;
  @include text-md;

  &::placeholder {
    color: $text-color-2;
  }

  &:focus-visible {
    outline: $border-color-1 solid 1px;
  }

  &--error {
    box-shadow: inset 0 0 0 1px $error-color-1;

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
.show-button {
  position: absolute;
  z-index: 2;
  right: 0%;
  top: 0%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
