<script setup>
import { api } from "@/services";
import { useUserStore, useRelationshipsStore } from "@/stores";

const userStore = useUserStore();
const relationshipsStore = useRelationshipsStore();

const onSignOutClick = async () => {
  await api.auth.signOut({ userStore, relationshipsStore });
};
</script>

<template>
  <div>
    <UiButton @click="onSignOutClick">Sign Out</UiButton>
  </div>
</template>

<style lang="scss" scoped></style>
