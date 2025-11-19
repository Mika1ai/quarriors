<script setup>
const { id, nickname, contactType } = defineProps({
  id: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  contactType: {
    type: String,
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
  <li class="contact">
    {{ nickname }}

    <div class="contact__actions">
      <UiButton
        v-if="contactType === 'sentRequest'"
        size="small"
        @click="emits('cancel-friend-request', id)"
      >
        <InlineSvg src="icons/person-cancel.svg" />
      </UiButton>
      <UiButton
        v-if="contactType === 'friend'"
        size="small"
        @click="emits('delete-friend-request', id)"
      >
        <InlineSvg src="icons/person-remove.svg" />
      </UiButton>
      <UiButton
        v-if="contactType === 'receivedRequest'"
        size="small"
        @click="emits('reject-friend-request', id)"
      >
        <InlineSvg src="icons/person-cancel.svg" />
      </UiButton>
      <UiButton
        v-if="contactType === 'receivedRequest'"
        size="small"
        @click="emits('accept-friend-request', id)"
      >
        <InlineSvg src="icons/person-check.svg" />
      </UiButton>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.contact {
  width: 100%;
  box-shadow: inset 0 0 0 1px $border-color-1;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
}
</style>
