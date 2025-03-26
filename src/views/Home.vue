<script setup>
import { signOut } from "@/services";
import router from "@/router";
import { ROUTES } from "@/router/routes";

const onSignOutClick = async () => {
  const data = await signOut();

  if (data) router.push({ path: ROUTES.SIGNIN.PATH });
};
</script>

<template>
  <UiButton @click="onSignOutClick">Sign Out</UiButton>
</template>

<style lang="scss" scoped></style>
