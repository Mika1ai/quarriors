import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export const user = {
  updateUser: async (credentials) => {
    const notification = toast(i18n.global.t("common.loading"));

    try {
      const { error } = await supabase.auth.updateUser(credentials);

      if (error) throw error.code;

      toast.update(notification, {
        type: toast.TYPE.SUCCESS,
        render: i18n.global.t("common.success"),
      });

      return true;
    } catch (error) {
      toast.update(notification, {
        type: toast.TYPE.ERROR,
        render: i18n.global.t(`errors.${error}`),
      });

      return false;
    }
  },
};
