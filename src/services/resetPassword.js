import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { DOMAIN } from "@/config";
import { ROUTES } from "@/router";

export async function resetPassword(credentials) {
  const notification = toast(i18n.global.t("common.loading"));

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      credentials.email,
      { redirectTo: `${DOMAIN}${ROUTES.UPDATE_PASSWORD.PATH}` },
    );

    if (error) throw error.code;

    toast.update(notification, {
      type: toast.TYPE.SUCCESS,
      render: i18n.global.t("common.success"),
    });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error}`),
    });
  }
}
