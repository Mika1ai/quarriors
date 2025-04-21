<script setup>
import { computed } from "vue";
import { verifyEmail, resendOtp } from "@/services";
import { useField } from "vee-validate";
import { otpSchema } from "@/utilities/schemas";
import { useRouter, useRoute } from "vue-router";
import { ROUTES } from "@/router/routes";

const router = useRouter();
const route = useRoute();

const { email } = route.query;
if (!email) router.push({ path: ROUTES.SIGNUP.PATH });

const {
  meta: otpMeta,
  value: otpValue,
  errorMessage: otpErrorMessage,
} = useField("otp", otpSchema);

const onResendClick = async () => {
  await resendOtp({ email });
};

const onFormSubmit = async () => {
  await verifyEmail({
    email,
    token: otpValue.value,
  });
};

const isFormValid = computed(() => {
  return otpMeta.valid;
});
</script>

<template>
  <AuthScaffold>
    <UiForm @on-submit="onFormSubmit">
      <template #header>
        <h2>Confirm</h2>
      </template>

      <template #default>
        <UiInput
          v-model="otpValue"
          name="otp"
          type="text"
          :error-message="otpErrorMessage"
          :placeholder="$t('auth.otp')"
        />
      </template>

      <template #footer>
        <UiButton
          type="button"
          @click="onResendClick"
        >
          Resend OTP
        </UiButton>
        <UiButton
          type="submit"
          :disabled="!isFormValid"
        >
          {{ $t("auth.submit") }}
        </UiButton>
      </template>
    </UiForm>

    <template #footer>
      <UiButton to="/sign-in">
        {{ $t("auth.sign_in") }}
      </UiButton>
      <UiButton to="/sign-up">
        {{ $t("auth.sign_up") }}
      </UiButton>
    </template>
  </AuthScaffold>
</template>

<style lang="scss" scoped></style>
