<script setup>
import { signOutUser } from "@/services";
import router from "@/router";
import { ROUTES } from "@/router/routes";

const onSignOutClick = async () => {
  const { signOutError } = await signOutUser();

  if (signOutError) {
    console.log(signOutError.code);
    return;
  }

  router.push({ path: ROUTES.SIGNIN.PATH });
};
</script>

<template>
  <UiButton @click="onSignOutClick">Sign Out</UiButton>
</template>

<style lang="scss" scoped></style>
