<script setup>
import { ref, computed } from "vue";
import { verifyUser } from "@/services";
import { useField } from "vee-validate";
import { otpSchema } from "@/utilities/schemas";

const props = defineProps({
  registrationData: { required: true },
});

const formErrorMessage = ref(null);

const {
  meta: otpMeta,
  value: otpValue,
  errorMessage: otpErrorMessage,
  setErrors: otpSetErrors,
} = useField("otp", otpSchema);

const onFormSubmit = async () => {
  const { verificationData, verificationError } = await verifyUser({
    email: props.registrationData.user.email,
    token: otpValue.value,
  });

  if (verificationError) {
    switch (verificationError.code) {
      case "otp_expired": {
        otpSetErrors("otp_expired");
        return;
      }
      default: {
        formErrorMessage.value = "unexpected_failure";
        return;
      }
    }
  }

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

<style lang="scss" scoped></style>
