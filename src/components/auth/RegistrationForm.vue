<script setup>
import { registerUser, isNicknameAvailable } from "@/services";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { meta, values, setFieldError } = useForm({
  validationSchema: yup.object({
    nickname: yup.string().required().min(6),
    email: yup.string().required().email(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
  }),
});

const onSubmit = async () => {
  const available = await isNicknameAvailable(values.nickname);
  if (!available) {
    setFieldError("nickname", "Nickname is already taken");

    return;
  }
  registerUser(values);
};
</script>

<template>
  <UiForm @on-submit="onSubmit">
    <template #header>
      <h2 class="heading">Sign Up</h2>
      <p>test</p>
    </template>

    <template #default>
      <UiInput
        name="nickname"
        type="text"
        :placeholder="$t('auth.nicknamePlaceholder')"
      />
      <UiInput
        name="email"
        type="email"
        :placeholder="$t('auth.emailPlaceholder')"
      />
      <UiInput
        name="password"
        type="password"
        :placeholder="$t('auth.passwordPlaceholder')"
      />
    </template>

    <template #footer>
      <UiButton
        type="submit"
        text="Submit"
        :disabled="!meta.valid"
      ></UiButton>
    </template>
  </UiForm>
</template>

<style lang="scss" scoped>
.heading {
  @include heading-lg;
}
</style>
