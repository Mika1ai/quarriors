<script setup>
import { ref } from "vue";

const registrationData = ref(null);

const onRegistrationComplete = (data) => {
  registrationData.value = data;
};
</script>

<template>
  <section class="sign-up">
    <div class="container">
      <div class="sign-up__layout">
        <AuthRegistrationForm
          v-if="!registrationData"
          @registration-complete="onRegistrationComplete"
        />
        <AuthVerificationForm
          v-else
          :registration-data="registrationData"
        />
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
