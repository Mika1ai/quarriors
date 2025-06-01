<script setup>
import { computed } from "vue";
import { api } from "@/services";
import { useField } from "vee-validate";
import { passwordSchema } from "@/utils";
import { useUserStore, useRelationshipsStore } from "@/stores";

const userStore = useUserStore();
const relationshipsStore = useRelationshipsStore();

const {
  meta: passwordMeta,
  value: passwordValue,
  errorMessage: passwordErrorMessage,
} = useField("password", passwordSchema);

const onFormSubmit = async () => {
  const isPasswordUpdated = await api.user.updateUser({
    credentials: {
      password: passwordValue.value,
    },
    userStore,
  });
  if (!isPasswordUpdated) return;

  await api.auth.signOut({ userStore, relationshipsStore });
};

const isFormValid = computed(() => {
  return passwordMeta.valid;
});
</script>

<template>
  <AuthScaffold>
    <UiForm @on-submit="onFormSubmit">
      <template #header>
        <h2 class="heading-lg">
          {{ $t("auth.update_password") }}
        </h2>
        <p class="text-md">
          {{ $t("auth.update_password_subtext") }}
        </p>
      </template>

      <template #default>
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
  </AuthScaffold>
</template>

<style lang="scss" scoped></style>
