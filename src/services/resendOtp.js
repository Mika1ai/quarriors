import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function resendOtp(credentials) {
  const notification = toast(i18n.global.t("common.loading"));

  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: credentials.email,
    });

    if (error) throw error.code;

    toast.update(notification, {
      type: toast.TYPE.SUCCESS,
      render: i18n.global.t("common.success"),
      autoClose: 1000,
    });
  } catch (error) {
    toast.update(notification, {
      type: toast.TYPE.ERROR,
      render: i18n.global.t(`errors.${error}`),
      autoClose: 1000,
    });
  }
}
