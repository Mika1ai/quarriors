<script setup>
import { ref } from "vue";

const showList = ref(true);

const { contactType, title, contacts } = defineProps({
  contactType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contacts: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits([
  "cancel-friend-request",
  "delete-friend-request",
  "reject-friend-request",
  "accept-friend-request",
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
      v-if="contacts.length && showList"
      class="group__list"
    >
      <RelationshipsContact
        v-for="contact in contacts"
        :id="contact.id"
        :key="contact.id"
        :nickname="contact.nickname"
        :contact-type="contactType"
        @cancel-friend-request="(id) => emits('cancel-friend-request', id)"
        @reject-friend-request="(id) => emits('reject-friend-request', id)"
        @delete-friend-request="(id) => emits('delete-friend-request', id)"
        @accept-friend-request="(id) => emits('accept-friend-request', id)"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 0 1px $border-color-1;

  &__label {
    display: flex;
    gap: 0.25rem;
    padding: 0.25rem;
    cursor: pointer;
    user-select: none;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
