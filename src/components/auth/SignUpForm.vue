<script setup>
import { computed } from "vue";
import { signUp, checkNickname } from "@/services";
import { useField } from "vee-validate";
import {
  nicknameSchema,
  emailSchema,
  passwordSchema,
} from "@/utilities/schemas";

const {
  meta: nicknameMeta,
  value: nicknameValue,
  errorMessage: nicknameErrorMessage,
} = useField("nickname", nicknameSchema);

const {
  meta: emailMeta,
  value: emailValue,
  errorMessage: emailErrorMessage,
} = useField("email", emailSchema);

const {
  meta: passwordMeta,
  value: passwordValue,
  errorMessage: passwordErrorMessage,
} = useField("password", passwordSchema);

const onFormSubmit = async () => {
  const isNicknameAvailable = await checkNickname(nicknameValue.value);
  if (!isNicknameAvailable) return;

  await signUp({
    nickname: nicknameValue.value,
    email: emailValue.value,
    password: passwordValue.value,
  });
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
    </template>
  </UiForm>
</template>

<style lang="scss" scoped>
.heading {
  @include heading-lg;
}
</style>
