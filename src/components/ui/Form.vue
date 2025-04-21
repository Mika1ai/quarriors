<script setup>
const emits = defineEmits(["on-submit"]);
</script>

<template>
  <form
    class="form"
    @submit.prevent="$emit('on-submit')"
  >
    <header
      v-if="$slots.header"
      class="form__header"
    >
      <slot name="header" />
    </header>
    <div
      v-if="$slots.default"
      class="form__content"
    >
      <slot />
    </div>
    <footer
      v-if="$slots.footer"
      class="form__footer"
    >
      <slot name="footer" />
    </footer>
  </form>
</template>

<style lang="scss" scoped>
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2rem;
  background-color: $background-color-1;
  padding: 2rem;
  border: 1px solid $border-color-1;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-block-end: 2rem;
  }

  &__footer {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 1rem;
  }
}
</style>
