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

      console.log(data);

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
  sendFriendRequest: async (targetNickname) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("send_friend_request", {
        target_nickname: targetNickname,
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
  cancelFriendRequest: async (targetId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("cancel_friend_request", {
        target_id: targetId,
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
  rejectFriendRequest: async (sourceId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("reject_friend_request", {
        source_id: sourceId,
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
  acceptFriendRequest: async (sourceId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("accept_friend_request", {
        source_id: sourceId,
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
  deleteFriendRequest: async (friendId) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("delete_friend_request", {
        friend_id: friendId,
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
