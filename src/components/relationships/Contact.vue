<script setup>
const { nickname, avatarUrl, contactType } = defineProps({
  nickname: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: false,
    default: "",
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
    <div class="contact__content">
      <div class="contact__avatar">
        <img
          v-if="avatarUrl"
          class="contact__avatar-image"
          :src="avatarUrl"
          alt="avatar"
        />
        <InlineSvg
          v-else
          src="icons/person.svg"
        />
      </div>
      {{ nickname }}
    </div>

    <div class="contact__actions">
      <UiButton
        v-if="contactType === 'friend'"
        @click.stop="emits('delete-friend-request')"
      >
        <InlineSvg src="icons/person-remove.svg" />
      </UiButton>
      <UiButton
        v-if="contactType === 'sentRequest'"
        @click="emits('cancel-friend-request')"
      >
        <InlineSvg src="icons/person-cancel.svg" />
      </UiButton>
      <UiButton
        v-if="contactType === 'receivedRequest'"
        @click="emits('reject-friend-request')"
      >
        <InlineSvg src="icons/person-cancel.svg" />
      </UiButton>
      <UiButton
        v-if="contactType === 'receivedRequest'"
        @click="emits('accept-friend-request')"
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__avatar {
    height: 3rem;
    aspect-ratio: 1;
    box-shadow: inset 0 0 0 1px $border-color-1;
    display: flex;
    align-items: center;
    justify-content: center;

    &-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
}
</style>
