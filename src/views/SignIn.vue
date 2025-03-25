<script setup></script>

<template>
  <section class="sign-in">
    <div class="container">
      <div class="sign-in__layout">
        <AuthLoginForm />
        <UiButton to="/sign-up">Sign Up</UiButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sign-in {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-block-start: 10rem;

  &__layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
