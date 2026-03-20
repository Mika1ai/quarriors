<script setup>
import { api } from "@/services";
import { useField } from "vee-validate";
import { ROUTES } from "@/router";
import { nicknameSchema, emailSchema } from "@/utils";
import { useUserStore } from "@/stores";

const userStore = useUserStore();

const {
  meta: nicknameMeta,
  value: nicknameValue,
  errorMessage: nicknameErrorMessage,
} = useField("nickname", nicknameSchema, { initialValue: userStore.nickname });

const {
  meta: emailMeta,
  value: emailValue,
  errorMessage: emailErrorMessage,
} = useField("email", emailSchema, { initialValue: userStore.email });

const setUserAvatarData = async ({ avatarUrl, avatarPath }) => {
  await api.user.updateUser({
    credentials: {
      data: {
        avatar_url: avatarUrl,
        avatar_path: avatarPath,
      },
    },
    userStore,
  });
};

const onAvatarDelete = async () => {
  const isDeleted = await api.storage.deleteFile({
    bucket: "avatars",
    path: userStore.avatarPath,
  });

  if (isDeleted) {
    setUserAvatarData({ avatarUrl: "", avatarPath: "" });
  }
};

const onAvatarChange = async (file) => {
  if (userStore.avatarPath) await onAvatarDelete();

  const avatarPath = `${userStore.id}/${crypto.randomUUID()}`;

  const avatarUrl = await api.storage.uploadFile({
    bucket: "avatars",
    path: avatarPath,
    file,
  });

  if (avatarUrl && avatarPath) {
    setUserAvatarData({ avatarUrl, avatarPath });
  }
};

const onNicknameSave = async () => {
  if (!(await api.utils.isNicknameAvailable(nicknameValue.value))) return;

  await api.user.updateUser({
    credentials: {
      data: {
        nickname: nicknameValue.value,
      },
    },
    userStore,
  });
};

const onEmailSave = async () => {
  await api.user.updateUser({
    credentials: {
      email: emailValue.value,
    },
    userStore,
  });
};
</script>

<template>
  <div class="settings">
    <h2 class="heading-lg">
      {{ $t("settings.settings") }}
    </h2>

    <div class="settings__field">
      <div class="avatar">
        <img
          v-if="userStore.avatarUrl"
          class="avatar__image"
          :src="userStore.avatarUrl"
          alt="avatar"
        />
        <InlineSvg
          v-else
          src="icons/person.svg"
        />
      </div>
      <UiFileInput @file-change="onAvatarChange" />

      <UiButton
        :disabled="!userStore.avatarPath"
        @click="onAvatarDelete"
      >
        <InlineSvg src="icons/delete.svg" />
      </UiButton>
    </div>

    <div class="settings__field">
      <UiInput
        v-model="nicknameValue"
        name="nickname"
        type="text"
        :error-message="nicknameErrorMessage"
        :placeholder="$t('auth.nickname')"
      />
      <UiButton
        :disabled="!nicknameMeta.valid"
        @click="onNicknameSave"
      >
        <InlineSvg src="icons/save.svg" />
      </UiButton>
    </div>

    <div class="settings__field">
      <UiInput
        v-model="emailValue"
        name="email"
        type="email"
        :error-message="emailErrorMessage"
        :placeholder="$t('auth.email')"
      />
      <UiButton
        :disabled="!emailMeta.valid"
        @click="onEmailSave"
      >
        <InlineSvg src="icons/save.svg" />
      </UiButton>
    </div>

    <UiButton
      :to="ROUTES.HOME.PATH"
      :classes="['full-width']"
    >
      {{ $t("common.back") }}
    </UiButton>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__field {
    width: 100%;
    display: flex;
    gap: 0.5rem;
  }
}
.avatar {
  height: 3rem;
  aspect-ratio: 1;
  background-color: $background-color-1;
  box-shadow: inset 0 0 0 1px $border-color-1;
  display: flex;
  align-items: center;
  justify-content: center;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cointain;
  }
}
</style>
