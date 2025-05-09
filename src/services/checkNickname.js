import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function checkNickname(nickname) {
  const notification = toast(i18n.global.t("common.loading"));

  try {
    const { data, error } = await supabase.rpc("check_nickname", {
      nickname_to_check: nickname,
    });

    if (error) throw error.code;
    if (!data) throw "nickname_taken";

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
}
