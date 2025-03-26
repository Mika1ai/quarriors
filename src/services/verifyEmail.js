import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function verifyEmail(credentials) {
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

    return data;
  } catch (error) {
    toast(i18n.global.t(`errors.${error.code}`), { type: toast.TYPE.ERROR });

    return null;
  }
}
