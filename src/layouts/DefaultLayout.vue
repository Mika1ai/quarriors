<script setup></script>

<template>
  <section class="section">
    <div class="container container--sm">
      <slot />
      <Account />
      <Relationships />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  width: 100%;
  padding-block: $padding-md;
}
</style>
