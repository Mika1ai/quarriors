import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { router, ROUTES } from "@/router";

export async function signIn(credentials) {
  const notification = toast(i18n.global.t("common.loading"));

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error.code;

    toast.update(notification, {
      type: toast.TYPE.SUCCESS,
      render: i18n.global.t("common.success"),
    });

    router.push({ path: ROUTES.HOME.PATH });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error}`),
    });
  }
}
