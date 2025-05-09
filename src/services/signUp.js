import { supabase } from "@/services/supabaseClient";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { router, ROUTES } from "@/router";

export async function signUp(credentials) {
  const notification = toast(i18n.global.t("common.loading"));

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

    toast.update(notification, {
      type: toast.TYPE.SUCCESS,
      render: i18n.global.t("common.success"),
    });

    router.push({
      path: ROUTES.SIGN_UP_CONFIRM.PATH,
      query: { email: credentials.email },
    });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error}`),
    });
  }
}
