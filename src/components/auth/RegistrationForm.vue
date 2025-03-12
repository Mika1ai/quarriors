<script setup>
import { ref, computed } from "vue";
import { registerUser, checkNickname } from "@/services";
import { useField } from "vee-validate";
import {
  nicknameSchema,
  emailSchema,
  passwordSchema,
} from "@/utilities/schemas";

const emit = defineEmits(["registration-complete"]);

const formErrorMessage = ref(null);

const {
  meta: nicknameMeta,
  value: nicknameValue,
  errorMessage: nicknameErrorMessage,
  setErrors: nicknameSetErrors,
} = useField("nickname", nicknameSchema);

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

  const isNicknameAvailable = await checkNickname(nicknameValue.value);
  if (!isNicknameAvailable) {
    nicknameSetErrors("Nickname is already taken");
    return;
  }

  const { registrationData, registrationError } = await registerUser({
    nickname: nicknameValue.value,
    email: emailValue.value,
    password: passwordValue.value,
  });

  if (registrationError) {
    switch (registrationError.code) {
      case "email_address_invalid": {
        emailSetErrors("email_address_invalid");
        return;
      }
      case "weak_password": {
        passwordSetErrors("weak_password");
        return;
      }
      case "over_email_send_rate_limit": {
        formErrorMessage.value = "over_email_send_rate_limit";
        return;
      }
      default: {
        formErrorMessage.value = "unexpected_failure";
        return;
      }
    }
  }

  emit("registration-complete", registrationData);
};

const isFormValid = computed(() => {
  return nicknameMeta.valid && emailMeta.valid && passwordMeta.valid;
});
</script>

<template>
  <UiForm @on-submit="onFormSubmit">
    <template #header>
      <h2 class="heading">Sign Up</h2>
      <p>test</p>
    </template>

    <template #default>
      <UiInput
        v-model="nicknameValue"
        name="nickname"
        type="text"
        :error-message="nicknameErrorMessage"
        :placeholder="$t('auth.nickname')"
      />
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
