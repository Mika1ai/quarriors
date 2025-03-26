<script setup>
import { signOut } from "@/services";

const onSignOutClick = async () => {
  await signOut();
};
</script>

<template>
  <UiButton @click="onSignOutClick">Sign Out</UiButton>
</template>

<style lang="scss" scoped></style>
