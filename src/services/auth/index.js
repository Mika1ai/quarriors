import { supabase } from "@/services/supabaseClient";
import { DOMAIN } from "@/config";
import { router, ROUTES } from "@/router";
import { api } from "@/services";
import { createLoadingToast, updateLoadingToast } from "@/utils";

export const auth = {
  signUp: async (credentials) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            nickname: credentials.nickname,
          },
        },
      });

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      router.push({
        path: ROUTES.SIGN_UP_CONFIRM.PATH,
        query: { email: credentials.email },
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  resendOtp: async (credentials) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: credentials.email,
      });

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
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
  verifyEmail: async ({ credentials, userStore, relationshipsStore }) => {
    const notification = createLoadingToast();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.verifyOtp({
        email: credentials.email,
        token: credentials.token,
        type: "email",
      });

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      userStore.setUser({
        id: user.id,
        email: user.email,
        nickname: user.user_metadata.nickname,
        isAuthenticated: user.role === "authenticated",
      });
      api.relationships.getRelationships({ relationshipsStore });
      api.relationships.subscribeToChanges({
        userStore,
        relationshipsStore,
        channelCallback: api.relationships.getRelationships,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  resetPassword: async (credentials) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        credentials.email,
        { redirectTo: `${DOMAIN}${ROUTES.UPDATE_PASSWORD.PATH}` },
      );

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
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
  signIn: async ({ credentials, userStore, relationshipsStore }) => {
    const notification = createLoadingToast();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      userStore.setUser({
        id: user.id,
        email: user.email,
        nickname: user.user_metadata.nickname,
        isAuthenticated: user.role === "authenticated",
      });
      api.relationships.getRelationships({ relationshipsStore });
      api.relationships.subscribeToChanges({
        userStore,
        relationshipsStore,
        channelCallback: api.relationships.getRelationships,
      });
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
  signOut: async ({ userStore, relationshipsStore }) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      api.relationships.unsubscribeFromChanges({ relationshipsStore });

      relationshipsStore.clearRelationships();
      userStore.clearUser();
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });
    }
  },
};
