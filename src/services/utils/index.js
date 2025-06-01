import { supabase } from "@/services/supabaseClient";
import { createLoadingToast, updateLoadingToast } from "@/utils";

export const utils = {
  isNicknameAvailable: async (nickname) => {
    const notification = createLoadingToast();

    try {
      const { data, error } = await supabase.rpc("is_nickname_available", {
        nickname,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      updateLoadingToast({
        target: notification,
        message: "common.success",
        success: true,
      });

      return data.success;
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
