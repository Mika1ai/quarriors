<script setup></script>

<template>
  <div class="home">
    <h2 class="heading-lg">
      {{ $t("home.quarriors") }}
    </h2>

    <UiButton
      :classes="['full-width']"
      @click="() => {}"
    >
      {{ $t("home.create_lobby") }}
    </UiButton>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
