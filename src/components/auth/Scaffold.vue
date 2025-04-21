<script setup></script>

<template>
  <div class="scaffold">
    <slot />
    <footer
      v-if="$slots.footer"
      class="scaffold__footer"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.scaffold {
  width: 100%;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  &__footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 1rem;
  }
}
</style>
