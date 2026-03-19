import { api } from "@/services";

export function useUserSession() {
  const setupUserSession = ({ user, userStore, relationshipsStore }) => {
    userStore.setUser({
      id: user.id,
      email: user.email,
      nickname: user.user_metadata.nickname,
      avatarUrl: user.user_metadata.avatar_url,
      avatarPath: user.user_metadata.avatar_path,
      isAuthenticated: user.role === "authenticated",
    });
    api.relationships.getRelationships({ relationshipsStore });
    api.relationships.subscribeToChanges({
      userStore,
      relationshipsStore,
      channelCallback: api.relationships.getRelationships,
    });
  };

  const teardownUserSession = ({ userStore, relationshipsStore }) => {
    userStore.clearUser();
    relationshipsStore.clearRelationships();
    api.relationships.unsubscribeFromChanges({ relationshipsStore });
  };

  return {
    setupUserSession,
    teardownUserSession,
  };
}
