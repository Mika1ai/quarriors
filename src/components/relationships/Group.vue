<script setup>
import { ref } from "vue";

const showList = ref(false);

const { contactType, title, contacts } = defineProps({
  contactType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  emptyText: {
    type: String,
    required: false,
    default: "No items",
  },
  contacts: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits([
  "cancel-friend-request",
  "reject-friend-request",
  "accept-friend-request",
  "delete-friend-request",
]);
</script>

<template>
  <div class="group">
    <div
      class="group__label"
      @click="showList = !showList"
    >
      <span>{{ title }}:</span>
      <span>({{ contacts.length }})</span>
    </div>

    <ul
      v-if="showList"
      class="group__list"
    >
      <RelationshipsContact
        v-for="contact in contacts"
        :key="contact.id"
        :nickname="contact.nickname"
        :avatar-url="contact.avatar_url"
        :contact-type="contactType"
        @cancel-friend-request="emits('cancel-friend-request', contact.id)"
        @reject-friend-request="emits('reject-friend-request', contact.id)"
        @accept-friend-request="emits('accept-friend-request', contact.id)"
        @delete-friend-request="
          emits('delete-friend-request', {
            id: contact.id,
            nickname: contact.nickname,
          })
        "
      />
      <div v-if="!contacts.length">
        {{ emptyText }}
      </div>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 0 1px $border-color-1;

  &__label {
    height: 3rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    cursor: pointer;
    user-select: none;
    box-shadow: inset 0 0 0 1px $border-color-1;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-block-start: 0.5rem;
  }
}
</style>
