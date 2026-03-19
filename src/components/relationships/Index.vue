<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRelationshipsStore } from "@/stores";
import { api } from "@/services";

const { t } = useI18n();

const relationshipsStore = useRelationshipsStore();

const nicknameValue = ref("");
const showRelationshipsDropdown = ref(false);
const showDeleteDialog = ref(false);
const deleteFriendData = ref({
  id: "",
  nickname: "",
});
const deleteFriendText = computed(() => {
  return t("relationships.delete_friend_confirm", {
    nickname: deleteFriendData.value.nickname,
  });
});

const sendFriendRequest = () => {
  api.relationships.sendFriendRequest(nicknameValue.value);
  nicknameValue.value = "";
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

const deleteFriendRequest = ({ id, nickname }) => {
  showDeleteDialog.value = true;
  deleteFriendData.value = { id, nickname };
};
const closeDeleteDialog = () => {
  showDeleteDialog.value = false;
  deleteFriendData.value = { id: "", nickname: "" };
};
const onDeleteConfirm = () => {
  api.relationships.deleteFriendRequest(deleteFriendData.value.id);
  closeDeleteDialog();
};
</script>

<template>
  <div class="relationships">
    <UiDropdown
      :show="showRelationshipsDropdown"
      :close-on-outside-click="false"
      position-block="start"
      position-inline="start"
      @close="showRelationshipsDropdown = false"
      @toggle="showRelationshipsDropdown = !showRelationshipsDropdown"
    >
      <template #trigger>
        <UiButton>
          <InlineSvg src="icons/group.svg" />
        </UiButton>
      </template>

      <div class="relationships__menu">
        <div class="relationships__search">
          <UiInput
            v-model="nicknameValue"
            :placeholder="$t('relationships.enter_nickname')"
          />

          <UiButton @click="sendFriendRequest">
            <InlineSvg src="icons/person-add.svg" />
          </UiButton>
        </div>

        <RelationshipsGroup
          contact-type="friend"
          :title="$t('relationships.friends')"
          :empty-text="$t('relationships.no_friends')"
          :contacts="relationshipsStore.friends"
          @delete-friend-request="deleteFriendRequest"
        />
        <RelationshipsGroup
          contact-type="receivedRequest"
          :title="$t('relationships.received_requests')"
          :empty-text="$t('relationships.no_received_requests')"
          :contacts="relationshipsStore.receivedRequests"
          @reject-friend-request="rejectFriendRequest"
          @accept-friend-request="acceptFriendRequest"
        />
        <RelationshipsGroup
          contact-type="sentRequest"
          :title="$t('relationships.sent_requests')"
          :empty-text="$t('relationships.no_sent_requests')"
          :contacts="relationshipsStore.sentRequests"
          @cancel-friend-request="cancelFriendRequest"
        />
      </div>
    </UiDropdown>

    <Teleport to="body">
      <UiDialog
        :show="showDeleteDialog"
        @close="closeDeleteDialog"
        @confirm="onDeleteConfirm"
      >
        {{ deleteFriendText }}
      </UiDialog>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.relationships {
  position: fixed;
  inset-block-end: $padding-md;
  inset-inline-end: $padding-md;

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 18rem;
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
}
</style>
