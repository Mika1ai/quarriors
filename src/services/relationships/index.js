import { supabase } from "@/services/supabaseClient";
import {
  createErrorToast,
  createLoadingToast,
  updateLoadingToast,
} from "@/utils";

export const relationships = {
  getRelationships: async ({ relationshipsStore }) => {
    try {
      const { data, error } = await supabase.rpc("get_user_relationships");

      if (error) throw error.code;

      relationshipsStore.setRelationships(data);
    } catch (error) {
      createErrorToast({
        message: `errors.${error}`,
      });
    }
  },
  subscribeToChanges: async ({
    userStore,
    relationshipsStore,
    channelCallback,
  }) => {
    try {
      const channel = supabase
        .channel("relationships-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "friend_requests",
            filter: `sender_id=eq.${userStore.id}`,
          },
          () => channelCallback({ relationshipsStore }),
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "friend_requests",
            filter: `receiver_id=eq.${userStore.id}`,
          },
          () => channelCallback({ relationshipsStore }),
        );

      const { error } = await channel.subscribe();

      if (error) throw error.code;

      relationshipsStore.setChannel(channel);
    } catch (error) {
      createErrorToast({
        message: `errors.${error}`,
      });
    }
  },
  unsubscribeFromChanges: async ({ relationshipsStore }) => {
    try {
      if (relationshipsStore.channel) {
        const { error } = await relationshipsStore.channel.unsubscribe();

        if (error) throw error.code;

        relationshipsStore.setChannel(null);
      }
    } catch (error) {
      createErrorToast({
        message: `errors.${error}`,
      });
    }
  },
  sendFriendRequest: async (otherUserNickname) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("send_friend_request", {
        other_user_nickname: otherUserNickname,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      updateLoadingToast({
        target: notification,
        message: `common.${data.code}`,
        success: true,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  cancelFriendRequest: async (otherUserId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("cancel_friend_request", {
        other_user_id: otherUserId,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      updateLoadingToast({
        target: notification,
        message: `common.${data.code}`,
        success: true,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  rejectFriendRequest: async (otherUserId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("reject_friend_request", {
        other_user_id: otherUserId,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      updateLoadingToast({
        target: notification,
        message: `common.${data.code}`,
        success: true,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  acceptFriendRequest: async (otherUserId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("accept_friend_request", {
        other_user_id: otherUserId,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      updateLoadingToast({
        target: notification,
        message: `common.${data.code}`,
        success: true,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  deleteFriendRequest: async (otherUserId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("delete_friend_request", {
        other_user_id: otherUserId,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      updateLoadingToast({
        target: notification,
        message: `common.${data.code}`,
        success: true,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
};
