<script setup>
import { ref, computed } from "vue";
import { useRelationshipsStore } from "@/stores";
import { api } from "@/services";

const relationshipsStore = useRelationshipsStore();

const nicknameValue = ref("");
const showRelationships = ref(false);

const sendFriendRequest = () => {
  api.relationships.sendFriendRequest(nicknameValue.value);
  nicknameValue.value = "";
};

const deleteFriendRequest = (id) => {
  api.relationships.deleteFriendRequest(id);
};
const rejectFriendRequest = (id) => {
  api.relationships.rejectFriendRequest(id);
};
const cancelFriendRequest = (id) => {
  api.relationships.cancelFriendRequest(id);
};
const acceptFriendRequest = (id) => {
  api.relationships.acceptFriendRequest(id);
};
</script>

<template>
  <div class="wrapper">
    <Transition
      name="slide-block"
      mode="out-in"
    >
      <div
        v-if="showRelationships"
        class="contacts"
      >
        <div class="contacts__search">
          <UiInput v-model="nicknameValue" />

          <UiButton @click="sendFriendRequest">
            <InlineSvg src="icons/person-add.svg" />
          </UiButton>
        </div>

        <RelationshipsGroup
          contact-type="friend"
          :title="'Friends'"
          :contacts="relationshipsStore.friends"
          @delete-friend-request="deleteFriendRequest"
        />
        <RelationshipsGroup
          contact-type="receivedRequest"
          :title="'Received requests'"
          :contacts="relationshipsStore.receivedRequests"
          @reject-friend-request="rejectFriendRequest"
          @accept-friend-request="acceptFriendRequest"
        />
        <RelationshipsGroup
          contact-type="sentRequest"
          :title="'Sent requests'"
          :contacts="relationshipsStore.sentRequests"
          @cancel-friend-request="cancelFriendRequest"
        />
      </div>
    </Transition>
    <UiButton @click="showRelationships = !showRelationships">
      <InlineSvg src="icons/group.svg" />
    </UiButton>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}

.contacts {
  position: absolute;
  inset-block-end: calc(100% + 1.25rem);
  inset-inline-end: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;
  height: 24rem;
  padding: 1.25rem;
  background-color: $background-color-1;
  box-shadow: inset 0 0 0 1px $border-color-1;

  &__search {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
}

.slide-block-enter-active,
.slide-block-leave-active {
  transition: all 300ms ease-in-out;
}
.slide-block-enter-from,
.slide-block-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
