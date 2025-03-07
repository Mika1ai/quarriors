<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const { value, errorMessage, meta } = useField(() => props.name);
</script>

<template>
  <label class="label">
    <input
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      class="input"
      :class="{ 'input--error': !meta.valid }"
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
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input {
  width: 100%;
  padding: 0.75rem 1.25rem;
  box-shadow: inset 0 0 100vmax 0 $background-color-1;
  color: $text-color-1;
  @include text-md;

  &::placeholder {
    color: $text-color-2;
  }

  &--error {
    border: 1px solid red;
  }
}
</style>
