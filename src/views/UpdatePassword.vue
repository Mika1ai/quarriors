<script setup>
import { computed, onMounted } from "vue";
import { supabase } from "@/services/supabaseClient";
import { updateUser, signOut } from "@/services";
import { useField } from "vee-validate";
import { passwordSchema } from "@/utilities/schemas";
import { useRouter } from "vue-router";
import { ROUTES } from "@/router";

const router = useRouter();

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    router.push({ path: ROUTES.SIGN_IN.PATH });
    return;
  }
});

const {
  meta: passwordMeta,
  value: passwordValue,
  errorMessage: passwordErrorMessage,
} = useField("password", passwordSchema);

const onFormSubmit = async () => {
  const isSuccess = await updateUser({ password: passwordValue.value });
  if (!isSuccess) return;

  await signOut();
  router.push({ path: ROUTES.SIGN_IN.PATH });
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
