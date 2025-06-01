import { supabase } from "@/services/supabaseClient";
import { createLoadingToast, updateLoadingToast } from "@/utils";

export const user = {
  updateUser: async ({ credentials, userStore }) => {
    const notification = createLoadingToast();

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.updateUser(credentials);

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

      return true;
    } catch (error) {
      updateLoadingToast({
        target: notification,
        message: `errors.${error}`,
        success: false,
      });

      return false;
    }
  },
};
