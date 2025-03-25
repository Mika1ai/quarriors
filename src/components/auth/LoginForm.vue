<script setup>
import { ref, computed } from "vue";
import { loginUser } from "@/services";
import { useField } from "vee-validate";
import { emailSchema, passwordSchema } from "@/utilities/schemas";
import { ROUTES } from "@/router/routes";
import router from "@/router";

const formErrorMessage = ref(null);

const {
  meta: emailMeta,
  value: emailValue,
  errorMessage: emailErrorMessage,
  setErrors: emailSetErrors,
} = useField("email", emailSchema);

const {
  meta: passwordMeta,
  value: passwordValue,
  errorMessage: passwordErrorMessage,
  setErrors: passwordSetErrors,
} = useField("email", passwordSchema);

const onFormSubmit = async () => {
  formErrorMessage.value = "";

  const { loginData, loginError } = await loginUser({
    email: emailValue.value,
    password: passwordValue.value,
  });

  if (loginError) {
    console.log(loginError.code);
    return;
  }

  console.log(loginData);
  router.push({ path: ROUTES.HOME.PATH });
};

const isFormValid = computed(() => {
  return emailMeta.valid && passwordMeta.valid;
});
</script>

<template>
  <UiForm @on-submit="onFormSubmit">
    <template #header>
      <h2 class="heading">Sign In</h2>
      <p>test</p>
    </template>

    <template #default>
      <UiInput
        v-model="emailValue"
        name="email"
        type="email"
        :error-message="emailErrorMessage"
        :placeholder="$t('auth.email')"
      />
      <UiInput
        v-model="passwordValue"
        name="password"
        type="password"
        :error-message="passwordErrorMessage"
        :placeholder="$t('auth.password')"
      />
    </template>

    <template #footer>
      <UiButton
        type="submit"
        :disabled="!isFormValid"
      >
        Submit
      </UiButton>

      <div v-if="formErrorMessage">
        {{ formErrorMessage }}
      </div>
    </template>
  </UiForm>
</template>

<style lang="scss" scoped>
.heading {
  @include heading-lg;
}
</style>
