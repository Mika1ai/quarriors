<script setup></script>

<template>
  <section class="sign-up">
    <div class="container">
      <div class="sign-up__layout">
        <AuthConfirmSignUpForm />
        <UiButton to="/sign-in">Sign In</UiButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sign-up {
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
