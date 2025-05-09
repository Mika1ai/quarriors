import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { router, ROUTES } from "@/router";

export async function signOut() {
  const notification = toast(i18n.global.t("common.loading"));

  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error.code;

    toast.update(notification, {
      type: toast.TYPE.SUCCESS,
      render: i18n.global.t("common.success"),
    });

    router.push({ path: ROUTES.SIGN_IN.PATH });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error}`),
    });
  }
}
