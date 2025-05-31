import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export const utils = {
  isNicknameAvailable: async (nickname) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const { data, error } = await supabase.rpc("is_nickname_available", {
        nickname,
      });

      if (error) throw error.code;
      if (!data.success) throw data.code;

      return data.success;
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });

      return false;
    }
  },
};
