<script setup>
import { ref, computed, onMounted } from "vue";
import { api } from "@/services";
import { useField } from "vee-validate";
import { otpSchema } from "@/utils";
import { useRouter, useRoute } from "vue-router";
import { useUserStore, useRelationshipsStore } from "@/stores";
import { ROUTES } from "@/router";

const userStore = useUserStore();
const relationshipsStore = useRelationshipsStore();

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
    credentials: {
      email: emailValue.value,
      token: otpValue.value,
    },
    userStore,
    relationshipsStore,
  });
};

const isFormValid = computed(() => {
  return otpMeta.valid;
});
</script>

<template>
  <AuthScaffold>
    <UiForm @submit="onFormSubmit">
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
        <UiButton @click="onResendClick">
          {{ $t("auth.resend_otp") }}
        </UiButton>
        <UiButton
          type="submit"
          :disabled="!isFormValid"
        >
          {{ $t("common.submit") }}
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
