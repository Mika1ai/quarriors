<script setup>
import { ref, computed, onMounted } from "vue";
import { api } from "@/services";
import { useField } from "vee-validate";
import { otpSchema } from "@/utils/schemas";
import { useRouter, useRoute } from "vue-router";
import { ROUTES } from "@/router";

const emailValue = ref("");

onMounted(() => {
  const router = useRouter();
  const route = useRoute();

  emailValue.value = route.query.email;
  if (!emailValue.value) router.push({ path: ROUTES.SIGN_UP.PATH });
});

const {
  meta: otpMeta,
  value: otpValue,
  errorMessage: otpErrorMessage,
} = useField("otp", otpSchema);

const onResendClick = async () => {
  await api.auth.resendOtp({ email: emailValue.value });
};

const onFormSubmit = async () => {
  await api.auth.verifyEmail({
    email: emailValue.value,
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
      <UiButton :to="ROUTES.SIGN_IN.PATH">
        {{ $t("auth.sign_in") }}
      </UiButton>
      <UiButton :to="ROUTES.SIGN_UP.PATH">
        {{ $t("auth.sign_up") }}
      </UiButton>
    </template>
  </AuthScaffold>
</template>

<style lang="scss" scoped></style>
