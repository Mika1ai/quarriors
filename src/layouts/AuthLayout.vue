<script setup></script>

<template>
  <section class="layout">
    <div class="container">
      <div class="layout__inner">
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-block-start: 10rem;

  &__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
