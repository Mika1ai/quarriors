import { supabase } from "@/services/supabaseClient";
import { createLoadingToast, updateLoadingToast } from "@/utils";

export const user = {
  updateUser: async (credentials) => {
    const notification = createLoadingToast();

    try {
      const { error } = await supabase.auth.updateUser(credentials);

      if (error) throw error.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
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
