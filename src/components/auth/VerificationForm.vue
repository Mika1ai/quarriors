<script setup>
import { ref, computed } from "vue";
import { verifyEmail, resendOtp } from "@/services";
import { useField } from "vee-validate";
import { otpSchema } from "@/utilities/schemas";

const props = defineProps({
  registrationData: { required: true },
});

const {
  meta: otpMeta,
  value: otpValue,
  errorMessage: otpErrorMessage,
} = useField("otp", otpSchema);

const onResendClick = async () => {
  const { resendingData } = await resendOtp({
    email: props.registrationData.user.email,
  });

  console.log(resendingData);
};

const onFormSubmit = async () => {
  const verificationData = await verifyEmail({
    email: props.registrationData.user.email,
    token: otpValue.value,
  });

  console.log(verificationData);
};

const isFormValid = computed(() => {
  return otpMeta.valid;
});
</script>

<template>
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
        Submit
      </UiButton>
    </template>
  </UiForm>
</template>

<style lang="scss" scoped></style>
