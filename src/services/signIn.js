import { supabase } from "./supabase.js";
import { toast } from "vue3-toastify";
import { i18n } from "@/locales";

export async function signIn(credentials) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    toast(i18n.global.t(`errors.${error.code}`), { type: toast.TYPE.ERROR });

    return null;
  }
}
