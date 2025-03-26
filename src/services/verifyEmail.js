import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";
import { ROUTES } from "@/router/routes";
import router from "@/router";

export async function verifyEmail(credentials) {
  const notification = toast(i18n.global.t("common.loading"));

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: credentials.email,
      token: credentials.token,
      type: "email",
    });

    if (error) throw error;

    const { error: userError } = await supabase.from("users").insert([
      {
        id: data.user.id,
        nickname: data.user.user_metadata.nickname,
      },
    ]);

    if (userError) throw userError;

    toast.update(notification, {
      type: toast.TYPE.SUCCESS,
      render: i18n.global.t("common.success"),
      autoClose: 1000,
    });

    router.push({ path: ROUTES.SIGNIN.PATH });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error.code}`),
      autoClose: 1000,
    });
  }
}
