import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { ROUTES } from "@/router/routes";
import router from "@/router";

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
      autoClose: 1000,
    });

    router.push({
      path: ROUTES.SIGNUP_CONFIRM.PATH,
      query: { email: credentials.email },
    });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error}`),
      autoClose: 1000,
    });
  }
}
