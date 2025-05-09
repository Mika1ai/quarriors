<script setup>
import { computed } from "vue";
import { resetPassword } from "@/services";
import { useField } from "vee-validate";
import { ROUTES } from "@/router";
import { emailSchema } from "@/utilities/schemas";

const {
  meta: emailMeta,
  value: emailValue,
  errorMessage: emailErrorMessage,
} = useField("email", emailSchema);

const onFormSubmit = async () => {
  await resetPassword({ email: emailValue.value });
};

const isFormValid = computed(() => {
  return emailMeta.valid;
});
</script>

<template>
  <AuthScaffold>
    <UiForm @on-submit="onFormSubmit">
      <template #header>
        <h2 class="heading-lg">
          {{ $t("auth.reset_password") }}
        </h2>
        <p class="text-md">
          {{ $t("auth.reset_password_subtext") }}
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
      <UiButton :to="ROUTES.SIGN_IN.PATH">
        {{ $t("auth.sign_in") }}
      </UiButton>
    </template>
  </AuthScaffold>
</template>

<style lang="scss" scoped></style>
