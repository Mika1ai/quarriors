<script setup>
import { computed } from "vue";
import { signIn } from "@/services";
import { useField } from "vee-validate";
import { emailSchema, passwordSchema } from "@/utilities/schemas";

const {
  meta: emailMeta,
  value: emailValue,
  errorMessage: emailErrorMessage,
} = useField("email", emailSchema);

const {
  meta: passwordMeta,
  value: passwordValue,
  errorMessage: passwordErrorMessage,
} = useField("email", passwordSchema);

const onFormSubmit = async () => {
  await signIn({
    email: emailValue.value,
    password: passwordValue.value,
  });
};

const isFormValid = computed(() => {
  return emailMeta.valid && passwordMeta.valid;
});
</script>

<template>
  <AuthScaffold>
    <UiForm @on-submit="onFormSubmit">
      <template #header>
        <h2 class="heading-lg">
          {{ $t("auth.sign_in") }}
        </h2>
        <p class="text-md">
          {{ $t("auth.sign_in_subtext") }}
        </p>
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
          {{ $t("auth.submit") }}
        </UiButton>
      </template>
    </UiForm>

    <template #footer>
      <UiButton to="/sign-up">
        {{ $t("auth.sign_up") }}
      </UiButton>
    </template>
  </AuthScaffold>
</template>

<style lang="scss" scoped></style>
