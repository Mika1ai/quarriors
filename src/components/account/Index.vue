<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore, useRelationshipsStore } from "@/stores";
import { ROUTES } from "@/router";
import { api } from "@/services";

const router = useRouter();

const userStore = useUserStore();
const relationshipsStore = useRelationshipsStore();

const showAccountDropdown = ref(false);
const showSignOutDialog = ref(false);

const onSettingsClick = async () => {
  showAccountDropdown.value = false;
  router.push(ROUTES.SETTINGS.PATH);
};
const onSignOutClick = async () => {
  showAccountDropdown.value = false;
  showSignOutDialog.value = true;
};
const closeSignOutDialog = () => {
  showSignOutDialog.value = false;
};
const onSignOutConfirm = async () => {
  await api.auth.signOut({ userStore, relationshipsStore });
  closeSignOutDialog();
};
</script>

<template>
  <div class="account">
    <UiDropdown
      :show="showAccountDropdown"
      position-block="end"
      position-inline="start"
      @close="showAccountDropdown = false"
      @toggle="showAccountDropdown = !showAccountDropdown"
    >
      <template #trigger>
        <UiButton>
          <img
            v-if="userStore.avatarUrl"
            class="account__image"
            :src="userStore.avatarUrl"
            alt="avatar"
          />
          <InlineSvg src="icons/person.svg" />
        </UiButton>
      </template>

      <div class="account__menu">
        <UiButton
          :classes="['full-width']"
          @click.stop="onSettingsClick"
        >
          {{ $t("auth.settings") }}
        </UiButton>
        <UiButton
          :classes="['full-width']"
          @click.stop="onSignOutClick"
        >
          {{ $t("auth.sign_out") }}
        </UiButton>
      </div>
    </UiDropdown>

    <Teleport to="body">
      <UiDialog
        :show="showSignOutDialog"
        @close="closeSignOutDialog"
        @confirm="onSignOutConfirm"
      >
        {{ $t("auth.sign_out_confirm") }}
      </UiDialog>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.account {
  position: fixed;
  inset-block-start: $padding-md;
  inset-inline-end: $padding-md;

  &__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 10rem;
  }
}
</style>
