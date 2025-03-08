<script setup>
import { verifyUser } from "@/services";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { meta, values } = useForm({
  validationSchema: yup.object({
    token: yup.string().required().min(6),
  }),
});

const onSubmit = () => {
  verifyUser(values);
};
</script>

<template>
  <UiForm @on-submit="onSubmit">
    <template #header>
      <h2>Confirm</h2>
    </template>

    <template #default>
      <UiInput
        name="token"
        type="text"
        placeholder="OTP"
      />
    </template>

    <template #footer>
      <UiButton
        type="submit"
        :disabled="!meta.valid"
      >
        Submit
      </UiButton>
    </template>
  </UiForm>
</template>

<style lang="scss" scoped></style>
