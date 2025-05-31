<script setup>
import { api } from "@/services";

const onSignOutClick = async () => {
  await api.auth.signOut();
};
</script>

<template>
  <UiButton @click="onSignOutClick">Sign Out</UiButton>
</template>

<style lang="scss" scoped></style>
