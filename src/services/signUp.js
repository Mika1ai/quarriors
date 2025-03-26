import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function signUp(credentials) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          nickname: credentials.nickname,
        },
      },
    });

    console.log(error);

    if (error) throw error;

    return data;
  } catch (error) {
    toast(i18n.global.t(`errors.${error.code}`), { type: toast.TYPE.ERROR });

    return null;
  }
}
